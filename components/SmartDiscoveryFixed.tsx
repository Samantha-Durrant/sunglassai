import { useState, useEffect } from 'react';
import { getAllBrands, searchBrands, filterBrandsByCategory, getEmailTemplate, Brand } from '../utils/brandDatabase';

export function SmartDiscoveryFixed() {
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [displayedBrands, setDisplayedBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [emailsSent, setEmailsSent] = useState<Set<string>>(new Set());
  const [copiedEmails, setCopiedEmails] = useState<Set<string>>(new Set());
  const [debugInfo, setDebugInfo] = useState('Component loaded');

  const categories = ['all', 'Luxury', 'Ultra Luxury', 'Sports', 'Fashion', 'Designer', 'Performance', 'Direct-to-Consumer'];

  useEffect(() => {
    console.log('SmartDiscoveryFixed component mounted');
    loadBrands();
  }, []);

  useEffect(() => {
    filterBrands();
  }, [searchQuery, selectedCategory, allBrands]);

  const loadBrands = async () => {
    console.log('Loading brands...');
    setLoading(true);
    setDebugInfo('Loading brands...');
    
    try {
      const brands = getAllBrands();
      console.log(`Loaded ${brands.length} brands`);
      setAllBrands(brands);
      setDisplayedBrands(brands.slice(0, 50));
      setDebugInfo(`Loaded ${brands.length} brands successfully!`);
      alert(`✅ SUCCESS: Loaded ${brands.length} brands successfully!`);
    } catch (error) {
      console.error('Error loading brands:', error);
      setDebugInfo('Failed to load brands');
      alert('❌ ERROR: Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  const filterBrands = () => {
    let filtered = filterBrandsByCategory(allBrands, selectedCategory);
    filtered = searchBrands(filtered, searchQuery);
    setDisplayedBrands(filtered.slice(0, 100));
    setDebugInfo(`Showing ${filtered.slice(0, 100).length} of ${filtered.length} brands`);
  };

  const handleSendEmail = (brand: Brand) => {
    console.log('Send email clicked for:', brand.name);
    setDebugInfo(`Preparing email for ${brand.name}...`);
    
    try {
      const emailContent = getEmailTemplate(brand.name);
      navigator.clipboard.writeText(emailContent).then(() => {
        setEmailsSent(prev => new Set([...prev, brand.id]));
        setDebugInfo(`Email template copied for ${brand.name}!`);
        alert(`✅ SUCCESS: Email template copied to clipboard for ${brand.name}!`);
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setEmailsSent(prev => new Set([...prev, brand.id]));
        setDebugInfo(`Email template copied for ${brand.name}!`);
        alert(`✅ SUCCESS: Email template copied to clipboard for ${brand.name}!`);
      });
    } catch (error) {
      console.error('Error preparing email:', error);
      setDebugInfo('Failed to prepare email');
      alert('❌ ERROR: Failed to prepare email');
    }
  };

  const handleCopyEmail = (email: string, brandId: string) => {
    console.log('Copy email clicked for:', email);
    setDebugInfo(`Copying email: ${email}...`);
    
    try {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmails(prev => new Set([...prev, brandId]));
        setDebugInfo(`Email address copied: ${email}`);
        alert('✅ SUCCESS: Email address copied to clipboard!');
        
        setTimeout(() => {
          setCopiedEmails(prev => {
            const newSet = new Set(prev);
            newSet.delete(brandId);
            return newSet;
          });
        }, 3000);
      }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopiedEmails(prev => new Set([...prev, brandId]));
        setDebugInfo(`Email address copied: ${email}`);
        alert('✅ SUCCESS: Email address copied to clipboard!');
      });
    } catch (error) {
      console.error('Error copying email:', error);
      setDebugInfo('Failed to copy email');
      alert('❌ ERROR: Failed to copy email');
    }
  };

  const handleExportBrands = () => {
    console.log('Export brands clicked');
    setDebugInfo('Exporting brands to CSV...');
    
    try {
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
      
      setDebugInfo(`Exported ${displayedBrands.length} brands to CSV!`);
      alert(`✅ SUCCESS: Exported ${displayedBrands.length} brands to CSV!`);
    } catch (error) {
      console.error('Error exporting brands:', error);
      setDebugInfo('Failed to export brands');
      alert('❌ ERROR: Failed to export brands');
    }
  };

  const handleLoadMore = () => {
    console.log('Load more clicked');
    const currentCount = displayedBrands.length;
    let filtered = filterBrandsByCategory(allBrands, selectedCategory);
    filtered = searchBrands(filtered, searchQuery);
    const newCount = Math.min(currentCount + 50, filtered.length);
    setDisplayedBrands(filtered.slice(0, newCount));
    setDebugInfo(`Loaded ${newCount} of ${filtered.length} brands`);
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
    setDebugInfo('Refreshing brand data...');
    loadBrands();
  };

  const testButton = () => {
    console.log('Test button clicked!');
    alert('🎉 Test button works! The problem is solved.');
    setDebugInfo('Test button clicked successfully!');
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Debug Panel */}
      <div style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #2196f3',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>🐛 Debug Info</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>{debugInfo}</p>
        <button
          onClick={testButton}
          style={{
            marginTop: '8px',
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🧪 Test Button (Click Me!)
        </button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#333', 
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          🔍 Smart Brand Discovery (Fixed Version)
        </h2>
        <p style={{ 
          color: '#666', 
          marginBottom: '16px',
          textAlign: 'center',
          fontSize: '16px'
        }}>
          Discover and connect with 200+ premium sunglasses brands
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleExportBrands}
            style={{
              padding: '12px 20px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#138496'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#17a2b8'}
          >
            📄 Export CSV ({displayedBrands.length} brands)
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              padding: '12px 20px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {loading ? '⏳ Loading...' : '🔄 Refresh Data'}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Search brands by name, category, or specialty..."
          value={searchQuery}
          onChange={(e) => {
            console.log('Search changed:', e.target.value);
            setSearchQuery(e.target.value);
          }}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            fontSize: '16px',
            minWidth: '300px',
            maxWidth: '500px'
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => {
            console.log('Category changed:', e.target.value);
            setSelectedCategory(e.target.value);
          }}
          style={{
            padding: '12px 16px',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer'
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
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px',
        maxWidth: '800px',
        margin: '0 auto 32px auto'
      }}>
        {[
          { label: 'Total Brands', value: allBrands.length, color: '#007bff', icon: '📊' },
          { label: 'Filtered Results', value: displayedBrands.length, color: '#28a745', icon: '🔍' },
          { label: 'Emails Sent', value: emailsSent.size, color: '#6f42c1', icon: '📧' },
          { label: 'Categories', value: categories.length - 1, color: '#fd7e14', icon: '🏷️' }
        ].map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: stat.color,
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Brand Grid */}
      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div style={{ fontSize: '24px', color: '#666', fontWeight: '600' }}>Loading brands...</div>
          <div style={{ fontSize: '16px', color: '#999', marginTop: '8px' }}>Please wait while we load the brand database</div>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '24px',
            marginBottom: '32px'
          }}>
            {displayedBrands.map((brand) => (
              <div key={brand.id} style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    {brand.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {brand.category}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f3e5f5',
                      color: '#7b1fa2',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {brand.style}
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#495057',
                    marginBottom: '8px'
                  }}>
                    💰 {brand.priceRange} • 📅 Founded {brand.founded}
                  </div>
                </div>
                
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6c757d', 
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  {brand.description}
                </p>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6c757d', 
                  marginBottom: '16px',
                  backgroundColor: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <div style={{ marginBottom: '4px' }}>🏢 <strong>HQ:</strong> {brand.headquarters}</div>
                  <div style={{ marginBottom: '4px' }}>⭐ <strong>Specialty:</strong> {brand.specialty}</div>
                  <div>🎯 <strong>Target:</strong> {brand.targetMarket}</div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginBottom: '20px',
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  <span>📧</span>
                  <span style={{ 
                    flex: 1, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    fontFamily: 'monospace',
                    fontSize: '13px'
                  }}>
                    {brand.email}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopyEmail(brand.email, brand.id);
                    }}
                    style={{
                      padding: '6px 10px',
                      border: 'none',
                      backgroundColor: copiedEmails.has(brand.id) ? '#28a745' : '#6c757d',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    title="Copy email address"
                  >
                    {copiedEmails.has(brand.id) ? '✅ Copied' : '📋 Copy'}
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendEmail(brand);
                    }}
                    disabled={emailsSent.has(brand.id)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: emailsSent.has(brand.id) ? '#28a745' : '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: emailsSent.has(brand.id) ? 'default' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!emailsSent.has(brand.id)) {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!emailsSent.has(brand.id)) {
                        e.currentTarget.style.backgroundColor = '#007bff';
                      }
                    }}
                  >
                    {emailsSent.has(brand.id) ? '✅ Email Sent' : '📤 Send Collaboration Email'}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(`https://${brand.website}`, '_blank');
                    }}
                    style={{
                      padding: '12px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Visit website"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                  >
                    🔗
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {displayedBrands.length < allBrands.length && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={handleLoadMore}
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#138496';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#17a2b8';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                📚 Load More Brands ({allBrands.length - displayedBrands.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
