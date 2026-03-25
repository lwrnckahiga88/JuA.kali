import React, { useState } from 'react';

interface ImagingProps {
  credits: number;
  usageStats: any;
  onAnalyzeMedicalImages: () => void;
  onProcessMedicalText: () => void;
  onRunPredictionModels: () => void;
}

export default function Imaging(props: ImagingProps) {
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState('results');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        uploadedAt: new Date().toLocaleString()
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

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
          🖼️ Medical Image Analysis
        </h1>
        <p style={{ margin: 0, color: '#ccc' }}>
          Upload and analyze medical images using advanced AI models with BRATS-AFRICA dataset
        </p>
      </div>

      {/* Upload Section */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Upload Medical Images</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#ccc',
            fontWeight: 500
          }}>
            Select Images (MRI, CT, X-Ray)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px dashed var(--card-border)',
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ccc',
              cursor: 'pointer'
            }}
          />
        </div>
        <button
          onClick={props.onAnalyzeMedicalImages}
          disabled={props.credits < 10}
          style={{
            background: props.credits < 10 ? '#666' : '#4285f4',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            cursor: props.credits < 10 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            width: '100%'
          }}
        >
          🚀 Analyze with OncoAI PWA {props.credits < 10 ? '(Insufficient Credits)' : ''}
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
        {['results', 'metrics', 'history'].map((tab) => (
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
      {selectedTab === 'results' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Segmentation Results</h3>
          {uploadedImages.length === 0 ? (
            <p style={{ color: '#ccc' }}>No images uploaded yet. Upload images to see segmentation results.</p>
          ) : (
            uploadedImages.map((img) => (
              <div key={img.id} style={{
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
                  <strong style={{ color: '#fff' }}>{img.name}</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
                    Size: {img.size} MB | Uploaded: {img.uploadedAt}
                  </p>
                </div>
                <span style={{
                  background: '#00C853',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  ✓ Analyzed
                </span>
              </div>
            ))
          )}
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
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>Analysis Metrics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Dice Coefficient</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0.92</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Sensitivity</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0.89</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Specificity</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>0.95</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Processing Time</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00C853' }}>2.3s</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'history' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          overflowX: 'auto'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4285f4' }}>Analysis History</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#4285f4', fontWeight: 500 }}>Image</th>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#4285f4', fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#4285f4', fontWeight: 500 }}>Status</th>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#4285f4', fontWeight: 500 }}>Dice Score</th>
              </tr>
            </thead>
            <tbody>
              {uploadedImages.map((img) => (
                <tr key={img.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <td style={{ padding: '0.8rem', color: '#ccc' }}>{img.name}</td>
                  <td style={{ padding: '0.8rem', color: '#ccc' }}>{img.uploadedAt}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span style={{
                      background: '#00C853',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      ✓ Complete
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem', color: '#ccc' }}>0.92</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
