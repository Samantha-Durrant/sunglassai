import { useState } from 'react';

export function SendGridSetupInstructions() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div style={{
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '0', color: '#856404' }}>📧 SendGrid Email Integration</h4>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          style={{
            padding: '4px 8px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {showInstructions ? 'Hide' : 'Setup Instructions'}
        </button>
      </div>
      
      {showInstructions && (
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#856404' }}>
          <p><strong>To enable actual email sending:</strong></p>
          <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Create a free SendGrid account at <a href="https://sendgrid.com" target="_blank" rel="noopener noreferrer">sendgrid.com</a></li>
            <li>Go to Settings → API Keys → Create API Key</li>
            <li>Choose "Full Access" and copy your API key</li>
            <li>Open your <code>.env</code> file in the project root</li>
            <li>Replace <code>your_sendgrid_api_key_here</code> with your actual API key</li>
            <li>Restart the development server</li>
            <li>Verify your sender email in SendGrid (anya.sunglassretailer@gmail.com)</li>
          </ol>
          <p><strong>Note:</strong> Without SendGrid setup, emails will be copied to clipboard instead.</p>
        </div>
      )}
    </div>
  );
}
