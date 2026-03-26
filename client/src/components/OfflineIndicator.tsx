

export default function OfflineIndicator() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#f44336',
      color: 'white',
      textAlign: 'center',
      padding: '10px',
      zIndex: 2000,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    }}>
      <span>📡</span>
      <span>You are currently offline. Some features may be limited.</span>
    </div>
  );
}
