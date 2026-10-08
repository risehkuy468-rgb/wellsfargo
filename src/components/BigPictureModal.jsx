import React, { useState } from 'react';
import './BigPictureModal.css';

export default function BigPictureModal({ isOpen, onClose, focusedAccountId }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedAcctId, setSelectedAcctId] = useState(focusedAccountId || null);
  const [activeTab, setActiveTab] = useState('Checking');
  const [showFargoSheet, setShowFargoSheet] = useState(false);
  const [fargoQuery, setFargoQuery] = useState('');
  const [fargoMessages, setFargoMessages] = useState([
    { sender: 'fargo', text: 'Hi Joe Del Rio, I\'m Fargo™. Your current total available balance across all accounts is $34,289.00.' }
  ]);

  const baseAccounts = [
    {
      id: 'sav-5348',
      name: 'SAVINGS ...5348',
      balance: '$23,198.44',
      type: 'Available balance'
    },
    {
      id: 'sav-5518',
      name: 'SAVINGS ...5518',
      balance: '$11,090.56',
      type: 'Available balance'
    }
  ];

  // If focusedAccountId is provided, move that account to the top of the modal
  const displayedAccounts = React.useMemo(() => {
    if (!focusedAccountId) return baseAccounts;
    const match = baseAccounts.find(a => a.id === focusedAccountId);
    if (!match) return baseAccounts;
    const rest = baseAccounts.filter(a => a.id !== focusedAccountId);
    return [match, ...rest];
  }, [focusedAccountId]);

  React.useEffect(() => {
    if (isOpen) {
      setActiveSlide(0);
      setSelectedAcctId(focusedAccountId || null);
    }
  }, [isOpen, focusedAccountId]);

  if (!isOpen) return null;

  const slides = [
    {
      id: 0,
      title: 'See your big picture',
      subtitle: 'All your accounts in one place',
      phoneGreeting: 'Good evening, Joe Del Rio',
      accounts: displayedAccounts
    },
    {
      id: 1,
      title: 'Track your spending',
      subtitle: 'Understand where your money goes',
      phoneGreeting: 'Spending Breakdown',
      metric: '$2,480.12 Spent this month',
      breakdown: [
        { name: 'Groceries & Dining', pct: '42%' },
        { name: 'Housing & Utilities', pct: '30%' },
        { name: 'Shopping', pct: '18%' },
        { name: 'Entertainment', pct: '10%' }
      ]
    },
    {
      id: 2,
      title: 'Send money with Zelle®',
      subtitle: 'Fast, fee-free money transfers',
      phoneGreeting: 'Quick Pay & Transfer',
      zelleContacts: ['Sarah Jenkins', 'Michael Chen', 'David Miller']
    },
    {
      id: 3,
      title: 'Deposit checks on the go',
      subtitle: 'Snap photos with your phone camera',
      phoneGreeting: 'Mobile Deposit',
      status: 'Capture front and back endorsement'
    }
  ];

  const current = slides[activeSlide];
  const prevIdx = (activeSlide - 1 + slides.length) % slides.length;
  const nextIdx = (activeSlide + 1) % slides.length;

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleFargoSubmit = (e) => {
    e.preventDefault();
    if (!fargoQuery.trim()) return;
    const q = fargoQuery.trim();
    setFargoMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setFargoQuery('');

    setTimeout(() => {
      let ans = "I've checked your Wells Fargo accounts.";
      if (q.toLowerCase().includes('balance')) {
        ans = "Your Savings ...5348 is $23,198.44 and Savings ...5518 is $11,090.56 (Total Available: $34,289.00).";
      } else if (q.toLowerCase().includes('credit') || q.toLowerCase().includes('score')) {
        ans = "Your FICO® Score is 785 (Exceptional).";
      }
      setFargoMessages((prev) => [...prev, { sender: 'fargo', text: ans }]);
    }, 500);
  };

  return (
    <div className="wf-modal-backdrop" onClick={onClose}>
      <div className="wf-bigpicture-stage" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button top corner */}
        <button 
          className="wf-modal-close-corner" 
          onClick={onClose} 
          title="Close modal"
          id="btn-close-bigpicture-modal"
        >
          &times;
        </button>

        {/* Previous Arrow */}
        <button 
          className="wf-modal-arrow-btn prev" 
          onClick={handlePrev} 
          aria-label="Previous feature"
          id="modal-arrow-prev"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        {/* Left Side Peek Card (Matching photo background) */}
        <div className="wf-modal-side-peek" onClick={handlePrev}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '6px' }}>Feature</div>
          <h3 className="wf-modal-side-peek-title">{slides[prevIdx].title}</h3>
          <p style={{ fontSize: '11.5px', opacity: 0.8, marginTop: '4px', textAlign: 'center' }}>{slides[prevIdx].subtitle}</p>
        </div>

        {/* ---------------- CENTER HIGHLIGHTED CARD (Exact match to photo) ---------------- */}
        <div className="wf-bigpicture-card">
          {/* Inner Close Button on Red Card */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'background-color 0.15s'
            }}
            title="Close modal"
            id="btn-close-card-inner"
          >
            &times;
          </button>

          {/* Top Titles: "See your big picture / All your accounts in one place" */}
          <div className="wf-bp-header-text">
            <h2 className="wf-bp-title">{current.title}</h2>
            <p className="wf-bp-sub">{current.subtitle}</p>
          </div>

          {/* White Screen Display */}
          <div className="wf-bp-inner-screen">
            {/* Status bar */}
            <div className="wf-bp-statusbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>9:41</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path></svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="16" height="10" rx="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
                <button className="wf-bp-signoff" onClick={onClose}>
                  Sign off
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="wf-bp-scroll-body">
              {/* Greeting matching photo: "Good evening, George" */}
              <div className="wf-bp-greeting-row">
                <span className="wf-bp-greeting-text">{current.phoneGreeting}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </div>

              {/* Ask Fargo Bar matching photo */}
              <div className="wf-bp-fargo-bar" onClick={() => setShowFargoSheet(true)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <span>Need help? Ask Fargo™</span>
                </div>
                <div className="wf-bp-fargo-icon">6</div>
              </div>

              {/* ---------------- SLIDE 0: MULTIPLE ACCOUNTS WITH BALANCES (NO ACCORDION EXPANSION) ---------------- */}
              {activeSlide === 0 && (
                <>
                  <div className="wf-bp-accounts-container">
                    {displayedAccounts.map((acct) => {
                      const isSelected = selectedAcctId === acct.id || focusedAccountId === acct.id;
                      return (
                        <div 
                          key={acct.id}
                          className={`wf-bp-account-row ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedAcctId(acct.id)}
                          title={`${acct.name}: ${acct.balance}`}
                        >
                          <div className="wf-bp-acct-title">
                            <span>{acct.name}</span>
                            {isSelected && (
                              <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', textTransform: 'none', letterSpacing: '0' }}>● Selected</span>
                            )}
                          </div>
                          <div className="wf-bp-acct-balance">{acct.balance}</div>
                          <div className="wf-bp-acct-type">{acct.type}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tabs: Checking | Savings & CDs | Credit Cards | Loans */}
                  <div className="wf-bp-tabs-strip">
                    {['Checking', 'Savings & CDs', 'Credit Cards', 'Loans'].map((tab) => (
                      <button
                        key={tab}
                        className={`wf-bp-tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Bottom Promo: Interested in managing your debt? */}
                  <div className="wf-bp-promo-tile">
                    <div className="wf-bp-card-thumb"></div>
                    <div>
                      <div className="wf-bp-promo-title">Interested in managing your debt?</div>
                      <div className="wf-bp-promo-text">Get a special APR today on balance transfers</div>
                    </div>
                  </div>
                </>
              )}

              {/* SLIDE 1: TRACK SPENDING */}
              {activeSlide === 1 && (
                <div style={{ flexGrow: 1 }}>
                  <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Current Month</div>
                    <div style={{ fontSize: '20px', fontWeight: '800' }}>{current.metric}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {current.breakdown.map((item) => (
                      <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px' }}>
                        <span>{item.name}</span>
                        <strong>{item.pct}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 2: SEND WITH ZELLE */}
              {activeSlide === 2 && (
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#7414ca', marginBottom: '8px' }}>Zelle® Instant Transfer</div>
                  {current.zelleContacts.map((c) => (
                    <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: '1px solid #eee', borderRadius: '6px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12.5px' }}>{c}</span>
                      <button style={{ backgroundColor: '#7414ca', color: '#fff', border: 'none', borderRadius: '999px', padding: '3px 10px', fontSize: '11px' }}>Send</button>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 3: DEPOSIT CHECKS */}
              {activeSlide === 3 && (
                <div style={{ flexGrow: 1, textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>Mobile Check Deposit</div>
                  <p style={{ fontSize: '11.5px', color: '#666', marginTop: '4px' }}>{current.status}</p>
                </div>
              )}
            </div>

            {/* Bottom Dock */}
            <div className="wf-bp-dock">
              <button className="wf-bp-dock-btn active">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>
                <span>Accounts</span>
              </button>
              <button className="wf-bp-dock-btn" onClick={() => setActiveSlide(3)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path></svg>
                <span>Deposit</span>
              </button>
              <button className="wf-bp-dock-btn" onClick={() => setActiveSlide(2)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                <span>Transfer</span>
              </button>
              <button className="wf-bp-dock-btn" onClick={() => setActiveSlide(1)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>Plan</span>
              </button>
              <button className="wf-bp-dock-btn" onClick={() => setShowFargoSheet(true)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                <span>Menu</span>
              </button>
            </div>

            {/* Fargo Assistant Drawer */}
            {showFargoSheet && (
              <div className="wf-bp-fargo-overlay" onClick={() => setShowFargoSheet(false)}>
                <div className="wf-bp-fargo-modal" onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '13px' }}>Fargo™ AI Assistant</strong>
                    <button onClick={() => setShowFargoSheet(false)} style={{ border: 'none', background: 'none', fontSize: '16px', cursor: 'pointer' }}>&times;</button>
                  </div>
                  <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px', fontSize: '11.5px' }}>
                    {fargoMessages.map((m, i) => (
                      <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.sender === 'user' ? '#d71e28' : '#f1f5f9', color: m.sender === 'user' ? '#fff' : '#111', padding: '6px 10px', borderRadius: '10px', maxWidth: '85%' }}>
                        {m.text}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleFargoSubmit} style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="text" 
                      placeholder="Ask Fargo about balance, bills..." 
                      value={fargoQuery}
                      onChange={(e) => setFargoQuery(e.target.value)}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: '999px', border: '1px solid #ccc', fontSize: '11px', outline: 'none' }}
                    />
                    <button type="submit" style={{ backgroundColor: '#d71e28', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}>&uarr;</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Peek Card (Matching photo background) */}
        <div className="wf-modal-side-peek" onClick={handleNext}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '6px' }}>Feature</div>
          <h3 className="wf-modal-side-peek-title">{slides[nextIdx].title}</h3>
          <p style={{ fontSize: '11.5px', opacity: 0.8, marginTop: '4px', textAlign: 'center' }}>{slides[nextIdx].subtitle}</p>
        </div>

        {/* Next Arrow matching photo on the right */}
        <button 
          className="wf-modal-arrow-btn next" 
          onClick={handleNext} 
          aria-label="Next feature"
          id="modal-arrow-next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

      </div>
    </div>
  );
}
