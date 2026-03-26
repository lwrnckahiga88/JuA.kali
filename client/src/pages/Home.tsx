import { useState, useEffect } from 'react';

interface HomeProps {
  credits: number;
  usageStats: {
    imageAnalysis: number;
    textProcessing: number;
    predictions: number;
  };
  onAnalyzeMedicalImages: () => void;
  onProcessMedicalText: () => void;
  onRunPredictionModels: () => void;
}

export default function Home(props: HomeProps) {
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [showOriginalUI, setShowOriginalUI] = useState(true);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      credits: 100,
      features: [
        'Basic image analysis',
        'Limited text processing',
        '1 prediction model',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      credits: 1000,
      features: [
        'Advanced image analysis',
        'Unlimited text processing',
        'All prediction models',
        'Priority support',
        'Custom workflows'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      credits: 10000,
      features: [
        'Unlimited everything',
        'Dedicated support',
        'Custom integrations',
        'On-premise deployment',
        'SLA guarantee'
      ]
    }
  ];

  // Load original index.html as iframe
  if (showOriginalUI) {
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <iframe
          src="/index.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          title="juA.kali Original UI"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
        {/* Floating toggle button to show payment module */}
        <button
          onClick={() => setShowOriginalUI(false)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '12px 24px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 500,
            zIndex: 1000,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          💳 Payment Plans
        </button>
      </div>
    );
  }

  // Show payment module overlay
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      overflowY: 'auto',
      zIndex: 2000,
      padding: '2rem'
    }}>
      {/* Close button */}
      <button
        onClick={() => setShowOriginalUI(true)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 500,
          zIndex: 2001,
          backdropFilter: 'blur(10px)'
        }}
      >
        ✕ Close
      </button>

      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem' }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(0, 200, 83, 0.1), rgba(66, 133, 244, 0.1))',
          padding: '3rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            margin: '0 0 1rem 0',
            background: 'linear-gradient(90deg, #4285f4, #00C853)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🧬 juA.kali Innovation Platform
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '700px',
            margin: '0 auto',
            color: '#ccc'
          }}>
            Advanced Medical AI Platform with BRATS-AFRICA, UNet++, Gemini Vision API, and Agentic Pipeline
          </p>
        </div>

        {/* Quick Access Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(-8px)';
            el.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = 'none';
          }}
          onClick={props.onAnalyzeMedicalImages}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4285f4' }}>Analyze Medical Images</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#ccc', fontSize: '0.9rem' }}>
              Upload and analyze medical images using advanced AI models
            </p>
            <button style={{
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              width: '100%'
            }}>
              Access OncoAI PWA →
            </button>
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              background: 'rgba(66, 133, 244, 0.2)',
              color: '#4285f4',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>
              -10 Credits
            </span>
          </div>

          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(-8px)';
            el.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = 'none';
          }}
          onClick={props.onProcessMedicalText}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4285f4' }}>Process Medical Text</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#ccc', fontSize: '0.9rem' }}>
              Extract clinical insights from medical reports using local AI
            </p>
            <button style={{
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              width: '100%'
            }}>
              Process Text →
            </button>
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              background: 'rgba(66, 133, 244, 0.2)',
              color: '#4285f4',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>
              -5 Credits
            </span>
          </div>

          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(-8px)';
            el.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = 'none';
          }}
          onClick={props.onRunPredictionModels}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4285f4' }}>Run Prediction Models</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#ccc', fontSize: '0.9rem' }}>
              Execute QuorumDeep prediction models for treatment optimization
            </p>
            <button style={{
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              width: '100%'
            }}>
              Load QuorumDeep →
            </button>
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              background: 'rgba(66, 133, 244, 0.2)',
              color: '#4285f4',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>
              -15 Credits
            </span>
          </div>
        </div>

        {/* Usage Statistics */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>📊 Your Usage Statistics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Image Analysis Runs</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>{props.usageStats.imageAnalysis}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Text Processing Runs</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>{props.usageStats.textProcessing}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Prediction Model Runs</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>{props.usageStats.predictions}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Current Credits</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#4285f4' }}>{props.credits}</div>
            </div>
          </div>
        </div>

        {/* Payment Module - Tier Selection */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '3rem'
        }}>
          <h3 style={{ margin: '0 0 2rem 0', color: '#4285f4' }}>💳 Select Your Plan</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                onClick={() => setSelectedTier(tier.name.toLowerCase() as any)}
                style={{
                  background: selectedTier === tier.name.toLowerCase() ? 'rgba(66, 133, 244, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedTier === tier.name.toLowerCase() ? '2px solid #4285f4' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-5px)';
                  el.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4285f4', marginBottom: '0.5rem' }}>
                  {tier.name}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00C853', margin: '1rem 0' }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '1.5rem' }}>
                  {tier.credits} Credits/month
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1.5rem 0',
                  textAlign: 'left'
                }}>
                  {tier.features.map((feature, idx) => (
                    <li key={idx} style={{
                      padding: '0.6rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '0.9rem',
                      color: '#ccc'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <button style={{
                  background: tier.name === 'Free' ? 'transparent' : '#4285f4',
                  color: tier.name === 'Free' ? '#ccc' : 'white',
                  border: tier.name === 'Free' ? '1px solid #666' : 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  width: '100%',
                  marginTop: '1rem'
                }}>
                  {tier.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
