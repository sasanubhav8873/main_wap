import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from './auth.jsx'
import ClientDashboard from './client.jsx'
import FreelancerDashboard from './freelancer.jsx'
import { subscribeToAuthChanges, logOutUser, saveUserRole } from './firebase'

const LogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.5L3.5 9.5V17c0 6.9 5.4 13.4 12.5 14.5C23.1 30.4 28.5 23.9 28.5 17V9.5L16 2.5z"
      fill="rgba(91,140,255,0.12)" stroke="#5B8CFF" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M10.5 16.5l3.8 3.8 7.2-7.6"
      stroke="#5B8CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function LoadingScreen({ onBypass }) {
  const [showBypass, setShowBypass] = useState(false);

  useEffect(() => {
    // Show the manual bypass option if loading takes more than 1.2 seconds
    const bypassTimer = setTimeout(() => {
      setShowBypass(true);
    }, 1200);
    return () => clearTimeout(bypassTimer);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0F1115', color: '#F5F7FA', fontFamily: "'Sora', sans-serif",
      position: 'relative', overflow: 'hidden'
    }}>
      {/* atmospheric background orbs */}
      <div style={{
        position: 'absolute', width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,140,255,0.08) 0%, transparent 70%)',
        top: '30%', left: '35%', filter: 'blur(40px)', pointerEvents: 'none'
      }} />
      
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, zIndex: 10
      }}>
        {/* Pulsing logo */}
        <div style={{
          width: 70, height: 70, borderRadius: 18,
          background: 'rgba(91,140,255,0.12)', border: '1px solid rgba(91,140,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'logoPulse 2s infinite ease-in-out'
        }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2.5L3.5 9.5V17c0 6.9 5.4 13.4 12.5 14.5C23.1 30.4 28.5 23.9 28.5 17V9.5L16 2.5z"
              fill="rgba(91,140,255,0.12)" stroke="#5B8CFF" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M10.5 16.5l3.8 3.8 7.2-7.6"
              stroke="#5B8CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.025em', color: '#F5F7FA' }}>
            Escrow Admin<span style={{ color: '#5B8CFF' }}>.</span>
          </h2>
          <p style={{ fontSize: 12.5, color: '#9AA4B2', opacity: 0.75 }}>Securing your workspace...</p>
        </div>
        
        {/* Sleek progress slider bar */}
        <div style={{
          width: 140, height: 3, background: 'rgba(38,43,54,0.8)', borderRadius: 99, overflow: 'hidden', position: 'relative'
        }}>
          <div style={{
            position: 'absolute', height: '100%', width: '50%', background: '#5B8CFF', borderRadius: 99,
            animation: 'slideProgress 1.4s infinite ease-in-out',
            boxShadow: '0 0 8px rgba(91,140,255,0.5)'
          }} />
        </div>

        {/* Dynamic Bypass Option */}
        {showBypass && (
          <button 
            type="button"
            onClick={onBypass}
            style={{
              marginTop: 14, fontSize: 12.5, color: '#5B8CFF', textDecoration: 'none',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontWeight: 600, animation: 'fadeIn 0.5s ease both', opacity: 0.85,
              transition: 'opacity 0.2s ease', fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
          >
            Taking too long? Enter Sandbox Mode
          </button>
        )}
      </div>
      
      {/* Keyframe injection */}
      <style>{`
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; box-shadow: 0 0 0 0 rgba(91,140,255,0.2); }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 20px 4px rgba(91,140,255,0.15); }
        }
        @keyframes slideProgress {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 0.85; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function App() {
  const [session, setSession] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [activeRole, setActiveRole] = useState(null)

  useEffect(() => {
    // Safety net: Force clear the loading screen after 1.5 seconds if auth hangs (e.g. slow network)
    const safetyTimeout = setTimeout(() => {
      setInitializing((init) => {
        if (init) {
          console.warn("Authentication initialization timed out. Clearing loading screen.");
          return false;
        }
        return init;
      });
    }, 1500);

    // Subscribe to active (Live/Mock) authentication sessions
    const unsubscribe = subscribeToAuthChanges((user) => {
      clearTimeout(safetyTimeout);
      setSession(user);
      setInitializing(false);
    });
    
    return () => {
      clearTimeout(safetyTimeout);
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logOutUser();
      setSession(null);
      setActiveRole(null);
    } catch (e) {
      console.error("Sign out process encountered an error:", e);
    }
  };

  if (initializing) {
    return <LoadingScreen onBypass={() => setInitializing(false)} />;
  }

  // Render role selection overlay directly in App if user is logged in but hasn't picked a workspace for this session
  if (session && !activeRole) {
    return (
      <div className="sr-role-modal-overlay">
        <div className="sr-role-modal">
          <div className="sr-role-modal-logo">
            <LogoMark size={36} />
          </div>
          <h3 className="sr-role-modal-title">Choose Workspace</h3>
          <p className="sr-role-modal-sub">
            Welcome back! Select the secure workspace you would like to enter for this session.
          </p>
          <div className="sr-role-modal-options">
            <button 
              type="button"
              className="sr-role-modal-btn sr-role-modal-btn--freelancer"
              onClick={() => setActiveRole('freelancer')}
            >
              <div className="sr-role-modal-icon">💼</div>
              <div className="sr-role-modal-btn-content">
                <span className="sr-role-modal-btn-title">Freelancer Workspace</span>
                <span className="sr-role-modal-btn-desc">Work on contracts & earn protected yield</span>
              </div>
            </button>
            <button 
              type="button"
              className="sr-role-modal-btn sr-role-modal-btn--client"
              onClick={() => setActiveRole('client')}
            >
              <div className="sr-role-modal-icon">🛡️</div>
              <div className="sr-role-modal-btn-content">
                <span className="sr-role-modal-btn-title">Client Workspace</span>
                <span className="sr-role-modal-btn-desc">Deposit escrow & manage milestones</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeRole === 'freelancer') {
    return <FreelancerDashboard name={session.name} onSignOut={handleSignOut} />
  }

  if (activeRole === 'client') {
    return <ClientDashboard name={session.name} onSignOut={handleSignOut} />
  }

  return <SignIn onSignIn={setSession} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
