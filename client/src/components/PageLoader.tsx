import { useEffect, useState } from 'react';
import { getPageConfig, getPageHtmlPath } from '@/lib/pageMapping';

interface PageLoaderProps {
  pageId: string;
  onClose?: () => void;
}

export default function PageLoader({ pageId, onClose }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const config = getPageConfig(pageId);
  const htmlPath = getPageHtmlPath(pageId);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [pageId]);

  if (!config) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#ccc'
      }}>
        <p>Page not found: {pageId}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        background: 'rgba(244, 67, 54, 0.1)',
        borderRadius: '12px',
        color: '#f44336'
      }}>
        <p>Error loading page: {error}</p>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: '1rem',
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '600px'
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10,
          borderRadius: '12px'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTop: '4px solid #4285f4',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p>Loading {config.name}...</p>
          </div>
        </div>
      )}

      {htmlPath ? (
        <iframe
          key={htmlPath}
          src={htmlPath}
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
            borderRadius: '12px',
            background: 'white',
            opacity: isLoading ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
          }}
          title={config.title}
          onLoad={() => setIsLoading(false)}
          onError={() => setError('Failed to load page')}
        />
      ) : (
        <div style={{
          padding: '2rem',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#ccc'
        }}>
          <h3 style={{ color: '#4285f4', marginTop: 0 }}>{config.title}</h3>
          <p>{config.description}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Content for {config.name} is being prepared...
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
