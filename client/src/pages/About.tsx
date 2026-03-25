import React from 'react';

interface AboutProps {
  credits: number;
  usageStats: any;
  onAnalyzeMedicalImages: () => void;
  onProcessMedicalText: () => void;
  onRunPredictionModels: () => void;
}

export default function About(props: AboutProps) {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(0, 200, 83, 0.1), rgba(66, 133, 244, 0.1))',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          margin: '0 0 0.5rem 0',
          color: '#4285f4'
        }}>
          ℹ️ About juA.kali
        </h1>
        <p style={{ margin: 0, color: '#ccc' }}>
          Advanced Medical AI Platform for Oncology and Clinical Decision Support
        </p>
      </div>

      {/* Platform Overview */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Platform Overview</h3>
        <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '1rem' }}>
          juA.kali is a comprehensive medical AI platform designed for oncology and clinical decision support. 
          It integrates cutting-edge machine learning models, multi-modal AI analysis, and healthcare interoperability 
          standards to provide clinicians with actionable insights and treatment recommendations.
        </p>
        <p style={{ color: '#ccc', lineHeight: '1.8' }}>
          The platform combines BRATS-AFRICA brain tumor segmentation datasets, UNet++ deep learning architecture, 
          Google Gemini Vision API for multi-modal analysis, and reinforcement learning-based treatment optimization 
          to deliver comprehensive clinical decision support.
        </p>
      </div>

      {/* Key Technologies */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>🔬 Key Technologies</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { name: 'BRATS-AFRICA', desc: 'Brain tumor segmentation dataset' },
            { name: 'UNet++', desc: 'Advanced medical image segmentation' },
            { name: 'Gemini Vision API', desc: 'Multi-modal AI analysis' },
            { name: 'DQN RL', desc: 'Treatment optimization' },
            { name: 'FHIR R4', desc: 'Healthcare interoperability' },
            { name: 'PWA', desc: 'Progressive Web App technology' }
          ].map((tech, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <strong style={{ color: '#4285f4' }}>{tech.name}</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>✨ Core Features</h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '1rem 0'
        }}>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Medical Image Analysis:</strong> Advanced tumor segmentation with BRATS-AFRICA and UNet++
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Multi-Modal Analysis:</strong> Gemini Vision API for comprehensive image understanding
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Agentic Pipeline:</strong> 8-stage orchestration with multi-agent collaboration
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Treatment Optimization:</strong> DQN reinforcement learning for personalized recommendations
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Clinical Decision Support:</strong> Evidence-based treatment planning
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Healthcare Interoperability:</strong> FHIR R4 compliant reporting
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Offline Functionality:</strong> Progressive Web App with service worker support
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Credit-Based System:</strong> Flexible pricing with usage tracking
          </li>
        </ul>
      </div>

      {/* Pipeline Stages */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>🔄 8-Stage Agentic Pipeline</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { num: 1, name: 'Image Upload', desc: 'Receive and validate medical images' },
            { num: 2, name: 'Preprocessing', desc: 'Normalize and prepare images' },
            { num: 3, name: 'Segmentation', desc: 'UNet++ tumor segmentation' },
            { num: 4, name: 'Gemini Analysis', desc: 'Multi-modal AI analysis' },
            { num: 5, name: 'Clinical Integration', desc: 'Patient record integration' },
            { num: 6, name: 'Treatment Optimization', desc: 'DQN RL optimization' },
            { num: 7, name: 'Decision Support', desc: 'Generate recommendations' },
            { num: 8, name: 'FHIR Report', desc: 'Create interoperable report' }
          ].map((stage, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                background: '#4285f4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                margin: '0 auto 0.5rem'
              }}>
                {stage.num}
              </div>
              <strong style={{ color: '#4285f4' }}>{stage.name}</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#ccc' }}>
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PWA Features */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>📱 Progressive Web App Features</h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '1rem 0'
        }}>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Offline Support:</strong> Service workers enable offline functionality
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Install to Home Screen:</strong> Native app-like experience on mobile
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Local Data Storage:</strong> IndexedDB for persistent offline data
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Background Sync:</strong> Automatic sync when connection restored
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Push Notifications:</strong> Real-time alerts and updates
          </li>
          <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
            ✓ <strong>Fast Loading:</strong> Optimized caching and performance
          </li>
        </ul>
      </div>

      {/* Credits System */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>💳 Credit System</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          juA.kali uses a flexible credit-based system for usage tracking and billing:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00C853' }}>10</div>
            <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>Image Analysis</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00C853' }}>5</div>
            <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>Text Processing</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00C853' }}>15</div>
            <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>Prediction Models</div>
          </div>
        </div>
      </div>
    </div>
  );
}
