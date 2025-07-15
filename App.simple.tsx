import React, { useState } from 'react';

// Simple mock components to avoid dependency issues
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`border rounded-lg p-4 ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Button = ({ children, onClick, className = '' }: { 
  children: React.ReactNode, 
  onClick?: () => void,
  className?: string 
}) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, value, onChange, type = 'text' }: {
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string
}) => (
  <input 
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
  />
);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple mock login
    if (email && password) {
      setUser({ email, name: 'Test User' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>🕶️ SunglassAI Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <p className="text-sm text-gray-600 text-center">
                Enter any email and password to test
              </p>
            </div>
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
          <h1 className="text-2xl font-bold text-gray-900">🕶️ SunglassAI</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📊 My Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-600">Brands in your collection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔍 Discover Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-gray-600">Brands available to discover</p>
              <Button className="mt-2 w-full">Discover Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📧 Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-600">Active email campaigns</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Featured Brands to Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Ray-Ban', category: 'Classic', price: '$150-$300' },
                  { name: 'Oakley', category: 'Performance', price: '$100-$400' },
                  { name: 'Persol', category: 'Luxury', price: '$200-$500' },
                  { name: 'Maui Jim', category: 'Premium', price: '$200-$400' },
                  { name: 'Warby Parker', category: 'Affordable', price: '$95-$145' },
                  { name: 'Tom Ford', category: 'Luxury', price: '$300-$800' }
                ].map((brand, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent>
                      <h4 className="font-semibold">{brand.name}</h4>
                      <p className="text-sm text-gray-600">{brand.category}</p>
                      <p className="text-sm text-green-600">{brand.price}</p>
                      <Button className="mt-2 w-full text-sm">Add Brand</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
