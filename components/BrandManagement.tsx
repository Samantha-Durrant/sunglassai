import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Mail,
  Users,
  Globe,
  MapPin,
  Compass,
  Star,
  Heart,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DiscoveredBrand {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string;
  category: string;
  priceRange: string;
  popularProducts: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  rating: number;
  reviewCount: number;
  headquarters: string;
  founded: string;
  isAddedToMyBrands: boolean;
}

interface Brand {
  id: string;
  name: string;
  website: string;
  email: string;
  ceoName: string;
  ceoEmail: string;
  description: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  location: string;
  founded: string;
  employees: string;
  revenue: string;
  marketSegment: string;
  keyProducts: string;
  tags: string[];
  lastContact?: string;
  contactStatus: 'not_contacted' | 'contacted' | 'responded' | 'partnership';
}

interface BrandManagementProps {
  accessToken: string | null;
}

export function BrandManagement({ accessToken }: BrandManagementProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  
  // Discovery states
  const [activeTab, setActiveTab] = useState<'my-brands' | 'discover'>('my-brands');
  const [discoveredBrands, setDiscoveredBrands] = useState<DiscoveredBrand[]>([]);
  const [discoverySearchTerm, setDiscoverySearchTerm] = useState('');
  const [discoveryLoading, setDiscoveryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    website: '',
    email: '',
    ceoName: '',
    ceoEmail: '',
    description: '',
    socialMedia: {},
    location: '',
    founded: '',
    employees: '',
    revenue: '',
    marketSegment: '',
    keyProducts: '',
    tags: [],
    contactStatus: 'not_contacted'
  });

  useEffect(() => {
    fetchBrands();
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
        setBrands(data);
      }
    } catch (error) {
      console.log('Failed to fetch brands:', error);
      toast.error('Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBrand = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingBrand ? 'Brand updated successfully' : 'Brand added successfully');
        setIsAddingBrand(false);
        setEditingBrand(null);
        setFormData({
          name: '',
          website: '',
          email: '',
          ceoName: '',
          ceoEmail: '',
          description: '',
          socialMedia: {},
          location: '',
          founded: '',
          employees: '',
          revenue: '',
          marketSegment: '',
          keyProducts: '',
          tags: [],
          contactStatus: 'not_contacted'
        });
        fetchBrands();
      } else {
        toast.error('Failed to save brand');
      }
    } catch (error) {
      console.log('Failed to save brand:', error);
      toast.error('Failed to save brand');
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Brand deleted successfully');
        fetchBrands();
      } else {
        toast.error('Failed to delete brand');
      }
    } catch (error) {
      console.log('Failed to delete brand:', error);
      toast.error('Failed to delete brand');
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData(brand);
    setIsAddingBrand(true);
  };

  // Discovery functions
  const searchDiscoveredBrands = async (query: string = '') => {
    setDiscoveryLoading(true);
    try {
      // Mock data for sunglasses brands - in a real app, this would be an API call
      const mockBrands: DiscoveredBrand[] = [
        {
          id: 'disc-1',
          name: 'Oakley',
          website: 'https://www.oakley.com',
          description: 'Performance eyewear and lifestyle brand known for sports sunglasses and innovative lens technology.',
          logo: 'https://example.com/oakley-logo.png',
          category: 'Performance/Sports',
          priceRange: '$100-$400',
          popularProducts: ['Holbrook', 'Frogskins', 'Radar EV'],
          socialMedia: {
            instagram: '@oakley',
            twitter: '@oakley',
            facebook: 'Oakley'
          },
          rating: 4.5,
          reviewCount: 2847,
          headquarters: 'Lake Forest, CA, USA',
          founded: '1975',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'oakley')
        },
        {
          id: 'disc-2',
          name: 'Ray-Ban',
          website: 'https://www.ray-ban.com',
          description: 'Iconic eyewear brand known for classic styles like Aviator and Wayfarer sunglasses.',
          category: 'Classic/Fashion',
          priceRange: '$150-$300',
          popularProducts: ['Aviator', 'Wayfarer', 'Clubmaster'],
          socialMedia: {
            instagram: '@rayban',
            twitter: '@rayban',
            facebook: 'Ray-Ban'
          },
          rating: 4.7,
          reviewCount: 4521,
          headquarters: 'Milan, Italy',
          founded: '1937',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'ray-ban')
        },
        {
          id: 'disc-3',
          name: 'Persol',
          website: 'https://www.persol.com',
          description: 'Italian luxury eyewear brand known for handcrafted sunglasses and unique design details.',
          category: 'Luxury',
          priceRange: '$200-$500',
          popularProducts: ['649 Series', '714 Foldable', '3152S'],
          socialMedia: {
            instagram: '@persol',
            facebook: 'Persol'
          },
          rating: 4.6,
          reviewCount: 1234,
          headquarters: 'Turin, Italy',
          founded: '1917',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'persol')
        },
        {
          id: 'disc-4',
          name: 'Maui Jim',
          website: 'https://www.mauijim.com',
          description: 'Hawaiian-born brand specializing in polarized sunglasses with superior color enhancement.',
          category: 'Luxury/Performance',
          priceRange: '$200-$400',
          popularProducts: ['Peahi', 'Breakwall', 'Red Sands'],
          socialMedia: {
            instagram: '@mauijim',
            facebook: 'Maui Jim'
          },
          rating: 4.8,
          reviewCount: 1876,
          headquarters: 'Peoria, IL, USA',
          founded: '1980',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'maui jim')
        },
        {
          id: 'disc-5',
          name: 'Warby Parker',
          website: 'https://www.warbyparker.com',
          description: 'Direct-to-consumer eyewear brand offering designer prescription glasses and sunglasses.',
          category: 'Fashion/Affordable',
          priceRange: '$95-$145',
          popularProducts: ['Haskell', 'Durand', 'Barkley'],
          socialMedia: {
            instagram: '@warbyparker',
            twitter: '@warbyparker',
            facebook: 'Warby Parker'
          },
          rating: 4.3,
          reviewCount: 3291,
          headquarters: 'New York, NY, USA',
          founded: '2010',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'warby parker')
        },
        {
          id: 'disc-6',
          name: 'Tom Ford',
          website: 'https://www.tomford.com',
          description: 'Luxury fashion brand offering high-end sunglasses with sophisticated and bold designs.',
          category: 'Luxury/Fashion',
          priceRange: '$300-$800',
          popularProducts: ['FT0237', 'FT0336', 'FT0248'],
          socialMedia: {
            instagram: '@tomford',
            facebook: 'Tom Ford'
          },
          rating: 4.4,
          reviewCount: 987,
          headquarters: 'London, UK',
          founded: '2005',
          isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'tom ford')
        }
      ];

      // Filter by search query
      let filteredBrands = mockBrands;
      if (query) {
        filteredBrands = mockBrands.filter(brand =>
          brand.name.toLowerCase().includes(query.toLowerCase()) ||
          brand.description.toLowerCase().includes(query.toLowerCase()) ||
          brand.category.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== 'all') {
        filteredBrands = filteredBrands.filter(brand =>
          brand.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // Filter by price range
      if (priceFilter !== 'all') {
        filteredBrands = filteredBrands.filter(brand => {
          const price = brand.priceRange.toLowerCase();
          switch (priceFilter) {
            case 'budget': return price.includes('$95') || price.includes('$100');
            case 'mid': return price.includes('$150') || price.includes('$200');
            case 'luxury': return price.includes('$300') || price.includes('$400') || price.includes('$500') || price.includes('$800');
            default: return true;
          }
        });
      }

      // Update the isAddedToMyBrands status
      filteredBrands = filteredBrands.map(brand => ({
        ...brand,
        isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === brand.name.toLowerCase())
      }));

      setDiscoveredBrands(filteredBrands);
    } catch (error) {
      console.log('Failed to search brands:', error);
      toast.error('Failed to search brands');
    } finally {
      setDiscoveryLoading(false);
    }
  };

  const addDiscoveredBrandToMyBrands = async (discoveredBrand: DiscoveredBrand) => {
    try {
      const brandData: Partial<Brand> = {
        name: discoveredBrand.name,
        website: discoveredBrand.website,
        description: discoveredBrand.description,
        location: discoveredBrand.headquarters,
        founded: discoveredBrand.founded,
        marketSegment: discoveredBrand.category,
        socialMedia: discoveredBrand.socialMedia,
        tags: discoveredBrand.popularProducts,
        contactStatus: 'not_contacted',
        email: '',
        ceoName: '',
        ceoEmail: '',
        employees: '',
        revenue: '',
        keyProducts: discoveredBrand.popularProducts.join(', ')
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97f474e9/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(brandData),
      });

      if (response.ok) {
        toast.success(`${discoveredBrand.name} added to your brands!`);
        fetchBrands();
        // Update the discovered brands list to reflect the change
        setDiscoveredBrands(prev => 
          prev.map(brand => 
            brand.id === discoveredBrand.id 
              ? { ...brand, isAddedToMyBrands: true }
              : brand
          )
        );
      } else {
        toast.error('Failed to add brand');
      }
    } catch (error) {
      console.log('Failed to add discovered brand:', error);
      toast.error('Failed to add brand');
    }
  };

  // Load discovered brands on mount and when filters change
  useEffect(() => {
    if (activeTab === 'discover') {
      searchDiscoveredBrands(discoverySearchTerm);
    }
  }, [activeTab, selectedCategory, priceFilter, brands]);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.ceoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_contacted': return 'bg-gray-500';
      case 'contacted': return 'bg-blue-500';
      case 'responded': return 'bg-green-500';
      case 'partnership': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const DiscoveryBrandCard = ({ brand }: { brand: DiscoveredBrand }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center space-x-2">
              <span>{brand.name}</span>
              {brand.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{brand.rating}</span>
                </div>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600">{brand.headquarters}</p>
            <Badge variant="outline" className="mt-1">
              {brand.category}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-green-600">{brand.priceRange}</p>
            <p className="text-xs text-gray-500">Founded {brand.founded}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-3">
          {brand.description}
        </p>
        
        {brand.popularProducts && brand.popularProducts.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">Popular Products:</p>
            <div className="flex flex-wrap gap-1">
              {brand.popularProducts.slice(0, 3).map((product, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {product}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            {brand.website && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
            {brand.socialMedia?.instagram && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a href={`https://instagram.com/${brand.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                  <span className="text-xs">IG</span>
                </a>
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {brand.isAddedToMyBrands ? (
              <Badge className="bg-green-500">
                <Heart className="h-3 w-3 mr-1" />
                Added
              </Badge>
            ) : (
              <Button
                size="sm"
                onClick={() => addDiscoveredBrandToMyBrands(brand)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Brand
              </Button>
            )}
          </div>
        </div>
        
        {brand.reviewCount && (
          <p className="text-xs text-gray-500">
            Based on {brand.reviewCount.toLocaleString()} reviews
          </p>
        )}
      </CardContent>
    </Card>
  );

  const BrandForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Brand Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Ray-Ban"
            required
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://www.brand.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ceoName">CEO Name</Label>
          <Input
            id="ceoName"
            value={formData.ceoName}
            onChange={(e) => setFormData(prev => ({ ...prev, ceoName: e.target.value }))}
            placeholder="CEO Full Name"
          />
        </div>
        <div>
          <Label htmlFor="ceoEmail">CEO Email</Label>
          <Input
            id="ceoEmail"
            type="email"
            value={formData.ceoEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, ceoEmail: e.target.value }))}
            placeholder="ceo@brand.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Brand Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the brand, their mission, and market position..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="City, Country"
          />
        </div>
        <div>
          <Label htmlFor="founded">Founded</Label>
          <Input
            id="founded"
            value={formData.founded}
            onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
            placeholder="Year founded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employees">Employees</Label>
          <Input
            id="employees"
            value={formData.employees}
            onChange={(e) => setFormData(prev => ({ ...prev, employees: e.target.value }))}
            placeholder="e.g., 100-500"
          />
        </div>
        <div>
          <Label htmlFor="revenue">Revenue</Label>
          <Input
            id="revenue"
            value={formData.revenue}
            onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
            placeholder="e.g., $50M-100M"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="marketSegment">Market Segment</Label>
          <Input
            id="marketSegment"
            value={formData.marketSegment}
            onChange={(e) => setFormData(prev => ({ ...prev, marketSegment: e.target.value }))}
            placeholder="e.g., Luxury, Sports, Fashion"
          />
        </div>
        <div>
          <Label htmlFor="keyProducts">Key Products</Label>
          <Input
            id="keyProducts"
            value={formData.keyProducts}
            onChange={(e) => setFormData(prev => ({ ...prev, keyProducts: e.target.value }))}
            placeholder="e.g., Aviators, Wayfarers"
          />
        </div>
      </div>

      <div>
        <Label>Social Media</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Input
            placeholder="Instagram URL"
            value={formData.socialMedia?.instagram || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              socialMedia: { ...prev.socialMedia, instagram: e.target.value }
            }))}
          />
          <Input
            placeholder="Twitter URL"
            value={formData.socialMedia?.twitter || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              socialMedia: { ...prev.socialMedia, twitter: e.target.value }
            }))}
          />
          <Input
            placeholder="Facebook URL"
            value={formData.socialMedia?.facebook || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              socialMedia: { ...prev.socialMedia, facebook: e.target.value }
            }))}
          />
          <Input
            placeholder="LinkedIn URL"
            value={formData.socialMedia?.linkedin || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
            }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsAddingBrand(false);
            setEditingBrand(null);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSaveBrand}>
          {editingBrand ? 'Update Brand' : 'Add Brand'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Brand Management</h2>
        <Dialog open={isAddingBrand} onOpenChange={setIsAddingBrand}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </DialogTitle>
            </DialogHeader>
            <BrandForm />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'my-brands' | 'discover')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-brands" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>My Brands ({brands.length})</span>
          </TabsTrigger>
          <TabsTrigger value="discover" className="flex items-center space-x-2">
            <Compass className="h-4 w-4" />
            <span>Discover Brands</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-brands" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline">{filteredBrands.length} brands</Badge>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{brand.name}</CardTitle>
                        <p className="text-sm text-gray-600">{brand.location}</p>
                      </div>
                      <Badge className={getStatusColor(brand.contactStatus)}>
                        {brand.contactStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span>{brand.ceoName || 'CEO not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-3 w-3 text-gray-500" />
                        <span>{brand.marketSegment || 'Segment not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span>{brand.founded || 'Founded year not specified'}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {brand.description || 'No description available'}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex space-x-2">
                        {brand.website && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={brand.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {brand.ceoEmail && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={`mailto:${brand.ceoEmail}`}>
                              <Mail className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBrand(brand)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBrand(brand.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredBrands.length === 0 && !loading && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first sunglasses brand'}
              </p>
              <Button onClick={() => setIsAddingBrand(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sunglasses brands..."
                  value={discoverySearchTerm}
                  onChange={(e) => {
                    setDiscoverySearchTerm(e.target.value);
                    searchDiscoveredBrands(e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="luxury">Luxury</option>
                  <option value="performance">Performance/Sports</option>
                  <option value="fashion">Fashion</option>
                  <option value="classic">Classic</option>
                  <option value="affordable">Affordable</option>
                </select>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget ($95-$100)</option>
                  <option value="mid">Mid-range ($150-$200)</option>
                  <option value="luxury">Luxury ($300+)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {discoveredBrands.length} brands found
              </Badge>
              <p className="text-sm text-gray-600">
                Discover and add new sunglasses brands to your collection
              </p>
            </div>
          </div>

          {discoveryLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoveredBrands.map((brand) => (
                <DiscoveryBrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}

          {discoveredBrands.length === 0 && !discoveryLoading && (
            <div className="text-center py-12">
              <Compass className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to discover more brands
              </p>
              <Button onClick={() => {
                setDiscoverySearchTerm('');
                setSelectedCategory('all');
                setPriceFilter('all');
                searchDiscoveredBrands('');
              }}>
                <Search className="h-4 w-4 mr-2" />
                Show All Brands
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}