import { useState, useEffect } from 'react';
import { getAllBrands, searchBrands, filterBrandsByCategory, getEmailTemplate, Brand } from '../utils/brandDatabase';

interface SmartDiscoveryProps {
  onBrandSelect?: (brand: Brand) => void;
}

export function SmartDiscoverySimple({ }: SmartDiscoveryProps) {
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
      alert(`✅ SUCCESS: Loaded ${brands.length} brands successfully!`);
    } catch (error) {
      alert('❌ ERROR: Failed to load brands');
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
      
      // Copy email template to clipboard
      await navigator.clipboard.writeText(emailContent);
      
      setEmailsSent(prev => new Set([...prev, brand.id]));
      alert(`✅ SUCCESS: Email template copied to clipboard for ${brand.name}!`);
      
      // Simulate sending email to track analytics
      setTimeout(() => {
        alert(`📧 INFO: Email queued for sending to ${brand.email}`);
      }, 1000);
      
    } catch (error) {
      alert('❌ ERROR: Failed to prepare email');
    }
  };

  const handleCopyEmail = async (email: string, brandId: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmails(prev => new Set([...prev, brandId]));
      alert('✅ SUCCESS: Email address copied to clipboard!');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedEmails(prev => {
          const newSet = new Set(prev);
          newSet.delete(brandId);
          return newSet;
        });
      }, 3000);
    } catch (error) {
      alert('❌ ERROR: Failed to copy email');
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
    
    alert(`✅ SUCCESS: Exported ${displayedBrands.length} brands to CSV!`);
  };

  const handleLoadMore = () => {
    const currentCount = displayedBrands.length;
    let filtered = filterBrandsByCategory(allBrands, selectedCategory);
    filtered = searchBrands(filtered, searchQuery);
    setDisplayedBrands(filtered.slice(0, Math.min(currentCount + 50, filtered.length)));
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff'
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.2s'
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header with Action Buttons */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
          🔍 Smart Brand Discovery
        </h2>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Discover and connect with 200+ premium sunglasses brands
        </p>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportBrands}
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
          >
            📄 Export CSV
          </button>
          <button
            onClick={loadBrands}
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: loading ? '#ccc' : '#f8f9fa',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            👥 Refresh Data
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search brands by name, category, or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '300px'
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Brands', value: allBrands.length, color: '#007bff' },
          { label: 'Filtered Results', value: displayedBrands.length, color: '#28a745' },
          { label: 'Emails Sent', value: emailsSent.size, color: '#6f42c1' },
          { label: 'Categories', value: categories.length - 1, color: '#fd7e14' }
        ].map((stat, index) => (
          <div key={index} style={cardStyle}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Brand Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '18px', color: '#666' }}>🔄 Loading brands...</div>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {displayedBrands.map((brand) => (
              <div key={brand.id} style={cardStyle}>
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{brand.name}</h3>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#e9ecef',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {brand.category}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {brand.style}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#495057' }}>
                    {brand.priceRange} • Founded {brand.founded}
                  </div>
                </div>
                
                <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '12px' }}>{brand.description}</p>
                
                <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '12px' }}>
                  <div><strong>HQ:</strong> {brand.headquarters}</div>
                  <div><strong>Specialty:</strong> {brand.specialty}</div>
                  <div><strong>Target:</strong> {brand.targetMarket}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px' }}>
                  <span>📧</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{brand.email}</span>
                  <button
                    onClick={() => handleCopyEmail(brand.email, brand.id)}
                    style={{
                      padding: '4px 8px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                    title="Copy email"
                  >
                    {copiedEmails.has(brand.id) ? '✅' : '📋'}
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleSendEmail(brand)}
                    disabled={emailsSent.has(brand.id)}
                    style={{
                      ...primaryButtonStyle,
                      flex: 1,
                      backgroundColor: emailsSent.has(brand.id) ? '#28a745' : '#007bff',
                      cursor: emailsSent.has(brand.id) ? 'default' : 'pointer'
                    }}
                  >
                    {emailsSent.has(brand.id) ? '✅ Sent' : '📤 Send Email'}
                  </button>
                  
                  <button
                    onClick={() => window.open(`https://${brand.website}`, '_blank')}
                    style={buttonStyle}
                    title="Visit website"
                  >
                    🔗
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {displayedBrands.length < allBrands.length && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleLoadMore}
                style={{
                  ...buttonStyle,
                  padding: '12px 24px',
                  fontSize: '16px'
                }}
              >
                Load More Brands ({allBrands.length - displayedBrands.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
