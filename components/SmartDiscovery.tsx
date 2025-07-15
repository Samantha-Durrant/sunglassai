import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  Mail, 
  ExternalLink, 
  Filter,
  Download,
  Users,
  Send,
  Copy,
  CheckCircle
} from 'lucide-react';
import { getAllBrands, searchBrands, filterBrandsByCategory, getEmailTemplate, Brand } from '../utils/brandDatabase';

interface SmartDiscoveryProps {
  onBrandSelect?: (brand: Brand) => void;
}

// Simple toast function for notifications
const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  console.log(`${type.toUpperCase()}: ${message}`);
  // In a real app, you would use a proper toast library
  alert(`${type.toUpperCase()}: ${message}`);
};

export function SmartDiscovery({ }: SmartDiscoveryProps) {
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [displayedBrands, setDisplayedBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [emailsSent, setEmailsSent] = useState<Set<string>>(new Set());
  const [copiedEmails, setCopiedEmails] = useState<Set<string>>(new Set());

  const categories = ['all', 'Luxury', 'Ultra Luxury', 'Sports', 'Fashion', 'Designer', 'Performance', 'Direct-to-Consumer'];

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    filterBrands();
  }, [searchQuery, selectedCategory, allBrands]);

  const loadBrands = async () => {
    setLoading(true);
    try {
      // Simulate API loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      const brands = getAllBrands();
      setAllBrands(brands);
      setDisplayedBrands(brands.slice(0, 50)); // Start with first 50
      showToast(`Loaded ${brands.length} brands successfully!`, 'success');
    } catch (error) {
      showToast('Failed to load brands', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterBrands = () => {
    let filtered = filterBrandsByCategory(allBrands, selectedCategory);
    filtered = searchBrands(filtered, searchQuery);
    setDisplayedBrands(filtered.slice(0, 100)); // Limit display for performance
  };

  const handleSendEmail = async (brand: Brand) => {
    try {
      const emailContent = getEmailTemplate(brand.name);
      
      // In a real app, you would integrate with an email service
      // For now, we'll copy to clipboard and show success
      await navigator.clipboard.writeText(emailContent);
      
      setEmailsSent(prev => new Set([...prev, brand.id]));
      showToast(`Email template copied to clipboard for ${brand.name}!`, 'success');
      
      // Simulate sending email to track analytics
      setTimeout(() => {
        showToast(`Email queued for sending to ${brand.email}`, 'info');
      }, 1000);
      
    } catch (error) {
      showToast('Failed to prepare email', 'error');
    }
  };

  const handleCopyEmail = async (email: string, brandId: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmails(prev => new Set([...prev, brandId]));
      showToast('Email address copied to clipboard!', 'success');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedEmails(prev => {
          const newSet = new Set(prev);
          newSet.delete(brandId);
          return newSet;
        });
      }, 3000);
    } catch (error) {
      showToast('Failed to copy email', 'error');
    }
  };

  const handleExportBrands = () => {
    const csvContent = [
      'Name,Category,Email,Website,Price Range,Style,Headquarters,Founded,Specialty',
      ...displayedBrands.map(brand => 
        `"${brand.name}","${brand.category}","${brand.email}","${brand.website}","${brand.priceRange}","${brand.style}","${brand.headquarters}",${brand.founded},"${brand.specialty}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sunglassai-brands-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showToast(`Exported ${displayedBrands.length} brands to CSV!`, 'success');
  };

  const handleLoadMore = () => {
    const currentCount = displayedBrands.length;
    let filtered = filterBrandsByCategory(allBrands, selectedCategory);
    filtered = searchBrands(filtered, searchQuery);
    setDisplayedBrands(filtered.slice(0, Math.min(currentCount + 50, filtered.length)));
  };

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Brand Discovery</h2>
          <p className="text-gray-600">Discover and connect with 200+ premium sunglasses brands</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleExportBrands} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={loadBrands} variant="outline" size="sm" disabled={loading}>
            <Users className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search brands by name, category, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{allBrands.length}</div>
            <div className="text-sm text-gray-600">Total Brands</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{displayedBrands.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{emailsSent.size}</div>
            <div className="text-sm text-gray-600">Emails Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading brands...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBrands.map((brand) => (
              <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{brand.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="secondary">{brand.category}</Badge>
                        <Badge variant="outline">{brand.style}</Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="font-medium">{brand.priceRange}</div>
                      <div>{brand.founded}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{brand.description}</p>
                  
                  <div className="text-xs text-gray-500">
                    <div><strong>HQ:</strong> {brand.headquarters}</div>
                    <div><strong>Specialty:</strong> {brand.specialty}</div>
                    <div><strong>Target:</strong> {brand.targetMarket}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="flex-1 truncate">{brand.email}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyEmail(brand.email, brand.id)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedEmails.has(brand.id) ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleSendEmail(brand)}
                      disabled={emailsSent.has(brand.id)}
                      className="flex-1"
                    >
                      {emailsSent.has(brand.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Sent
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Email
                        </>
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`https://${brand.website}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          {displayedBrands.length < allBrands.length && (
            <div className="text-center pt-6">
              <Button onClick={handleLoadMore} variant="outline">
                Load More Brands ({allBrands.length - displayedBrands.length} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
