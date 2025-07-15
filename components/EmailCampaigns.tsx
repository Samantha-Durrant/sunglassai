import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Send, 
  Sparkles, 
  Mail, 
  Clock, 
  Check, 
  X, 
  RefreshCw,
  Eye,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Brand {
  id: string;
  name: string;
  ceoName: string;
  ceoEmail: string;
  description: string;
  contactStatus: string;
}

interface EmailCampaignsProps {
  accessToken: string | null;
}

export function EmailCampaigns({ accessToken }: EmailCampaignsProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailTone, setEmailTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
    fetchCampaigns();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/brands`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBrands(data.filter((brand: Brand) => brand.ceoEmail));
      }
    } catch (error) {
      console.log('Failed to fetch brands:', error);
      toast.error('Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/analytics`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.recentEmails || []);
      }
    } catch (error) {
      console.log('Failed to fetch campaigns:', error);
    }
  };

  const generateEmail = async () => {
    if (!selectedBrand) {
      toast.error('Please select a brand first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/generate-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          brandName: selectedBrand.name,
          ceoName: selectedBrand.ceoName,
          brandInfo: selectedBrand.description,
          tone: emailTone
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const lines = data.emailContent.split('\n');
        const subjectLine = lines[0].replace('Subject: ', '');
        const bodyContent = lines.slice(2).join('\n');
        
        setEmailSubject(subjectLine);
        setEmailContent(bodyContent);
        toast.success('Email generated successfully!');
      } else {
        toast.error('Failed to generate email');
      }
    } catch (error) {
      console.log('Failed to generate email:', error);
      toast.error('Failed to generate email');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendEmail = async () => {
    if (!selectedBrand || !emailContent || !emailSubject) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          to: selectedBrand.ceoEmail,
          subject: emailSubject,
          content: emailContent,
          brandId: selectedBrand.id
        }),
      });

      if (response.ok) {
        toast.success('Email sent successfully!');
        setEmailContent('');
        setEmailSubject('');
        setSelectedBrand(null);
        fetchCampaigns();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to send email');
      }
    } catch (error) {
      console.log('Failed to send email:', error);
      toast.error('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const EmailComposer = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="brand-select">Select Brand</Label>
          <Select
            value={selectedBrand?.id || ''}
            onValueChange={(value) => {
              const brand = brands.find(b => b.id === value);
              setSelectedBrand(brand || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a brand to contact" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  <div className="flex items-center space-x-2">
                    <span>{brand.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {brand.ceoName}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedBrand && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Brand:</strong> {selectedBrand.name}</div>
              <div><strong>CEO:</strong> {selectedBrand.ceoName}</div>
              <div><strong>Email:</strong> {selectedBrand.ceoEmail}</div>
              <div><strong>Description:</strong> {selectedBrand.description}</div>
            </CardContent>
          </Card>
        )}

        <div>
          <Label htmlFor="email-tone">Email Tone</Label>
          <Select value={emailTone} onValueChange={setEmailTone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={generateEmail} 
            disabled={!selectedBrand || isGenerating}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Email
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(true)}
            disabled={!emailContent}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label htmlFor="email-subject">Subject Line</Label>
          <Input
            id="email-subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <Label htmlFor="email-content">Email Content</Label>
          <Textarea
            id="email-content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Email content will appear here after generation, or you can write your own..."
            rows={12}
          />
        </div>

        <Button 
          onClick={sendEmail} 
          disabled={!selectedBrand || !emailContent || !emailSubject || isSending}
          className="w-full"
        >
          {isSending ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Email Campaigns</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Compose New Email</DialogTitle>
            </DialogHeader>
            <EmailComposer />
          </DialogContent>
        </Dialog>
      </div>

      {brands.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No brands with emails found</h3>
            <p className="text-gray-600 mb-4">
              Add brands with CEO email addresses to start sending campaigns
            </p>
            <Button variant="outline">
              Add Brands First
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {brands.slice(0, 5).map((brand) => (
                  <div key={brand.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{brand.name}</div>
                      <div className="text-sm text-gray-600">{brand.ceoName} - {brand.ceoEmail}</div>
                    </div>
                    <Badge variant={brand.contactStatus === 'not_contacted' ? 'secondary' : 'default'}>
                      {brand.contactStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
                {brands.length > 5 && (
                  <div className="text-sm text-gray-600 text-center pt-2">
                    And {brands.length - 5} more brands...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No campaigns sent yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium truncate">{campaign.subject}</div>
                        <div className="text-sm text-gray-600">{campaign.to}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(campaign.sentAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(campaign.status)}
                        <Badge variant={campaign.status === 'sent' ? 'default' : 'destructive'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Subject:</Label>
              <div className="font-medium">{emailSubject}</div>
            </div>
            <div>
              <Label>Content:</Label>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {emailContent}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}