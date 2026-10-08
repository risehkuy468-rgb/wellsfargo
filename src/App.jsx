import React, { useState, useEffect } from 'react';
import './App.css';
import AccountSummary from './components/AccountSummary';
import MobileShowcase from './components/MobileShowcase';
import BigPictureModal from './components/BigPictureModal';

export default function App() {
  // Page view routing: 'home' (website), 'summary' (desktop), or 'showcase'
  const [currentView, setCurrentView] = useState('home');

  // Big Picture Quick Balance Modal state
  const [showBigPictureModal, setShowBigPictureModal] = useState(false);

  // Navigation & Category State
  const [activeTab, setActiveTab] = useState('Personal');
  const [activeSubTab, setActiveSubTab] = useState('Checking');
  
  // Sign On State
  const [username, setUsername] = useState('joe3397');
  const [password, setPassword] = useState('gad0265j');
  const [showPassword, setShowPassword] = useState(false);
  const [saveUsername, setSaveUsername] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userNameDisplay, setUserNameDisplay] = useState('Joe Del Rio');
  const [loginError, setLoginError] = useState('');

  // Modals state
  const [modalType, setModalType] = useState(null); // 'promo', 'enroll', 'locations', 'search', 'passkey', 'forgot', 'legal'
  const [locationSearch, setLocationSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic greeting based on current local time
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Handle Sign In submission - validates credentials and navigates directly to Account Summary!
  const handleSignOn = (e) => {
    if (e) e.preventDefault();
    setLoginError('');

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setLoginError('Please enter both your username and password.');
      return;
    }

    if (trimmedUser.toLowerCase() !== 'joe3397' || password !== 'gad0265j') {
      setLoginError('The username or password you entered does not match our records. Please verify your credentials and try again.');
      return;
    }

    setIsSigningIn(true);
    setTimeout(() => {
      setIsSigningIn(false);
      setUserLoggedIn(true);
      setUserNameDisplay('Joe Del Rio');
      setCurrentView('summary');
    }, 500);
  };

  const handleSignOff = () => {
    setUserLoggedIn(false);
    setUsername('joe3397');
    setPassword('gad0265j');
    setUserNameDisplay('Joe Del Rio');
    setLoginError('');
    setCurrentView('home');
  };

  const primaryTabs = [
    'Personal',
    'Investing & Wealth Management',
    'Business',
    'Commercial Banking',
    'Corporate & Investment Banking',
    'About Wells Fargo'
  ];

  const subNavItems = {
    'Personal': [
      'Accounts',
      'Checking',
      'Savings & CDs',
      'Credit Cards',
      'Home Loans',
      'Personal Loans',
      'Auto Loans',
      'Premier',
      'Education & Tools'
    ],
    'Investing & Wealth Management': [
      'Overview',
      'Wealth Planning',
      'Retirement & IRAs',
      'Self-Directed Investing',
      'Private Bank',
      'Markets & Insights'
    ],
    'Business': [
      'Small Business Checking',
      'Business Credit Cards',
      'Business Financing',
      'Merchant Services',
      'Payroll & HR'
    ],
    'Commercial Banking': [
      'Commercial Real Estate',
      'Middle Market Banking',
      'Treasury Management',
      'International Banking'
    ],
    'Corporate & Investment Banking': [
      'Advisory & M&A',
      'Debt Financing',
      'Equity Capital Markets',
      'Global Fixed Income'
    ],
    'About Wells Fargo': [
      'Our Company',
      'Corporate Responsibility',
      'Newsroom',
      'Careers',
      'Investor Relations'
    ]
  };

  const currentSubNav = subNavItems[activeTab] || subNavItems['Personal'];

  // Route 1: Mobile Showcase (Matches user's latest image)
  if (currentView === 'showcase') {
    return (
      <MobileShowcase 
        onGoHome={() => setCurrentView('home')} 
        onGoDesktop={() => setCurrentView('summary')} 
      />
    );
  }

  // Route 2: Desktop Account Summary (Matches user's previous image)
  if (currentView === 'summary') {
    return (
      <AccountSummary 
        userName={userNameDisplay}
        onSignOff={handleSignOff} 
        onGoHome={() => setCurrentView('home')} 
        onGoShowcase={() => setCurrentView('showcase')}
      />
    );
  }

  return (
    <div className="wf-app">
      {/* ---------------- 1. HEADER TOP ---------------- */}
      <header className="wf-header-top">
        <div className="wf-header-container">
          <a 
            href="#home" 
            className="wf-logo-link" 
            title="Wells Fargo Home" 
            onClick={(e) => { 
              e.preventDefault(); 
              setCurrentView('home'); 
              setShowBigPictureModal(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="main-header-logo-home"
            style={{ cursor: 'pointer' }}
          >
            <span className="wf-logo-text">WELLS FARGO</span>
          </a>

          <div className="wf-header-actions">
            <button 
              className="wf-header-nav-link" 
              onClick={() => setModalType('locations')}
              id="btn-locations"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>ATMs/Locations</span>
            </button>

            <button 
              className="wf-header-nav-link"
              onClick={() => setModalType('help')}
              id="btn-help"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Help</span>
            </button>

            <button 
              className="wf-header-nav-link"
              onClick={() => alert('Español: Cambiar idioma a español')}
              id="btn-language"
            >
              <span>Español</span>
            </button>

            <button 
              className="wf-search-btn" 
              onClick={() => setModalType('search')}
              aria-label="Search"
              id="btn-search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {userLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  className="wf-navbar-welcome-badge"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ffffff'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>Welcome, {userNameDisplay}</span>
                </div>
                <button 
                  className="wf-header-signon-btn" 
                  onClick={handleSignOff}
                  id="btn-header-signoff"
                >
                  Sign Off
                </button>
              </div>
            ) : (
              <button 
                className="wf-header-signon-btn" 
                onClick={() => {
                  const card = document.getElementById('username-input');
                  if (card) card.focus();
                }}
                id="btn-header-signon"
              >
                Sign On
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Gold Line Under Header */}
      <div className="wf-gold-bar"></div>

      {/* ---------------- 2. PRIMARY NAVIGATION ---------------- */}
      <nav className="wf-primary-nav" aria-label="Main Navigation">
        <div className="wf-nav-container">
          {primaryTabs.map((tab) => (
            <button
              key={tab}
              id={`tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`wf-nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                const sub = subNavItems[tab];
                if (sub && sub.length > 0) {
                  setActiveSubTab(sub[0]);
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* ---------------- 3. SECONDARY SUBNAV ---------------- */}
      <nav className="wf-secondary-nav" aria-label="Secondary Navigation">
        <div className="wf-subnav-container">
          {currentSubNav.map((subItem) => (
            <button
              key={subItem}
              id={`subtab-${subItem.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`wf-subnav-link ${activeSubTab === subItem ? 'active' : ''} ${subItem === 'Accounts' ? 'wf-subnav-accounts-highlight' : ''}`}
              onClick={() => {
                setActiveSubTab(subItem);
                if (subItem === 'Accounts') {
                  setCurrentView('summary');
                }
              }}
            >
              {subItem === 'Accounts' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: '700', color: '#8c101a' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Accounts
                </span>
              ) : (
                subItem
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ---------------- 4. HERO BANNER WITH SIGN ON CARD ---------------- */}
      <section className="wf-hero-section">
        <div className="wf-hero-container">
          
          {/* LEFT: Sign On Card (Matches photo exactly) */}
          <div className="wf-signon-card" id="signon-card">
            {userLoggedIn ? (
              <div className="wf-logged-in-view">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#d71e28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                    {userNameDisplay.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Welcome back,</h3>
                    <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>{userNameDisplay}</p>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f9f9fa', padding: '14px', borderRadius: '6px', margin: '14px 0', border: '1px solid #ebebeb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>Savings (...5348)</span>
                    <strong style={{ fontSize: '15px', color: '#111' }}>$23,198.44</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>Savings (...5518)</span>
                    <strong style={{ fontSize: '15px', color: '#111' }}>$11,090.56</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button 
                    onClick={() => setModalType('dashboard')}
                    style={{ flex: 1, backgroundColor: '#d71e28', color: '#fff', padding: '9px 12px', borderRadius: '999px', fontSize: '13.5px', fontWeight: '700' }}
                  >
                    View Accounts
                  </button>
                  <button 
                    onClick={handleSignOff}
                    style={{ backgroundColor: '#f3f4f6', color: '#333', padding: '9px 16px', borderRadius: '999px', fontSize: '13.5px', fontWeight: '600' }}
                  >
                    Sign Off
                  </button>
                </div>

                <div className="wf-card-links">
                  <button className="wf-card-link-item" onClick={() => setModalType('dashboard')}>
                    Transfer & Pay
                  </button>
                  <button className="wf-card-link-item" onClick={() => setModalType('dashboard')}>
                    Manage Cards & Security
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignOn}>
                <h2 className="wf-greeting-title">{greeting}</h2>
                <p className="wf-greeting-subtitle">Sign on to manage your accounts.</p>

                {loginError && (
                  <div className="wf-login-error" role="alert" style={{
                    backgroundColor: '#fff1f2',
                    border: '1px solid #f87171',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#991b1b',
                    lineHeight: '1.4'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div>
                      <strong>Sign-on error:</strong> {loginError}
                    </div>
                  </div>
                )}

                {/* Username Input Field */}
                <div className="wf-input-group">
                  <input
                    type="text"
                    id="username-input"
                    className="wf-input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                {/* Password Input Field with Show/Hide toggle */}
                <div className="wf-input-group">
                  <div className="wf-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password-input"
                      className="wf-input-field"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="wf-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      id="btn-toggle-password"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Save username Checkbox */}
                <div className="wf-checkbox-row">
                  <input
                    type="checkbox"
                    id="save-username-checkbox"
                    className="wf-checkbox-input"
                    checked={saveUsername}
                    onChange={(e) => setSaveUsername(e.target.checked)}
                  />
                  <label htmlFor="save-username-checkbox" className="wf-checkbox-label">
                    Save username
                  </label>
                </div>

                {/* Action Buttons: Sign On & Enroll */}
                <div className="wf-action-row">
                  <button
                    type="submit"
                    className="wf-primary-signon-btn"
                    disabled={isSigningIn}
                    id="btn-sign-on"
                  >
                    {isSigningIn ? 'Signing on...' : 'Sign On'}
                  </button>

                  <button
                    type="button"
                    className="wf-enroll-link"
                    onClick={() => setModalType('enroll')}
                    id="btn-enroll"
                  >
                    Enroll
                  </button>
                </div>

                {/* Quick Balance Button matching user request */}
                

                {/* Helper Links */}
                <div className="wf-card-links">
                  <button
                    type="button"
                    className="wf-card-link-item"
                    onClick={() => setModalType('passkey')}
                    id="link-passkey"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 2l-2 2m-1-1l-3 3m2-2l-2 2m-2-2l-2 2m-2-2L9 9a6 6 0 1 0 3 3l9-9z"></path>
                    </svg>
                    Sign on with a passkey
                  </button>
                  <button
                    type="button"
                    className="wf-card-link-item"
                    onClick={() => setModalType('forgot')}
                    id="link-forgot"
                  >
                    Forgot username or password?
                  </button>
                  <button
                    type="button"
                    className="wf-card-link-item"
                    onClick={() => setModalType('legal')}
                    id="link-legal"
                  >
                    Privacy, Cookies, and Legal
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT / CENTER: Promotional Checking Bonus Banner */}
          <div className="wf-hero-promo-wrap">
            <div className="wf-hero-text-block">
              <h1 className="wf-promo-headline">
                $325 checking<br />bonus on us
              </h1>
              <p className="wf-promo-subtext">
                New customers open an eligible checking account with qualifying direct deposits
              </p>
              <button 
                className="wf-get-started-btn"
                onClick={() => setModalType('promo')}
                id="btn-get-started"
              >
                <span>Get started</span>
                <span style={{ letterSpacing: '-1px' }}>&gt;&gt;</span>
              </button>
            </div>

            {/* Right Stacked Graphic matching screenshot */}
            <div className="wf-hero-visual">
              <div className="wf-enjoy-text">Enjoy</div>
              <div className="wf-bonus-amount">$325</div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- 5. QUICK ACTIONS BAR ---------------- */}
      <section className="wf-quick-actions-section" aria-label="Popular Banking Tasks">
        <div className="wf-quick-actions-container">
          <div className="wf-quick-action-card" onClick={() => setModalType('promo')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
            <span className="wf-action-label">Open an Account</span>
          </div>

          <div className="wf-quick-action-card" onClick={() => setModalType(userLoggedIn ? 'dashboard' : 'signon-prompt')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </div>
            <span className="wf-action-label">Transfer & Pay</span>
          </div>

          <div className="wf-quick-action-card" onClick={() => setModalType('card-rewards')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <span className="wf-action-label">Credit Cards</span>
          </div>

          <div className="wf-quick-action-card" onClick={() => setModalType('mortgage-rates')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="wf-action-label">Home Loans</span>
          </div>

          <div className="wf-quick-action-card" onClick={() => setModalType('schedule')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span className="wf-action-label">Make Appointment</span>
          </div>

          <div className="wf-quick-action-card" onClick={() => setModalType('locations')}>
            <div className="wf-action-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span className="wf-action-label">Find an ATM</span>
          </div>
        </div>
      </section>

      {/* ---------------- 6. FEATURED PRODUCTS & GUIDANCE ---------------- */}
      <section className="wf-featured-section">
        <h2 className="wf-section-heading">Suggested for you</h2>
        <p className="wf-section-subheading">Explore financial solutions crafted to fit your goals and lifestyle.</p>

        <div className="wf-cards-grid">
          {/* Card 1 */}
          <div className="wf-card-tile">
            <span className="wf-tile-badge">Credit Cards</span>
            <div className="wf-tile-body">
              <h3 className="wf-tile-title">Wells Fargo Active Cash® Card</h3>
              <p className="wf-tile-desc">
                Earn unlimited 2% cash rewards on purchases with $0 annual fee. Plus, earn a $200 cash rewards bonus after spending $500 in purchases in the first 3 months.
              </p>
              <button 
                className="wf-tile-btn"
                onClick={() => setModalType('card-rewards')}
              >
                Learn More &amp; Apply &rarr;
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="wf-card-tile">
            <span className="wf-tile-badge">Home Lending</span>
            <div className="wf-tile-body">
              <h3 className="wf-tile-title">Explore Mortgage Options</h3>
              <p className="wf-tile-desc">
                Whether you're buying your first home, renovating, or refinancing, get competitive rates, clear estimates, and dedicated home mortgage consultants.
              </p>
              <button 
                className="wf-tile-btn"
                onClick={() => setModalType('mortgage-rates')}
              >
                View Mortgage Rates &rarr;
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="wf-card-tile">
            <span className="wf-tile-badge">Savings &amp; CDs</span>
            <div className="wf-tile-body">
              <h3 className="wf-tile-title">Grow Your Savings Confidently</h3>
              <p className="wf-tile-desc">
                Choose from flexible high-yield Special Certificate of Deposit (CD) terms or automated Way2Save® accounts to build your financial cushion securely.
              </p>
              <button 
                className="wf-tile-btn"
                onClick={() => setModalType('savings-info')}
              >
                Compare Savings Accounts &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 7. HIGHLIGHT / SECURITY BANNER ---------------- */}
      <section className="wf-highlight-banner">
        <div className="wf-highlight-container">
          <div>
            <h2 className="wf-highlight-title">Security &amp; Peace of Mind 24/7</h2>
            <p className="wf-highlight-desc">
              Your security is our highest priority. We safeguard your identity and accounts with advanced encryption, biometric authentication, continuous fraud monitoring, and Zero Liability protection on unauthorized debit and credit transactions.
            </p>
            <div className="wf-security-pills">
              <span className="wf-pill-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Zero Liability Protection
              </span>
              <span className="wf-pill-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                256-Bit SSL Encryption
              </span>
              <span className="wf-pill-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                FDIC Insured up to $250,000
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.06)', padding: '28px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>Wells Fargo Mobile® App</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '18px' }}>
              Check balances, deposit checks on the go, send money with Zelle®, and turn cards on or off right from your phone.
            </p>
            <button 
              onClick={() => alert('Download on iOS App Store or Google Play')}
              style={{ backgroundColor: '#ffffff', color: '#0d1b2a', padding: '10px 24px', borderRadius: '999px', fontWeight: '700', fontSize: '14px' }}
            >
              Get the App
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- 8. OFFICIAL FOOTER ---------------- */}
      <footer className="wf-footer">
        <div className="wf-footer-container">
          {/* Important Regulatory Disclosures */}
          <div className="wf-footer-disclaimer-box">
            <div className="wf-disclaimer-title">Investment and Insurance Products:</div>
            <div>• NOT FDIC Insured • NO Bank Guarantee • MAY Lose Value</div>
          </div>

          <div className="wf-footer-links-grid">
            <div>
              <div className="wf-footer-col-title">Personal Banking</div>
              <ul className="wf-footer-link-list">
                <li><a href="#checking" className="wf-footer-link">Checking Accounts</a></li>
                <li><a href="#savings" className="wf-footer-link">Savings &amp; CDs</a></li>
                <li><a href="#creditcards" className="wf-footer-link">Credit Cards</a></li>
                <li><a href="#homeloans" className="wf-footer-link">Mortgage &amp; Home Lending</a></li>
                <li><a href="#autoloans" className="wf-footer-link">Auto Loans</a></li>
              </ul>
            </div>

            <div>
              <div className="wf-footer-col-title">Business &amp; Commercial</div>
              <ul className="wf-footer-link-list">
                <li><a href="#smallbusiness" className="wf-footer-link">Small Business Accounts</a></li>
                <li><a href="#businesscredit" className="wf-footer-link">Business Financing</a></li>
                <li><a href="#merchantservices" className="wf-footer-link">Merchant Card Processing</a></li>
                <li><a href="#commercialbanking" className="wf-footer-link">Commercial Real Estate</a></li>
                <li><a href="#treasury" className="wf-footer-link">Treasury Management</a></li>
              </ul>
            </div>

            <div>
              <div className="wf-footer-col-title">About Wells Fargo</div>
              <ul className="wf-footer-link-list">
                <li><a href="#about" className="wf-footer-link">About Our Company</a></li>
                <li><a href="#careers" className="wf-footer-link">Careers</a></li>
                <li><a href="#community" className="wf-footer-link">Community Impact</a></li>
                <li><a href="#investors" className="wf-footer-link">Investor Relations</a></li>
                <li><a href="#newsroom" className="wf-footer-link">Newsroom</a></li>
              </ul>
            </div>

            <div>
              <div className="wf-footer-col-title">Customer Service</div>
              <ul className="wf-footer-link-list">
                <li><a href="#help" className="wf-footer-link" onClick={(e) => { e.preventDefault(); setModalType('help'); }}>Help &amp; FAQs</a></li>
                <li><a href="#locations" className="wf-footer-link" onClick={(e) => { e.preventDefault(); setModalType('locations'); }}>Find an ATM or Branch</a></li>
                <li><a href="#appointment" className="wf-footer-link" onClick={(e) => { e.preventDefault(); setModalType('schedule'); }}>Schedule an Appointment</a></li>
                <li><a href="#security" className="wf-footer-link" onClick={(e) => { e.preventDefault(); setModalType('legal'); }}>Security &amp; Fraud Center</a></li>
                <li><a href="#accessibility" className="wf-footer-link">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="wf-footer-bottom">
            <div className="wf-footer-legal-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); setModalType('legal'); }}>Privacy, Cookies, Security &amp; Legal</a>
              <a href="#notice" onClick={(e) => { e.preventDefault(); setModalType('legal'); }}>Notice of Data Collection</a>
              <a href="#generalterms" onClick={(e) => { e.preventDefault(); setModalType('legal'); }}>General Terms of Use</a>
              <a href="#reportfraud" onClick={(e) => { e.preventDefault(); setModalType('help'); }}>Report Fraud</a>
              <a href="#sitemap">Sitemap</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#555' }}>
              <span>Equal Housing Lender ⌂</span>
              <span>Member FDIC</span>
              <span>© 1999 - 2026 Wells Fargo. All rights reserved. NMLSR ID 399801</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- MODALS / INTERACTIVE OVERLAYS ---------------- */}
      
      {/* 1. $325 Checking Bonus Details Modal */}
      {modalType === 'promo' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Special $325 Checking Bonus Offer</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fed7d7' }}>
                <span style={{ fontSize: '36px', fontWeight: '800', color: '#d71e28' }}>$325</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#900' }}>Everyday Checking Account Bonus</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#555' }}>Promo Code: <strong>BONUS325</strong> (automatically applied)</p>
                </div>
              </div>

              <h4 style={{ fontSize: '15px', marginBottom: '8px', color: '#222' }}>How to qualify in 3 simple steps:</h4>
              <ol style={{ paddingLeft: '20px', fontSize: '14px', color: '#444', lineHeight: '1.7', marginBottom: '24px' }}>
                <li>Open a new eligible Wells Fargo Everyday Checking account.</li>
                <li>Receive a minimum of $1,000 in qualifying direct deposits within 90 calendar days of account opening.</li>
                <li>Your $325 bonus will be deposited into your new checking account within 30 days after meeting the requirements.</li>
              </ol>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    alert('Redirecting to secure checking application...');
                    setModalType(null);
                  }}
                  style={{ flex: 1, backgroundColor: '#d71e28', color: '#fff', padding: '12px', borderRadius: '999px', fontWeight: '700', fontSize: '14.5px' }}
                >
                  Open Account Now
                </button>
                <button 
                  onClick={() => setModalType(null)}
                  style={{ backgroundColor: '#ebebeb', color: '#333', padding: '12px 24px', borderRadius: '999px', fontWeight: '600', fontSize: '14.5px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Enroll in Online Banking Modal */}
      {modalType === 'enroll' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Enroll in Wells Fargo Online®</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '18px' }}>
                Provide your account details to set up your username and password for online and mobile banking.
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '600', marginBottom: '6px' }}>
                  Social Security Number (SSN) or ITIN
                </label>
                <input 
                  type="password" 
                  placeholder="XXX - XX - XXXX" 
                  className="wf-input-field" 
                  maxLength={11}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '600', marginBottom: '6px' }}>
                  Account, Debit Card, or Credit Card Number
                </label>
                <input 
                  type="text" 
                  placeholder="Enter account or card number" 
                  className="wf-input-field" 
                />
              </div>

              <button 
                onClick={() => {
                  alert('Thank you! Verification code has been sent to your verified phone number.');
                  setModalType(null);
                }}
                style={{ width: '100%', backgroundColor: '#d71e28', color: '#fff', padding: '12px', borderRadius: '999px', fontWeight: '700', fontSize: '14.5px' }}
              >
                Continue Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ATM & Location Finder Modal */}
      {modalType === 'locations' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Find Wells Fargo ATMs &amp; Branches</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Enter ZIP code, City, or State..." 
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="wf-input-field"
                  style={{ flex: 1 }}
                />
                <button 
                  style={{ backgroundColor: '#d71e28', color: '#fff', padding: '0 20px', borderRadius: '4px', fontWeight: '600' }}
                  onClick={() => {}}
                >
                  Search
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '14px', border: '1px solid #e2e2e2', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#1a1a1a' }}>Downtown Financial Branch</strong>
                    <span style={{ fontSize: '12px', color: '#097930', fontWeight: '600', backgroundColor: '#eaf8ef', padding: '3px 8px', borderRadius: '4px' }}>Open until 5:00 PM</span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#555', marginTop: '4px' }}>420 Montgomery St, San Francisco, CA 94104</div>
                  <div style={{ fontSize: '12.5px', color: '#777', marginTop: '4px' }}>0.4 miles away • 24-Hour Drive-Up ATM • Safe Deposit Boxes</div>
                </div>

                <div style={{ padding: '14px', border: '1px solid #e2e2e2', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#1a1a1a' }}>Metro Center ATM &amp; Walk-up</strong>
                    <span style={{ fontSize: '12px', color: '#097930', fontWeight: '600', backgroundColor: '#eaf8ef', padding: '3px 8px', borderRadius: '4px' }}>24 Hours ATM</span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#555', marginTop: '4px' }}>815 Market St, San Francisco, CA 94103</div>
                  <div style={{ fontSize: '12.5px', color: '#777', marginTop: '4px' }}>0.8 miles away • Cash &amp; Check Deposit • Contactless ATM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Search Modal */}
      {modalType === 'search' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Search Wells Fargo</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder="What can we help you find?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="wf-input-field"
                  style={{ flex: 1 }}
                  autoFocus
                />
              </div>

              <div style={{ fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                Popular Searches:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Routing Number', 'Wire Transfers', 'Direct Deposit Form', 'Order Checks', 'Credit Card Payment', 'Mortgage Rates'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    style={{ backgroundColor: '#f3f4f6', color: '#333', padding: '6px 12px', borderRadius: '999px', fontSize: '13px' }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Passkey Info Modal */}
      {modalType === 'passkey' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Sign on with a Passkey</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ textAlign: 'center', padding: '12px 0 20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#d71e28', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-1-1l-3 3m2-2l-2 2m-2-2L9 9a6 6 0 1 0 3 3l9-9z"></path></svg>
                </div>
                <h4 style={{ fontSize: '17px', color: '#1a1a1a', marginBottom: '8px' }}>Faster, passwordless sign on</h4>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  Passkeys allow you to sign on using your face, fingerprint, or device screen lock. It's more secure than a password and protects you from phishing scams.
                </p>
              </div>

              <button 
                onClick={() => {
                  setIsSigningIn(true);
                  setModalType(null);
                  setTimeout(() => {
                    setIsSigningIn(false);
                    setUserLoggedIn(true);
                    setUserNameDisplay('Passkey Verified User');
                  }, 800);
                }}
                style={{ width: '100%', backgroundColor: '#d71e28', color: '#fff', padding: '12px', borderRadius: '999px', fontWeight: '700', fontSize: '14.5px' }}
              >
                Use Device Biometrics / Screen Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Forgot Password / Username Modal */}
      {modalType === 'forgot' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Reset Password or Find Username</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
                Choose what you need help recovering:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="recovery" defaultChecked style={{ accentColor: '#d71e28' }} />
                  <span style={{ fontSize: '14px' }}>I forgot my password</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="recovery" style={{ accentColor: '#d71e28' }} />
                  <span style={{ fontSize: '14px' }}>I forgot my username</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="recovery" style={{ accentColor: '#d71e28' }} />
                  <span style={{ fontSize: '14px' }}>I forgot both</span>
                </label>
              </div>
              <button 
                onClick={() => {
                  alert('Verification instructions have been prepared.');
                  setModalType(null);
                }}
                style={{ width: '100%', backgroundColor: '#d71e28', color: '#fff', padding: '12px', borderRadius: '999px', fontWeight: '700', fontSize: '14.5px' }}
              >
                Continue Recovery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Legal, Privacy, and Cookies Modal */}
      {modalType === 'legal' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Privacy, Cookies &amp; Legal Notices</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '15px', color: '#1a1a1a', marginBottom: '6px' }}>Consumer Privacy Notice</h4>
              <p style={{ fontSize: '13.5px', color: '#555', marginBottom: '14px' }}>
                Wells Fargo respects your privacy. We collect personal information to provide banking services, verify identity, prevent fraud, and comply with legal requirements.
              </p>
              <h4 style={{ fontSize: '15px', color: '#1a1a1a', marginBottom: '6px' }}>Online &amp; Mobile Security</h4>
              <p style={{ fontSize: '13.5px', color: '#555', marginBottom: '14px' }}>
                We use industry standard 256-bit encryption to protect data transmissions between your browser and our servers.
              </p>
              <h4 style={{ fontSize: '15px', color: '#1a1a1a', marginBottom: '6px' }}>Cookie Policy</h4>
              <p style={{ fontSize: '13.5px', color: '#555' }}>
                We use strictly necessary cookies to ensure proper operation of online banking and security sessions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 8. Help Modal */}
      {modalType === 'help' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Wells Fargo Customer Support</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', color: '#111' }}>24/7 Telephone Banking</div>
                  <div style={{ fontSize: '16px', color: '#d71e28', fontWeight: '700', marginTop: '4px' }}>1-800-869-3557 (1-800-TO-WELLS)</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Personal Accounts, Debit Cards &amp; General Inquiries</div>
                </div>

                <div style={{ padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', color: '#111' }}>Credit Card Support &amp; Lost Cards</div>
                  <div style={{ fontSize: '16px', color: '#d71e28', fontWeight: '700', marginTop: '4px' }}>1-800-642-4720</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Available 24 hours a day, 7 days a week</div>
                </div>

                <div style={{ padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', color: '#111' }}>Report Suspicious Activity / Fraud</div>
                  <div style={{ fontSize: '16px', color: '#d71e28', fontWeight: '700', marginTop: '4px' }}>1-866-867-5568</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Immediate fraud assistance &amp; compromised cards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Authenticated Account Dashboard Modal */}
      {modalType === 'dashboard' && (
        <div className="wf-modal-overlay" onClick={() => setModalType(null)}>
          <div className="wf-modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Account Summary – {userNameDisplay}</h3>
              <button className="wf-modal-close" onClick={() => setModalType(null)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                <div style={{ border: '1px solid #e2e2e2', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                  <div style={{ fontSize: '13px', color: '#666' }}>Savings (...5348)</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#111', margin: '4px 0' }}>$23,198.44</div>
                  <div style={{ fontSize: '12px', color: '#097930' }}>Available Balance</div>
                </div>

                <div style={{ border: '1px solid #e2e2e2', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                  <div style={{ fontSize: '13px', color: '#666' }}>Savings (...5518)</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#111', margin: '4px 0' }}>$11,090.56</div>
                  <div style={{ fontSize: '12px', color: '#097930' }}>Available Balance</div>
                </div>
              </div>

              <h4 style={{ fontSize: '16px', color: '#111', marginBottom: '12px' }}>Recent Account Activity</h4>
              <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee', backgroundColor: '#fff', fontSize: '13.5px' }}>
                  <div>
                    <strong>Direct Deposit - ACME CORP PAYROLL</strong>
                    <div style={{ color: '#777', fontSize: '12px' }}>Yesterday</div>
                  </div>
                  <span style={{ color: '#097930', fontWeight: '700' }}>+$2,650.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee', backgroundColor: '#fff', fontSize: '13.5px' }}>
                  <div>
                    <strong>Whole Foods Market - Groceries</strong>
                    <div style={{ color: '#777', fontSize: '12px' }}>Oct 01, 2026</div>
                  </div>
                  <span style={{ color: '#111', fontWeight: '700' }}>-$68.40</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#fff', fontSize: '13.5px' }}>
                  <div>
                    <strong>Zelle® Transfer to Sarah K.</strong>
                    <div style={{ color: '#777', fontSize: '12px' }}>Sep 29, 2026</div>
                  </div>
                  <span style={{ color: '#111', fontWeight: '700' }}>-$150.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Big Picture Modal Overlay Matching User Photo */}
      <BigPictureModal 
        isOpen={showBigPictureModal} 
        onClose={() => setShowBigPictureModal(false)} 
      />

    </div>
  );
}
