import React, { useState, useEffect } from 'react';
import './AccountSummary.css';
import BigPictureModal from './BigPictureModal';

export default function AccountSummary({ onSignOff, onGoHome, onGoShowcase, userName = 'Joe Del Rio' }) {
  const [currentUserName, setCurrentUserName] = useState(userName || 'Joe Del Rio');

  useEffect(() => {
    if (userName) setCurrentUserName(userName);
  }, [userName]);
  const [hideBalances, setHideBalances] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showBigPictureModal, setShowBigPictureModal] = useState(false);
  const [focusedModalAccountId, setFocusedModalAccountId] = useState(null);
  const [showFicoModal, setShowFicoModal] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('Accounts');
  const [selectedAccountForModal, setSelectedAccountForModal] = useState(null);

  // Open clean balance modal with only balance and account number
  const openAccountModal = (acctId) => {
    const acct = accounts.find(a => a.id === acctId);
    if (acct) {
      setSelectedAccountForModal(acct);
    }
  };

  // Accounts state with live balances - Savings 5348 ($23,198.44) & Savings 5518 ($11,090.56)
  const [accounts, setAccounts] = useState([
  {
    id: 'regular-savings',
    name: 'REGULAR SAVINGS',
    number: '...5348',
    fullNumber: '1894 5348 9201',
    routingNumber: '121000247',
    type: 'savings',
    balance: 23478.18,
    balanceLabel: 'Available balance',
    ledgerBalance: 23478.18,
    apy: '4.25% APY',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="6" y1="12" x2="6.01" y2="12"></line>
        <line x1="18" y1="12" x2="18.01" y2="12"></line>
      </svg>
    ),
    transactions: [
      {
        id: 1,
        date: 'Oct 02, 2026',
        desc: 'Direct Deposit / Wire Transfer',
        amount: '+5,000.00',
        positive: true
      },
      {
        id: 2,
        date: 'Sep 30, 2026',
        desc: 'Monthly Interest Payment',
        amount: '+82.14',
        positive: true
      },
      {
        id: 3,
        date: 'Sep 15, 2026',
        desc: 'Online Deposit',
        amount: '+1,500.00',
        positive: true
      }
    ]
  },

  {
    id: 'platinum-savings',
    name: 'PLATINUM SAVINGS',
    number: '...5518',
    fullNumber: '1894 5518 4382',
    routingNumber: '121000247',
    type: 'savings',
    balance: 13109.72,
    balanceLabel: 'Available balance',
    ledgerBalance: 13109.72,
    apy: '4.25% APY',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="6" y1="12" x2="6.01" y2="12"></line>
        <line x1="18" y1="12" x2="18.01" y2="12"></line>
      </svg>
    ),
    transactions: [
      {
        id: 1,
        date: 'Oct 01, 2026',
        desc: 'Automatic Save as You Go',
        amount: '+250.00',
        positive: true
      },
      {
        id: 2,
        date: 'Sep 30, 2026',
        desc: 'Monthly Interest Payment',
        amount: '+39.28',
        positive: true
      },
      {
        id: 3,
        date: 'Sep 20, 2026',
        desc: 'Mobile Check Deposit',
        amount: '+800.00',
        positive: true
      }
    ]
  },

  {
    id: 'retirement-funds',
    name: 'COMBINED RETIREMENT FUNDS',
    number: '...7824',
    fullNumber: 'Retirement Portfolio',
    routingNumber: '—',
    type: 'retirement',
    balance: 87100.90,
    balanceLabel: 'Total balance',
    ledgerBalance: 87100.90,
    apy: '—',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h18"></path>
        <path d="M5 21V9"></path>
        <path d="M9 21V9"></path>
        <path d="M15 21V9"></path>
        <path d="M19 21V9"></path>
        <path d="M3 9l9-6 9 6"></path>
        <path d="M7 13h2"></path>
        <path d="M15 13h2"></path>
        <path d="M7 17h2"></path>
        <path d="M15 17h2"></path>
      </svg>
    ),
    transactions: [
      {
        id: 1,
        date: 'Oct 01, 2026',
        desc: '401(k) Contribution',
        amount: '+1,250.00',
        positive: true
      },
      {
        id: 2,
        date: 'Sep 30, 2026',
        desc: 'Investment Gain',
        amount: '+842.16',
        positive: true
      },
      {
        id: 3,
        date: 'Sep 15, 2026',
        desc: 'Employer Contribution',
        amount: '+625.00',
        positive: true
      }
    ]
  }
]);

  // Transfer state
  const [transferFrom, setTransferFrom] = useState('savings-5348');
  const [transferTo, setTransferTo] = useState('savings-5518');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccessMsg, setTransferSuccessMsg] = useState('');

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }

    if (transferFrom === transferTo) {
      alert('Source and destination accounts must be different.');
      return;
    }

    setAccounts(prevAccounts => {
      return prevAccounts.map(acct => {
        if (acct.id === transferFrom) {
          return {
            ...acct,
            balance: acct.type === 'credit' ? acct.balance + amt : acct.balance - amt,
            transactions: [
              {
                id: Date.now(),
                date: 'Today',
                desc: `Transfer to ${prevAccounts.find(a => a.id === transferTo)?.name || 'Account'}`,
                amount: `-${amt.toFixed(2)}`,
                positive: false
              },
              ...acct.transactions
            ]
          };
        }
        if (acct.id === transferTo) {
          return {
            ...acct,
            balance: acct.type === 'credit' ? Math.max(0, acct.balance - amt) : acct.balance + amt,
            transactions: [
              {
                id: Date.now() + 1,
                date: 'Today',
                desc: `Transfer from ${prevAccounts.find(a => a.id === transferFrom)?.name || 'Account'}`,
                amount: `+${amt.toFixed(2)}`,
                positive: true
              },
              ...acct.transactions
            ]
          };
        }
        return acct;
      });
    });

    setTransferSuccessMsg(`Successfully transferred $${amt.toFixed(2)}!`);
    setTransferAmount('');
    setTimeout(() => {
      setTransferSuccessMsg('');
      setShowTransferModal(false);
    }, 1200);
  };

  const formatCurrency = (val) => {
    if (hideBalances) return '$••••••';
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="wf-account-summary-page">
      {/* ---------------- 1. HEADER (Image 2) ---------------- */}
      <header className="wf-acct-header">
        <div className="wf-acct-header-container">
          <div className="wf-acct-logo-area">
            <a 
              href="#home" 
              className="wf-acct-logo" 
              title="Wells Fargo Home" 
              onClick={(e) => { 
                e.preventDefault(); 
                onGoHome(); 
              }}
              style={{ cursor: 'pointer' }}
              id="logo-nav-home"
            >
              WELLS FARGO
            </a>
          </div>

          <div className="wf-acct-user-nav">
            {/* Search */}
            <button className="wf-acct-header-btn" title="Search accounts & help">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>

            {/* Sign Off with padlock matching Image 2 */}
            <button className="wf-acct-header-btn" onClick={onSignOff} id="btn-sign-off-padlock">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Sign Off</span>
            </button>

            {/* Welcome, joe3397 with dropdown matching Image 2 */}
            <div className="wf-user-profile-badge" onClick={() => alert(`Profile options for ${currentUserName}`)}>
              <div className="wf-user-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <span>Welcome, {currentUserName}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- 2. PRIMARY NAV BAR (Image 2) ---------------- */}
      <nav className="wf-acct-nav" aria-label="Account Navigation">
        <div className="wf-acct-nav-container">
          <button 
            className={`wf-acct-nav-item ${activeNavTab === 'Accounts' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('Accounts')}
            id="tab-accounts"
          >
            <span>Accounts</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div className="wf-acct-nav-divider"></div>

          <button 
            className={`wf-acct-nav-item ${activeNavTab === 'Brokerage' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('Brokerage')}
          >
            <span>Brokerage</span>
          </button>

          <div className="wf-acct-nav-divider"></div>

          <button 
            className={`wf-acct-nav-item ${activeNavTab === 'Transfer' ? 'active' : ''}`}
            onClick={() => setShowTransferModal(true)}
            id="tab-transfer-pay"
          >
            <span>Transfer &amp; Pay</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div className="wf-acct-nav-divider"></div>

          <button 
            className={`wf-acct-nav-item ${activeNavTab === 'Plan' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('Plan')}
          >
            <span>Plan &amp; Learn</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div className="wf-acct-nav-divider"></div>

          <button 
            className={`wf-acct-nav-item ${activeNavTab === 'Security' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('Security')}
          >
            <span>Security &amp; Support</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
      </nav>

      {/* ---------------- 3. SUB-BANNER (Image 2: Customer perks on mortgages) ---------------- */}
      <div className="wf-perks-subbanner">
        <div className="wf-perks-container">
          <a href="#perks" className="wf-perks-link" onClick={(e) => { e.preventDefault(); alert('Exclusive relationship discounts available on new mortgage originations and rate locks.'); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffbf00" stroke="#d99b00" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Customer perks on mortgages</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="wf-privacy-toggle-btn"
              onClick={() => setHideBalances(!hideBalances)}
              title="Hide balances for privacy"
              id="btn-toggle-mask-balance"
            >
              {hideBalances ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <span>Show Balances</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  <span>Mask Balances</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 4. MAIN SUMMARY GRID ---------------- */}
      <main className="wf-summary-main">
        <div className="wf-summary-grid">
          
          {/* LEFT COLUMN: Multiple Accounts list matching Image 2 */}
          <section className="wf-accounts-column" aria-label="Accounts List">
            <div className="wf-accounts-header-row">
              <h1 className="wf-accounts-title">Account Summary</h1>
              <button 
                className="wf-quick-transfer-btn"
                onClick={() => setShowTransferModal(true)}
                id="btn-transfer-funds"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                <span>Transfer Money</span>
              </button>
            </div>

            {/* List of Accounts */}
            {accounts.map((acct) => (
              <div 
                key={acct.id} 
                id={`account-card-${acct.id}`}
                className="wf-acct-card"
              >
                {/* Left Red Accent Bar */}
                <div className="wf-card-red-accent"></div>

                {/* Main Card Row - clicking opens balance modal directly */}
                <div 
                  className="wf-acct-card-content"
                  onClick={() => openAccountModal(acct.id)}
                  title="Click to check balance in modal"
                >
                  {/* Account Icon */}
                  <div className="wf-acct-icon-box">
                    {acct.icon}
                  </div>

                  {/* Account Name & Truncated Number */}
                  <div className="wf-acct-info-meta">
                    <div className="wf-acct-name">
                      <span>{acct.name}</span>
                    </div>
                    <div className="wf-acct-number">{acct.number}</div>
                  </div>

                  {/* Balance & Subtext */}
                  <div className="wf-acct-balance-box">
                    <div className="wf-acct-amount">
                      {formatCurrency(acct.balance)}
                    </div>
                    <div className="wf-acct-balance-type">{acct.balanceLabel}</div>
                  </div>

                  {/* Three-dots menu button */}
                  <button 
                    className="wf-acct-menu-btn"
                    aria-label="Account actions menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAccountModal(acct.id);
                    }}
                    title="Check balance in modal"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                      <circle cx="12" cy="19" r="2"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* 3-COLUMN BOTTOM PROMOS (Matching Image 2) */}
            <div className="wf-bottom-promos-grid">
              <div className="wf-bottom-promo-item">
                <h3 className="wf-bottom-promo-title">Find a credit card</h3>
                <p className="wf-bottom-promo-desc">
                  Choose from cash rewards, low intro rate and more tailored to your lifestyle.
                </p>
                <a href="#cards" className="wf-bottom-promo-link" onClick={(e) => { e.preventDefault(); alert('Explore all Wells Fargo Credit Cards'); }}>
                  Compare credit cards &rarr;
                </a>
              </div>

              <div className="wf-bottom-promo-item">
                <h3 className="wf-bottom-promo-title">Unlimited 2%</h3>
                <p className="wf-bottom-promo-desc">
                  Earn unlimited 2% cash rewards on business purchases with zero annual fee.
                </p>
                <a href="#business" className="wf-bottom-promo-link" onClick={(e) => { e.preventDefault(); alert('Explore Signify Business Cash Card'); }}>
                  Learn about 2% rewards &rarr;
                </a>
              </div>

              <div className="wf-bottom-promo-item">
                <h3 className="wf-bottom-promo-title">One Key™ Cards</h3>
                <p className="wf-bottom-promo-desc">
                  Flexible travel rewards across Expedia, Hotels.com, and Vrbo. Terms apply.
                </p>
                <a href="#onekey" className="wf-bottom-promo-link" onClick={(e) => { e.preventDefault(); alert('Explore One Key Cards'); }}>
                  View One Key rewards &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: SIDEBAR WIDGETS (Matching Image 2) */}
          <aside className="wf-sidebar-column">
            
            {/* Zelle Promo with phone graphic matching Image 2 */}
            <div className="wf-zelle-card">
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, marginBottom: '6px' }}>Fast &amp; Easy</div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.2' }}>Send Money with Zelle®</h3>
              
              <div className="wf-zelle-phone-mockup">
                <div className="wf-zelle-phone-header">
                  <span>9:41</span>
                  <span>5G</span>
                </div>
                <div className="wf-zelle-title">Quick Transfer</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ fontSize: '12.5px', color: '#555' }}>Send to Friend</span>
                  <span className="wf-zelle-badge">zelle</span>
                </div>
                <div style={{ fontSize: '11px', color: '#777', marginTop: '6px', lineHeight: '1.3' }}>
                  Safe, fee-free money transfers directly from your Wells Fargo account.
                </div>
              </div>

              <button 
                className="wf-zelle-btn"
                onClick={() => {
                  setTransferFrom('savings-5348');
                  setShowTransferModal(true);
                }}
              >
                Send Money Now
              </button>
            </div>

            {/* Dark Widget 1: Security Tools matching Image 2 */}
            <div className="wf-dark-widget">
              <div className="wf-widget-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Security Tools</span>
              </div>
              <div className="wf-widget-list">
                <a 
                  href="#security" 
                  className="wf-widget-item"
                  onClick={(e) => { e.preventDefault(); alert('Navigating to Security Center: 2FA, biometric authentication & alerts.'); }}
                >
                  <span>Visit the Security Center</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a 
                  href="#mobile" 
                  className="wf-widget-item"
                  onClick={(e) => { e.preventDefault(); alert('Manage your primary contact numbers and 2-step verification phones.'); }}
                >
                  <span>Manage your mobile number</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Dark Widget 2: Planning & Tools matching Image 2 */}
            <div className="wf-dark-widget">
              <div className="wf-widget-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>Planning &amp; Tools</span>
              </div>
              <div className="wf-widget-list">
                <a 
                  href="#fico" 
                  className="wf-widget-item"
                  onClick={(e) => { e.preventDefault(); setShowFicoModal(true); }}
                >
                  <span>View your FICO® Credit Score</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>

              {/* FICO Score meter */}
              <div className="wf-fico-meter">
                <div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Credit Health</div>
                  <div className="wf-fico-score-box">
                    <span className="wf-fico-score">785</span>
                    <span className="wf-fico-rating">• Exceptional</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFicoModal(true)}
                  style={{ backgroundColor: '#374151', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}
                >
                  Details
                </button>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* ---------------- TRANSFER MONEY MODAL ---------------- */}
      {showTransferModal && (
        <div className="wf-modal-overlay" onClick={() => setShowTransferModal(false)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Transfer Funds Between Accounts</h3>
              <button className="wf-modal-close" onClick={() => setShowTransferModal(false)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              {transferSuccessMsg && (
                <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>{transferSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleExecuteTransfer}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '600', marginBottom: '6px' }}>
                    From Account:
                  </label>
                  <select 
                    value={transferFrom} 
                    onChange={(e) => setTransferFrom(e.target.value)}
                    className="wf-input-field"
                    style={{ backgroundColor: '#fff' }}
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.number}) – Available: ${a.balance.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '600', marginBottom: '6px' }}>
                    To Account:
                  </label>
                  <select 
                    value={transferTo} 
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="wf-input-field"
                    style={{ backgroundColor: '#fff' }}
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.number}) – Balance: ${a.balance.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '600', marginBottom: '6px' }}>
                    Amount ($ USD):
                  </label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0.01" 
                    placeholder="0.00" 
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="wf-input-field"
                    autoFocus
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="submit"
                    style={{ flex: 1, backgroundColor: '#d71e28', color: '#fff', padding: '12px', borderRadius: '999px', fontWeight: '700', fontSize: '14.5px' }}
                  >
                    Confirm &amp; Complete Transfer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowTransferModal(false)}
                    style={{ backgroundColor: '#f3f4f6', color: '#333', padding: '12px 20px', borderRadius: '999px', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MOBILE PHONE PREVIEW MODAL (Image 1) ---------------- */}
      {showMobileModal && (
        <div className="wf-phone-modal-overlay" onClick={() => setShowMobileModal(false)}>
          <div className="wf-phone-case" onClick={(e) => e.stopPropagation()}>
            <div className="wf-phone-screen">
              <div className="wf-phone-notch"></div>
              
              {/* Promo Banner matching Image 1: See your big picture */}
              <h2 className="wf-phone-big-picture-title">See your big<br />picture</h2>
              <p className="wf-phone-big-picture-sub">All your accounts in one place</p>

              {/* Inner phone mockup card */}
              <div className="wf-phone-inner-card">
                <div className="wf-phone-user-greeting">
                  <span>Good evening, {userName}</span>
                  <button 
                    onClick={() => setShowMobileModal(false)}
                    style={{ fontSize: '11px', color: '#d71e28', fontWeight: '700' }}
                  >
                    Close
                  </button>
                </div>

                {/* Accounts on Mobile (matching Image 1 exactly) */}
                <div className="wf-phone-acct-item">
                  <div className="wf-phone-acct-name">EVERYDAY CHECKING ...0987</div>
                  <div className="wf-phone-acct-bal">$2,667.93</div>
                  <div className="wf-phone-acct-type">Available balance</div>
                </div>

                <div className="wf-phone-acct-item">
                  <div className="wf-phone-acct-name">SAVINGS ...6543</div>
                  <div className="wf-phone-acct-bal">$1,636.85</div>
                  <div className="wf-phone-acct-type">Available balance</div>
                </div>

                <div className="wf-phone-acct-item">
                  <div className="wf-phone-acct-name">WAY2SAVE® SAVINGS ...0311</div>
                  <div className="wf-phone-acct-bal">$6,354.78</div>
                  <div className="wf-phone-acct-type">Available balance</div>
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <button 
                    onClick={() => {
                      setShowMobileModal(false);
                      setShowTransferModal(true);
                    }}
                    style={{ backgroundColor: '#d71e28', color: '#fff', width: '100%', padding: '10px', borderRadius: '999px', fontWeight: '700', fontSize: '13px' }}
                  >
                    Transfer Funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FICO SCORE MODAL ---------------- */}
      {showFicoModal && (
        <div className="wf-modal-overlay" onClick={() => setShowFicoModal(false)}>
          <div className="wf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">FICO® Score Details</h3>
              <button className="wf-modal-close" onClick={() => setShowFicoModal(false)}>&times;</button>
            </div>
            <div className="wf-modal-body">
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#10b981' }}>785</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>Exceptional Credit Rating</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Based on Experian data as of Oct 01, 2026</div>
              </div>

              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: '#f9fafb' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#333' }}>Factors positively impacting your score:</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                  <li><strong>100% on-time payment history</strong> across all open accounts.</li>
                  <li><strong>Low credit card utilization (under 5%)</strong> across revolving accounts.</li>
                  <li><strong>Healthy account age</strong> averaging over 7 years.</li>
                </ul>
              </div>

              <button 
                onClick={() => setShowFicoModal(false)}
                style={{ width: '100%', marginTop: '20px', backgroundColor: '#d71e28', color: '#fff', padding: '10px', borderRadius: '999px', fontWeight: '700' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean Dedicated Account Balance Modal (Only shows balance with account number) */}
      {selectedAccountForModal && (
        <div 
          className="wf-balance-modal-overlay" 
          onClick={() => setSelectedAccountForModal(null)}
        >
          <div 
            className="wf-balance-modal-card" 
            onClick={(e) => e.stopPropagation()}
            id="account-balance-modal"
          >
            <div className="wf-balance-modal-topbar">
              <span className="wf-balance-modal-brand">WELLS FARGO</span>
              <button 
                className="wf-balance-modal-close" 
                onClick={() => setSelectedAccountForModal(null)}
                aria-label="Close balance modal"
                id="btn-close-balance-modal"
              >
                &times;
              </button>
            </div>

            <div className="wf-balance-modal-body">
              <div className="wf-balance-modal-acct-name">
                {selectedAccountForModal.name}
              </div>
              <div className="wf-balance-modal-acct-number">
                Account Number: <strong>{selectedAccountForModal.number}</strong>
              </div>

              <div className="wf-balance-modal-amount-box">
                <div className="wf-balance-modal-amount">
                  {formatCurrency(selectedAccountForModal.balance)}
                </div>
                <div className="wf-balance-modal-label">
                  {selectedAccountForModal.balanceLabel}
                </div>
              </div>

              <button 
                className="wf-balance-modal-done-btn" 
                onClick={() => setSelectedAccountForModal(null)}
                id="btn-done-balance-modal"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Big Picture Modal Overlay */}
      <BigPictureModal 
        isOpen={showBigPictureModal} 
        onClose={() => setShowBigPictureModal(false)} 
        focusedAccountId={focusedModalAccountId}
      />

    </div>
  );
}
