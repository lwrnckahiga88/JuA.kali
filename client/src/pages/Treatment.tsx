import React, { useState } from 'react';

interface TreatmentProps {
  credits: number;
  usageStats: any;
  onAnalyzeMedicalImages: () => void;
  onProcessMedicalText: () => void;
  onRunPredictionModels: () => void;
}

export default function Treatment(props: TreatmentProps) {
  const [selectedTab, setSelectedTab] = useState('recommendations');

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
          💊 Treatment Planning & Outcome Prediction
        </h1>
        <p style={{ margin: 0, color: '#ccc' }}>
          Clinical decision support system with DQN reinforcement learning for treatment optimization
        </p>
      </div>

      {/* Run Predictions Button */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4285f4' }}>🎯 Run Prediction Models</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          Execute QuorumDeep prediction models for treatment optimization
        </p>
        <button
          onClick={props.onRunPredictionModels}
          disabled={props.credits < 15}
          style={{
            background: props.credits < 15 ? '#666' : '#4285f4',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            cursor: props.credits < 15 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            width: '100%'
          }}
        >
          🚀 Load QuorumDeep {props.credits < 15 ? '(Insufficient Credits)' : ''}
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '1rem'
      }}>
        {['recommendations', 'trajectory', 'fhir'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              background: selectedTab === tab ? '#4285f4' : 'transparent',
              color: selectedTab === tab ? 'white' : '#ccc',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              textTransform: 'capitalize',
              transition: 'all 0.3s'
            }}
          >
            {tab === 'fhir' ? 'FHIR Export' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'recommendations' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Clinical Recommendations</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '1rem 0'
          }}>
            <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
              ✓ <strong>Patient stratification:</strong> IQVIA Quintile Q3 (Median Risk)
            </li>
            <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
              ✓ <strong>Imaging findings:</strong> Tumor volume 32,000 mm³, significant edema
            </li>
            <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
              ✓ <strong>Projected outcome:</strong> 78% survival probability at 28 days
            </li>
            <li style={{ marginBottom: '0.75rem', color: '#ccc' }}>
              ✓ <strong>Monitor for:</strong> Adverse effects and adjust as needed
            </li>
          </ul>

          <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#4285f4' }}>Treatment Options</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Primary Treatment</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>Chemotherapy</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Success Rate</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>78%</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Expected Duration</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>6-8 weeks</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Confidence Score</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>0.92</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'trajectory' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Treatment Outcome Trajectory</h3>
          <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
            Projected patient outcome over 28-day treatment period
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
              <span>Day 0</span>
              <span>Day 7</span>
              <span>Day 14</span>
              <span>Day 21</span>
              <span>Day 28</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: '75%',
                background: 'linear-gradient(90deg, #00C853, #4285f4)',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>

          <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#4285f4' }}>Trajectory Metrics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Current Status</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>Stable</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Improvement Rate</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>+2.5% per day</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Risk Assessment</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00C853' }}>Low</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'fhir' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>FHIR R4 Compliant Report</h3>
          <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
            Healthcare interoperability report in FHIR R4 format
          </p>

          <pre style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: '#ccc',
            maxHeight: '400px',
            overflowY: 'auto',
            marginBottom: '1.5rem'
          }}>
{`{
  "resourceType": "Bundle",
  "type": "document",
  "entry": [
    {
      "resource": {
        "resourceType": "Composition",
        "status": "final",
        "type": {
          "coding": [{
            "system": "http://loinc.org",
            "code": "18842-5",
            "display": "Discharge summary"
          }]
        },
        "subject": {
          "reference": "Patient/example"
        },
        "date": "2026-03-25T21:05:00Z",
        "author": [{
          "reference": "Practitioner/example"
        }],
        "title": "Oncology Treatment Plan"
      }
    }
  ]
}`}
          </pre>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              📥 Download FHIR
            </button>
            <button style={{
              background: 'transparent',
              color: '#4285f4',
              border: '1px solid #4285f4',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              📤 Export to EHR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
