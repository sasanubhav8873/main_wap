import { useState } from 'react';
import './styles.css';
import { 
  signInUser, 
  signUpUser, 
  signInWithGoogle, 
  saveUserRole, 
  isFirebaseConfigured 
} from './firebase';

/* ─── Inline SVG Icons ─── */
const LogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.5L3.5 9.5V17c0 6.9 5.4 13.4 12.5 14.5C23.1 30.4 28.5 23.9 28.5 17V9.5L16 2.5z"
      fill="rgba(91,140,255,0.12)" stroke="#5B8CFF" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M10.5 16.5l3.8 3.8 7.2-7.6"
      stroke="#5B8CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8.5 12l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 20V4M4 12l8-8 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HexLockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5l8 4.6v9.8L12 21.5l-8-4.6V7.1L12 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="9" y="11" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 11V9.5a2 2 0 014 0V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.1 10.1 0 0112 20c-7 0-11-8-11-8a18.4 18.4 0 015.06-5.94"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.9 4.24A9.1 9.1 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ─── Floating Card Data ─── */
const CARDS = [
  {
    id: 1,
    wrapClass: 'sr-cw-1',
    cardClass: 'sr-fc-1',
    iconClass: 'sr-fi--blue',
    Icon: ShieldCheckIcon,
    label: 'Payment Locked',
    amount: '₹10,37,500',
    detail: 'Escrow Active · Contract #4821',
    badge: 'Active',
    badgeClass: 'sr-badge--blue',
  },
  {
    id: 2,
    wrapClass: 'sr-cw-2',
    cardClass: 'sr-fc-2',
    iconClass: 'sr-fi--green',
    Icon: CheckCircleIcon,
    label: 'Milestone Approved',
    amount: null,
    detail: 'Design Phase Complete · 2m ago',
    badge: 'Done',
    badgeClass: 'sr-badge--green',
  },
  {
    id: 3,
    wrapClass: 'sr-cw-3',
    cardClass: 'sr-fc-3',
    iconClass: 'sr-fi--blue',
    Icon: ArrowUpIcon,
    label: 'Funds Released',
    amount: '₹2,65,600',
    detail: 'To: alex@studio.io',
    badge: 'Sent',
    badgeClass: 'sr-badge--green',
  },
  {
    id: 4,
    wrapClass: 'sr-cw-4',
    cardClass: 'sr-fc-4',
    iconClass: 'sr-fi--neutral',
    Icon: HexLockIcon,
    label: 'Transaction Secured',
    amount: null,
    detail: '256-bit encrypted · Verified',
    badge: 'Live',
    badgeClass: 'sr-badge--blue',
  },
];

/* ─── Main Component ─── */
export default function SignIn({ onSignIn }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('freelancer');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  
  // Custom auth states
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError]       = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [tempGoogleUser, setTempGoogleUser] = useState(null);

  const handleAuth = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;
    setError(null);

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError("Please fill in both email and password fields.");
      return;
    }

    if (isSignUp && !name.trim()) {
      setError("Please enter your name to register.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        // Create user via Unified service
        const user = await signUpUser(emailTrimmed, passwordTrimmed, name.trim(), role);
        onSignIn?.(user);
      } else {
        // Sign in via Unified service
        const user = await signInUser(emailTrimmed, passwordTrimmed);
        onSignIn?.(user);
      }
    } catch (err) {
      console.error("Auth process error:", err);
      let msg = err.message;
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = "Incorrect email address or password. Please verify and try again.";
      } else if (err.code === 'auth/email-already-in-use') {
        msg = "An account already exists for this email address.";
      } else if (err.code === 'auth/weak-password') {
        msg = "Your password is too weak. Please use at least 6 characters.";
      } else if (err.code === 'auth/invalid-email') {
        msg = "Please provide a valid email address.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (!user.role) {
        // Google user doesn't have a role assigned yet! Show selector.
        setTempGoogleUser(user);
        setShowRoleModal(true);
      } else {
        onSignIn?.(user);
      }
    } catch (err) {
      console.error("Google Authenticate failed:", err);
      setError(err.message || "Failed to authenticate via Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    if (!tempGoogleUser) return;
    setLoading(true);
    try {
      await saveUserRole(tempGoogleUser.uid, tempGoogleUser.name, tempGoogleUser.email, selectedRole);
      const finalSession = { ...tempGoogleUser, role: selectedRole };
      setShowRoleModal(false);
      setTempGoogleUser(null);
      onSignIn?.(finalSession);
    } catch (err) {
      console.error("Role registration failed:", err);
      setError("Unable to save account type selection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sr-root">

      {/* ════════════════ LEFT PANEL ════════════════ */}
      <div className="sr-left">

        {/* Atmospheric background */}
        <div className="sr-orb sr-orb-1" />
        <div className="sr-orb sr-orb-2" />
        <div className="sr-orb sr-orb-3" />
        <div className="sr-grid-bg" />

        {/* Top content */}
        <div className="sr-left-top">
          {/* Brand */}
          <div className="sr-brand">
            <LogoMark size={30} />
            <span className="sr-brand-name">Escrow Admin<span className="sr-brand-dot">.</span></span>
          </div>

          {/* Live badge */}
          <div className="sr-trust-badge">
            <span className="sr-live-dot" />
            <span>End-to-end escrow infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className="sr-headline">
            Where work and<br />
            payment finally<br />
            <span className="sr-hl-accent">align.</span>
          </h1>

          <p className="sr-hero-sub">
            Protected payments. Milestone-based escrow.
            Guaranteed transaction flow. Trustless infrastructure
            built for modern professionals.
          </p>

          {/* Feature pills */}
          <div className="sr-pills">
            <span className="sr-pill">
              <span className="sr-pdot sr-pdot--green" />
              Protected Payments
            </span>
            <span className="sr-pill">
              <span className="sr-pdot sr-pdot--blue" />
              Milestone Escrow
            </span>
            <span className="sr-pill">
              <span className="sr-pdot sr-pdot--green" />
              Instant Release
            </span>
          </div>
        </div>

        {/* Floating cards area */}
        <div className="sr-cards-field">
          {CARDS.map(({ id, wrapClass, cardClass, iconClass, Icon, label, amount, detail, badge, badgeClass }) => (
            <div key={id} className={`sr-card-wrap ${wrapClass}`}>
              <div className={`sr-fcard ${cardClass}`}>
                <div className={`sr-fcard-icon ${iconClass}`}>
                  <Icon />
                </div>
                <div className="sr-fcard-body">
                  <span className="sr-fcard-label">{label}</span>
                  {amount && <span className="sr-fcard-amount">{amount}</span>}
                  <span className="sr-fcard-detail">{detail}</span>
                </div>
                <span className={`sr-badge ${badgeClass}`}>{badge}</span>
              </div>
            </div>
          ))}

          {/* Connector lines between cards (decorative) */}
          <svg className="sr-connector-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
            <line x1="15%" y1="25%" x2="65%" y2="20%" stroke="rgba(91,140,255,0.08)" strokeWidth="1" strokeDasharray="4 6"/>
            <line x1="65%" y1="20%" x2="55%" y2="70%" stroke="rgba(79,175,143,0.08)" strokeWidth="1" strokeDasharray="4 6"/>
            <line x1="15%" y1="25%" x2="25%" y2="72%" stroke="rgba(91,140,255,0.06)" strokeWidth="1" strokeDasharray="4 6"/>
          </svg>
        </div>

        {/* Bottom watermark */}
        <div className="sr-left-footer">
          <span className="sr-footer-text">SOC 2 Compliant · 256-bit SSL · FDIC Protected</span>
        </div>
      </div>

      {/* ════════════════ RIGHT PANEL ════════════════ */}
      <div className="sr-right">
        <div className="sr-signin-card">

          {/* Sandbox Mock Banner if Firebase not active */}
          {!isFirebaseConfigured && (
            <div className="sr-mock-banner">
              <span className="sr-mock-dot" />
              <span>Sandbox Mode (Any password works)</span>
            </div>
          )}

          {/* Logo */}
          <div className="sr-card-logo">
            <LogoMark size={34} />
            <span className="sr-card-brandname">Escrow Admin</span>
          </div>

          {/* Header */}
          <div className="sr-card-header">
            <h2 className="sr-card-title">{isSignUp ? 'Create an account' : 'Welcome back'}</h2>
            <p className="sr-card-sub">
              {isSignUp ? 'Get started in minutes with escrow protection' : 'Sign in to your secure workspace'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="sr-error-banner" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form fields */}
          <form className="sr-form-stack" onSubmit={handleAuth}>


            {/* Name - only display in Sign Up mode */}
            {isSignUp && (
              <div className="sr-field-group">
                <label className="sr-field-label" htmlFor="name">
                  Your name
                </label>
                <div className="sr-input-shell">
                  <input
                    id="name"
                    className="sr-input"
                    type="text"
                    placeholder="Aryan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="sr-field-group">
              <label className="sr-field-label" htmlFor="email">
                Email address
              </label>
              <div className="sr-input-shell">
                <input
                  id="email"
                  className="sr-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="sr-field-group">
              <div className="sr-label-row">
                <label className="sr-field-label" htmlFor="password">Password</label>
                {!isSignUp && <a href="#" className="sr-forgot-link" onClick={(e) => e.preventDefault()}>Forgot password?</a>}
              </div>
              <div className="sr-input-shell sr-input-shell--pw">
                <input
                  id="password"
                  className="sr-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                />
                <button
                  type="button"
                  className="sr-eye-toggle"
                  onClick={() => setShowPw(v => !v)}
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              className={`sr-cta-btn${loading ? ' sr-cta-btn--loading' : ''}`}
              onClick={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <span className="sr-spinner" />
              ) : (
                <>
                  <LogoMark size={16} />
                  <span>{isSignUp ? 'Create Account Securely' : 'Sign In Securely'}</span>
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="sr-divider">
            <span className="sr-divider-line" />
            <span className="sr-divider-label">or continue with</span>
            <span className="sr-divider-line" />
          </div>

          {/* Social sign-in */}
          <div className="sr-social-row">
            <button 
              type="button" 
              className="sr-social-btn" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button type="button" className="sr-social-btn" disabled>
              <GitHubIcon />
              <span>GitHub</span>
            </button>
            <button type="button" className="sr-social-btn sr-social-btn--apple" disabled>
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>

          {/* Sign up toggle link */}
          <p className="sr-signup-line">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <a 
                  href="#" 
                  className="sr-signup-anchor" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(false);
                    setError(null);
                  }}
                >
                  Sign in
                </a>
              </>
            ) : (
              <>
                New here?{' '}
                <a 
                  href="#" 
                  className="sr-signup-anchor" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(true);
                    setError(null);
                  }}
                >
                  Create account
                </a>
              </>
            )}
          </p>

          {/* Security footer */}
          <div className="sr-card-footer">
            <ShieldCheckIcon />
            <span>256-bit SSL encrypted · SOC 2 Type II compliant</span>
          </div>

        </div>
      </div>

      {/* ── Google OAuth Role Selection Modal ── */}
      {showRoleModal && (
        <div className="sr-role-modal-overlay">
          <div className="sr-role-modal">
            <div className="sr-role-modal-logo">
              <LogoMark size={36} />
            </div>
            <h3 className="sr-role-modal-title">Choose Account Type</h3>
            <p className="sr-role-modal-sub">
              To set up your secure workspace, please select your primary role.
            </p>
            <div className="sr-role-modal-options">
              <button 
                type="button"
                className="sr-role-modal-btn sr-role-modal-btn--freelancer"
                onClick={() => handleRoleSelection('freelancer')}
              >
                <div className="sr-role-modal-icon">💼</div>
                <div className="sr-role-modal-btn-content">
                  <span className="sr-role-modal-btn-title">Freelancer</span>
                  <span className="sr-role-modal-btn-desc">Work on contracts & earn protected yield</span>
                </div>
              </button>
              <button 
                type="button"
                className="sr-role-modal-btn sr-role-modal-btn--client"
                onClick={() => handleRoleSelection('client')}
              >
                <div className="sr-role-modal-icon">🛡️</div>
                <div className="sr-role-modal-btn-content">
                  <span className="sr-role-modal-btn-title">Client</span>
                  <span className="sr-role-modal-btn-desc">Deposit escrow & manage milestones</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
