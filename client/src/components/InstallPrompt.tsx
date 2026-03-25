import React, { useState } from 'react';

interface InstallPromptProps {
  onInstall: () => Promise<boolean>;
}

export default function InstallPrompt({ onInstall }: InstallPromptProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleInstall = async () => {
    const success = await onInstall();
    if (success) {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '20px',
      borderRadius: '16px',
      color: 'white',
      backdropFilter: 'blur(10px)',
      zIndex: 1001,
      maxWidth: '350px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      border: '2px solid #4285f4',
      animation: 'pulse-install 2s infinite'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#4285f4' }}>
        📱 Install App
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#ccc' }}>
        Install juA.kali on your device for offline access and faster performance.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleInstall}
          style={{
            flex: 1,
            background: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1e50cc')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#4285f4')}
        >
          Install
        </button>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            flex: 1,
            background: 'transparent',
            color: '#ccc',
            border: '1px solid #666',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = '#999';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#666';
          }}
        >
          Later
        </button>
      </div>
    </div>
  );
}
