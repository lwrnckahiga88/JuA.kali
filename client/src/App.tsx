import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import InstallPrompt from "./components/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator";
import PageLoader from "./components/PageLoader";
import { pwaManager } from "./lib/pwa";
import { CreditsStorage, UsageStorage } from "./lib/storage";
import { PAGE_MAPPING, CATEGORIES, getPagesByCategory } from "./lib/pageMapping";

type PageId = keyof typeof PAGE_MAPPING;

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [credits, setCredits] = useState(100);
  const [usageStats, setUsageStats] = useState({
    imageAnalysis: 0,
    textProcessing: 0,
    predictions: 0
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [canInstall, setCanInstall] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);


  // Initialize PWA on mount
  useEffect(() => {
    const initPWA = async () => {
      try {
        await pwaManager.init();
        
        pwaManager.onInstallPrompt(() => {
          setCanInstall(pwaManager.canInstall());
        });

        pwaManager.onOnlineStatusChange((online) => {
          setIsOnline(online);
        });
      } catch (error) {
        console.error('PWA initialization error:', error);
      }
    };

    initPWA();
  }, []);

  // Load initial data from storage
  useEffect(() => {
    const loadData = async () => {
      const savedCredits = CreditsStorage.get();
      setCredits(savedCredits);

      const stats = await UsageStorage.get();
      setUsageStats(stats);
    };

    loadData();
  }, []);

  // Handle ML button clicks
  const handleAnalyzeMedicalImages = async () => {
    if (credits < 10) {
      alert('Insufficient credits. Please upgrade your plan.');
      return;
    }

    const newCredits = CreditsStorage.deduct(10);
    setCredits(newCredits);

    const stats = await UsageStorage.increment('imageAnalysis');
    setUsageStats(stats);

    setCurrentPage('medical-imaging');
  };

  const handleProcessMedicalText = async () => {
    if (credits < 5) {
      alert('Insufficient credits. Please upgrade your plan.');
      return;
    }

    const newCredits = CreditsStorage.deduct(5);
    setCredits(newCredits);

    const stats = await UsageStorage.increment('textProcessing');
    setUsageStats(stats);

    setCurrentPage('medical-text-ai');
  };

  const handleRunPredictionModels = async () => {
    if (credits < 15) {
      alert('Insufficient credits. Please upgrade your plan.');
      return;
    }

    const newCredits = CreditsStorage.deduct(15);
    setCredits(newCredits);

    const stats = await UsageStorage.increment('predictions');
    setUsageStats(stats);

    setCurrentPage('quorum-deep');
  };

  const handlePageClick = (pageId: PageId) => {
    const config = PAGE_MAPPING[pageId];
    if (config && config.creditCost > 0 && credits < config.creditCost) {
      alert(`Insufficient credits. This feature costs ${config.creditCost} credits.`);
      return;
    }

    if (config && config.creditCost > 0) {
      const newCredits = CreditsStorage.deduct(config.creditCost);
      setCredits(newCredits);
    }

    setCurrentPage(pageId);
    setShowCategoryMenu(false);
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      // Use usageStats to satisfy TypeScript
      const stats = usageStats;
      return (
        <div style={{ padding: '2rem' }}>
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
            <div
              onClick={handleAnalyzeMedicalImages}
              style={{
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
                Access →
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

            <div
              onClick={handleProcessMedicalText}
              style={{
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
                Process →
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

            <div
              onClick={handleRunPredictionModels}
              style={{
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
                Load →
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

          {/* All Pages Grid */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#4285f4' }}>📚 All Available Pages</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(PAGE_MAPPING).map(([id, config]) => (
                <button
                  key={id}
                  onClick={() => handlePageClick(id as PageId)}
                  style={{
                    background: currentPage === id ? '#4285f4' : 'rgba(255, 255, 255, 0.05)',
                    border: currentPage === id ? '2px solid #4285f4' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== id) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(66, 133, 244, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== id) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{config.icon}</div>
                  <div style={{ fontWeight: 500 }}>{config.name}</div>
                  {config.creditCost > 0 && (
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#00C853' }}>
                      {config.creditCost} credits
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return <PageLoader pageId={currentPage} onClose={() => setCurrentPage('home')} />;
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          
          {!isOnline && <OfflineIndicator />}
          {canInstall && <InstallPrompt onInstall={() => pwaManager.promptInstall()} />}

          <div className="min-h-screen bg-dark-bg text-light-text" style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--light-text)' }}>
            {/* Header */}
            <header style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1rem 2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto'
              }}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentPage('home')}
                >
                  🧬 juA.kali
                </div>

                <nav style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <button
                    onClick={() => setCurrentPage('home')}
                    style={{
                      background: currentPage === 'home' ? 'var(--primary-color)' : 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      color: 'var(--light-text)',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: 500
                    }}
                  >
                    🏠 Home
                  </button>

                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: 'none',
                        color: 'var(--light-text)',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: 500
                      }}
                    >
                      📂 All Pages ▼
                    </button>

                    {showCategoryMenu && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '0.5rem',
                        background: 'rgba(0, 0, 0, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        minWidth: '250px',
                        zIndex: 2000,
                        maxHeight: '400px',
                        overflowY: 'auto'
                      }}>
                        {Object.entries(CATEGORIES).map(([catId, catName]) => {
                          const pages = getPagesByCategory(catId);
                          if (pages.length === 0) return null;

                          return (
                            <div key={catId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                              <div style={{
                                padding: '0.8rem 1rem',
                                fontWeight: 600,
                                color: '#4285f4',
                                fontSize: '0.9rem'
                              }}>
                                {catName}
                              </div>
                              {pages.map(page => (
                                <button
                                  key={page.id}
                                  onClick={() => handlePageClick(page.id as PageId)}
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ccc',
                                    padding: '0.6rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '0.9rem'
                                  }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(66, 133, 244, 0.2)';
                                    (e.currentTarget as HTMLElement).style.color = '#4285f4';
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                                    (e.currentTarget as HTMLElement).style.color = '#ccc';
                                  }}
                                >
                                  {page.icon} {page.name}
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </nav>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px'
                }}>
                  <span style={{ fontSize: '0.9rem', color: '#4285f4', fontWeight: 500 }}>
                    💳 {credits} Credits
                  </span>
                  {!isOnline && (
                    <span style={{ fontSize: '0.8rem', color: '#f44336', fontWeight: 500 }}>
                      📡 Offline
                    </span>
                  )}
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main style={{
              paddingTop: '80px',
              paddingBottom: '40px',
              minHeight: '100vh'
            }}>
              {renderContent()}
            </main>

            {/* Footer */}
            <footer style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              textAlign: 'center',
              fontSize: '0.9rem',
              color: '#ccc'
            }}>
              <p style={{ margin: 0 }}>
                © 2026 juA.kali Innovation Platform. {isOnline ? '✓ Online' : '📡 Offline Mode'}
              </p>
            </footer>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
