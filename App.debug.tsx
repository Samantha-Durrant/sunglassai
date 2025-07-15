import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';

// Test UI components
import { Toaster } from './components/ui/sonner';
import { AuthScreen } from './components/AuthScreen';

// Test Supabase imports step by step
const testComponents = () => {
  console.log('Testing all components...');
  try {
    console.log('✅ Supabase info imported:', !!projectId, !!publicAnonKey);
    
    // Test Supabase client creation
    const supabase = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
    console.log('✅ Supabase client created:', !!supabase);
    console.log('✅ AuthScreen component imported');
    
    return { step: 4, success: true, message: 'All components loaded successfully' };
  } catch (error: any) {
    console.error('❌ Error:', error);
    return { step: 4, success: false, message: error.message };
  }
};

export default function App() {
  const [testResult, setTestResult] = useState('Testing...');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const result = testComponents();
    setTestResult(`${result.success ? '✅' : '❌'} ${result.message}`);
    if (result.success) {
      setShowAuth(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', email);
    // Mock login for testing
    alert('Login functionality works! (Mock login)');
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    console.log('Signup attempt:', email, name);
    alert('Signup functionality works! (Mock signup)');
  };

  if (showAuth) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Toaster />
        <div style={{ padding: '20px', background: '#f0f0f0' }}>
          <h2>✅ All Components Loaded Successfully!</h2>
          <p>Showing AuthScreen component:</p>
        </div>
        <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Toaster />
      <h1>🕶️ SunglassAI - Debug Mode</h1>
      <p>Status: {testResult}</p>
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Step 1: Basic React ✅</h3>
        <p>React is working correctly!</p>
      </div>
      <div style={{ background: '#e8f4fd', padding: '10px', margin: '10px 0' }}>
        <h3>Step 2: Supabase Client ✅</h3>
        <p>Supabase configuration and client creation working.</p>
      </div>
      <div style={{ background: '#f0fff0', padding: '10px', margin: '10px 0' }}>
        <h3>Step 3: UI Components ✅</h3>
        <p>Testing toast notifications and other UI components.</p>
      </div>
      <div style={{ background: '#fff5f5', padding: '10px', margin: '10px 0' }}>
        <h3>Step 4: AuthScreen Component Testing...</h3>
        <p>Loading the authentication screen component.</p>
      </div>
    </div>
  );
}
