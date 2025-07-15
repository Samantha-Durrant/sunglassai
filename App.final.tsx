import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';

// Simple UI Components (no external dependencies)
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'default',
  size = 'default',
  disabled = false 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  className = '',
  id,
  required = false
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  id?: string;
  required?: boolean;
}) => (
  <input 
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${className}`}
  />
);

const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

const Badge = ({ children, className = '', variant = 'default' }: { children: React.ReactNode; className?: string; variant?: string }) => {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    outline: 'border border-gray-300 text-gray-700',
    secondary: 'bg-gray-100 text-gray-800'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${className}`}>
      {children}
    </span>
  );
};

// Simple form submission helper

// Simple Icons (using Unicode symbols)
const Eye = ({ className = '' }: { className?: string }) => <span className={className}>👁️</span>;
const LogOut = ({ className = '' }: { className?: string }) => <span className={className}>🚪</span>;
const Users = ({ className = '' }: { className?: string }) => <span className={className}>👥</span>;
const Mail = ({ className = '' }: { className?: string }) => <span className={className}>📧</span>;
const BarChart3 = ({ className = '' }: { className?: string }) => <span className={className}>📊</span>;
const Plus = ({ className = '' }: { className?: string }) => <span className={className}>➕</span>;
const Search = ({ className = '' }: { className?: string }) => <span className={className}>🔍</span>;
const Star = ({ className = '' }: { className?: string }) => <span className={className}>⭐</span>;
const Heart = ({ className = '' }: { className?: string }) => <span className={className}>❤️</span>;
const ExternalLink = ({ className = '' }: { className?: string }) => <span className={className}>🔗</span>;
const Compass = ({ className = '' }: { className?: string }) => <span className={className}>🧭</span>;

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Brand interfaces
interface DiscoveredBrand {
  id: string;
  name: string;
  website: string;
  description: string;
  category: string;
  priceRange: string;
  popularProducts: string[];
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
  description: string;
  location: string;
  founded: string;
  marketSegment: string;
  contactStatus: 'not_contacted' | 'contacted' | 'responded' | 'partnership';
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [brandTab, setBrandTab] = useState<'my-brands' | 'discover'>('my-brands');
  
  // Auth state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Brand state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [discoveredBrands, setDiscoveredBrands] = useState<DiscoveredBrand[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [discoverySearchTerm, setDiscoverySearchTerm] = useState('');

  useEffect(() => {
    checkAuth();
    loadDiscoveredBrands();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        setUser(session.user);
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      
      if (error) throw error;
      
      if (session?.access_token) {
        setUser(session.user);
      }
    } catch (error: any) {
      // For demo purposes, allow any login
      setUser({ email: loginData.email, user_metadata: { name: 'Demo User' } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoginData({ email: '', password: '' });
  };

  const loadDiscoveredBrands = () => {
    const mockBrands: DiscoveredBrand[] = [
      {
        id: 'disc-1',
        name: 'Ray-Ban',
        website: 'https://www.ray-ban.com',
        description: 'Iconic eyewear brand known for classic styles like Aviator and Wayfarer sunglasses.',
        category: 'Classic/Fashion',
        priceRange: '$150-$300',
        popularProducts: ['Aviator', 'Wayfarer', 'Clubmaster'],
        rating: 4.7,
        reviewCount: 4521,
        headquarters: 'Milan, Italy',
        founded: '1937',
        isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'ray-ban')
      },
      {
        id: 'disc-2',
        name: 'Oakley',
        website: 'https://www.oakley.com',
        description: 'Performance eyewear and lifestyle brand known for sports sunglasses and innovative lens technology.',
        category: 'Performance/Sports',
        priceRange: '$100-$400',
        popularProducts: ['Holbrook', 'Frogskins', 'Radar EV'],
        rating: 4.5,
        reviewCount: 2847,
        headquarters: 'Lake Forest, CA, USA',
        founded: '1975',
        isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'oakley')
      },
      {
        id: 'disc-3',
        name: 'Persol',
        website: 'https://www.persol.com',
        description: 'Italian luxury eyewear brand known for handcrafted sunglasses and unique design details.',
        category: 'Luxury',
        priceRange: '$200-$500',
        popularProducts: ['649 Series', '714 Foldable', '3152S'],
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
        rating: 4.4,
        reviewCount: 987,
        headquarters: 'London, UK',
        founded: '2005',
        isAddedToMyBrands: brands.some(b => b.name.toLowerCase() === 'tom ford')
      }
    ];
    setDiscoveredBrands(mockBrands);
  };

  const addBrandToCollection = (brand: DiscoveredBrand) => {
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: brand.name,
      website: brand.website,
      email: '',
      description: brand.description,
      location: brand.headquarters,
      founded: brand.founded,
      marketSegment: brand.category,
      contactStatus: 'not_contacted'
    };
    
    setBrands(prev => [...prev, newBrand]);
    setDiscoveredBrands(prev => 
      prev.map(b => b.id === brand.id ? { ...b, isAddedToMyBrands: true } : b)
    );
    
    alert(`${brand.name} added to your brand collection!`);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDiscoveredBrands = discoveredBrands.filter(brand =>
    brand.name.toLowerCase().includes(discoverySearchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <Eye />
              <span>SunglassAI Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-sm text-gray-600 text-center">
                Enter any email and password to test the dashboard
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Eye className="text-2xl" />
            <h1 className="text-2xl font-bold text-gray-900">SunglassAI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.user_metadata?.name || user.email}
            </span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['overview', 'brands', 'campaigns', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' && <BarChart3 className="inline mr-2" />}
                {tab === 'brands' && <Users className="inline mr-2" />}
                {tab === 'campaigns' && <Mail className="inline mr-2" />}
                {tab === 'analytics' && <BarChart3 className="inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Brands</CardTitle>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{brands.length}</div>
                  <p className="text-xs text-gray-600">Brands in your collection</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Discover</CardTitle>
                  <Compass />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-gray-600">Brands available to discover</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                  <Mail />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-gray-600">Total outreach emails</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <BarChart3 />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-gray-600">Running campaigns</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('brands')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus />
                    <span>Manage Brands</span>
                  </Button>
                  <Button 
                    onClick={() => {
                      setActiveTab('brands');
                      setBrandTab('discover');
                    }}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Compass />
                    <span>Discover Brands</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('campaigns')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Mail />
                    <span>Start Campaign</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Brand Management</h2>
            
            {/* Brand Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setBrandTab('my-brands')}
                className={`px-4 py-2 text-sm font-medium ${
                  brandTab === 'my-brands'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="inline mr-2" />
                My Brands ({brands.length})
              </button>
              <button
                onClick={() => setBrandTab('discover')}
                className={`px-4 py-2 text-sm font-medium ${
                  brandTab === 'discover'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Compass className="inline mr-2" />
                Discover Brands
              </button>
            </div>

            {brandTab === 'my-brands' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search your brands..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Badge variant="outline">{filteredBrands.length} brands</Badge>
                </div>

                {filteredBrands.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ? 'Try adjusting your search terms' : 'Start by discovering and adding sunglasses brands'}
                    </p>
                    <Button onClick={() => setBrandTab('discover')}>
                      <Compass className="mr-2" />
                      Discover Brands
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBrands.map((brand) => (
                      <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{brand.name}</CardTitle>
                          <p className="text-sm text-gray-600">{brand.location}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline">{brand.marketSegment}</Badge>
                            <div className="flex space-x-2">
                              {brand.website && (
                                <Button size="sm" variant="outline">
                                  <ExternalLink />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {brandTab === 'discover' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search sunglasses brands..."
                      value={discoverySearchTerm}
                      onChange={(e) => setDiscoverySearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Badge variant="outline">{filteredDiscoveredBrands.length} brands found</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDiscoveredBrands.map((brand) => (
                    <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <span>{brand.name}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="text-yellow-400" />
                                <span className="text-sm text-gray-600">{brand.rating}</span>
                              </div>
                            </CardTitle>
                            <p className="text-sm text-gray-600">{brand.headquarters}</p>
                            <Badge variant="outline" className="mt-1">{brand.category}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">{brand.priceRange}</p>
                            <p className="text-xs text-gray-500">Founded {brand.founded}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                        
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-1">Popular Products:</p>
                          <div className="flex flex-wrap gap-1">
                            {brand.popularProducts.slice(0, 3).map((product, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {brand.website && (
                              <Button size="sm" variant="outline" onClick={() => window.open(brand.website, '_blank')}>
                                <ExternalLink />
                              </Button>
                            )}
                          </div>
                          <div>
                            {brand.isAddedToMyBrands ? (
                              <Badge className="bg-green-500">
                                <Heart className="mr-1" />
                                Added
                              </Badge>
                            ) : (
                              <Button size="sm" onClick={() => addBrandToCollection(brand)}>
                                <Plus className="mr-1" />
                                Add Brand
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          Based on {brand.reviewCount.toLocaleString()} reviews
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="text-center py-12">
            <Mail className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Campaigns</h3>
            <p className="text-gray-600 mb-4">
              Email campaign functionality will be available soon. Start by adding brands to your collection.
            </p>
            <Button onClick={() => setActiveTab('brands')}>
              <Users className="mr-2" />
              Manage Brands
            </Button>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <BarChart3 className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Analytics will be available once you start running email campaigns.
            </p>
            <Button onClick={() => setActiveTab('campaigns')}>
              <Mail className="mr-2" />
              View Campaigns
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
