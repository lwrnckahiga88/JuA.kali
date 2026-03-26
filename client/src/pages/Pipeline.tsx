import { useState } from 'react';

interface PipelineProps {
  credits: number;
  usageStats: any;
  onAnalyzeMedicalImages: () => void;
  onProcessMedicalText: () => void;
  onRunPredictionModels: () => void;
}

export default function Pipeline(props: PipelineProps) {
  const [selectedTab, setSelectedTab] = useState('messages');
  const [pipelineRuns, setPipelineRuns] = useState<any[]>([]);

  const startPipeline = () => {
    const newRun = {
      id: Date.now(),
      status: 'running',
      startTime: new Date().toLocaleString(),
      stages: [
        { name: 'IMAGE_UPLOAD', status: 'complete' },
        { name: 'IMAGE_PREPROCESSING', status: 'complete' },
        { name: 'SEGMENTATION', status: 'running' },
        { name: 'GEMINI_ANALYSIS', status: 'pending' },
        { name: 'CLINICAL_INTEGRATION', status: 'pending' },
        { name: 'TREATMENT_OPTIMIZATION', status: 'pending' },
        { name: 'DECISION_SUPPORT', status: 'pending' },
        { name: 'FINAL_REPORT', status: 'pending' }
      ]
    };
    setPipelineRuns([newRun, ...pipelineRuns]);
  };

  const stages = [
    { name: 'IMAGE_UPLOAD', description: 'Receive and validate medical image' },
    { name: 'IMAGE_PREPROCESSING', description: 'Normalize, skull strip, register MRI' },
    { name: 'SEGMENTATION', description: 'Run UNet++ model for tumor segmentation' },
    { name: 'GEMINI_ANALYSIS', description: 'Multi-modal analysis with Gemini Vision API' },
    { name: 'CLINICAL_INTEGRATION', description: 'Integrate findings with patient records' },
    { name: 'TREATMENT_OPTIMIZATION', description: 'Apply DQN RL for treatment selection' },
    { name: 'DECISION_SUPPORT', description: 'Generate clinical recommendations' },
    { name: 'FINAL_REPORT', description: 'Create FHIR R4 compliant report' }
  ];

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
          🔄 Agentic Pipeline
        </h1>
        <p style={{ margin: 0, color: '#ccc' }}>
          8-stage orchestration with multi-agent collaboration for comprehensive analysis
        </p>
      </div>

      {/* Start Pipeline Button */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={startPipeline}
          style={{
            background: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          🚀 Start New Pipeline
        </button>

        {pipelineRuns.length > 0 && (
          <div>
            <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Recent Runs</h3>
            {pipelineRuns.map((run) => (
              <div key={run.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ color: '#fff' }}>Pipeline Run #{run.id}</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
                    Started: {run.startTime}
                  </p>
                </div>
                <span style={{
                  background: run.status === 'running' ? '#FFC107' : '#00C853',
                  color: run.status === 'running' ? '#333' : 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  {run.status === 'running' ? '⏳ Running' : '✓ Complete'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '1rem'
      }}>
        {['messages', 'metrics', 'workflow'].map((tab) => (
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
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'messages' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          maxHeight: '400px',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: '#ccc' }}>Agent messages will appear here during pipeline execution...</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
            💬 Waiting for pipeline to start...
          </p>
        </div>
      )}

      {selectedTab === 'metrics' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>Pipeline Metrics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Total Messages</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Success Rate</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0%</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Pipeline Duration</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0s</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'workflow' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>Pipeline Stages</h3>
          {stages.map((stage, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '1rem',
                borderBottom: idx < stages.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                gap: '1rem'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                background: '#4285f4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <div>
                <strong style={{ color: '#fff' }}>{stage.name}</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Process Medical Text Section */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4285f4' }}>📝 Process Medical Text</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          Extract clinical insights from medical reports using local AI models
        </p>
        <button
          onClick={props.onProcessMedicalText}
          disabled={props.credits < 5}
          style={{
            background: props.credits < 5 ? '#666' : '#4285f4',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            cursor: props.credits < 5 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            width: '100%'
          }}
        >
          🔍 Process with Local AI {props.credits < 5 ? '(Insufficient Credits)' : ''}
        </button>
      </div>
    </div>
  );
}
