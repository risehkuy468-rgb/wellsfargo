import React, { useState } from 'react';
import './MobileShowcase.css';

export default function MobileShowcase({ onGoHome, onGoDesktop }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedAcct, setExpandedAcct] = useState(null);
  const [activePhoneTab, setActivePhoneTab] = useState('Checking');
  const [showFargoSheet, setShowFargoSheet] = useState(false);
  const [fargoMessage, setFargoMessage] = useState('');
  const [fargoChat, setFargoChat] = useState([
    { sender: 'fargo', text: 'Hi Henry, I\'m Fargo. How can I help you today? You can ask about your balance, upcoming bills, or credit score.' }
  ]);

  // Slides data matching Wells Fargo Mobile App showcase
  const slides = [
    {
      id: 0,
      title: 'See your big picture',
      subtitle: 'All your accounts in one place',
      phoneGreeting: 'Good evening, Henry',
      accounts: [
        {
          id: 'chk-0987',
          name: 'EVERYDAY CHECKING ...0987',
          balance: '$2,667.93',
          type: 'Available balance',
          routing: '121000247',
          recent: 'Payroll direct deposit: +$2,150.00'
        },
        {
          id: 'sav-6543',
          name: 'SAVINGS ...6543',
          balance: '$1,636.85',
          type: 'Available balance',
          routing: '121000247',
          recent: 'Way2Save automated transfer: +$25.00'
        },
        {
          id: 'sav-0311',
          name: 'WAY2SAVE® SAVINGS ...0311',
          balance: '$6,354.78',
          type: 'Available balance',
          routing: '121000247',
          recent: 'Interest payment: +$18.42'
        }
      ]
    },
    {
      id: 1,
      title: 'Track your spending',
      subtitle: 'Understand where your money goes',
      phoneGreeting: 'September Insights',
      metric: '$2,480.12 Total Spent',
      insights: [
        { label: 'Groceries & Food', percent: '42%', color: '#d71e28' },
        { label: 'Utilities & Bills', percent: '28%', color: '#2563eb' },
        { label: 'Shopping & Entertainment', percent: '18%', color: '#10b981' },
        { label: 'Travel & Transport', percent: '12%', color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      title: 'Pay & send with Zelle®',
      subtitle: 'Fast, fee-free money transfers',
      phoneGreeting: 'Send Money Fast',
      contacts: [
        { name: 'Sarah Jenkins', handle: 'sarah.j@email.com', avatar: 'S' },
        { name: 'Michael Chen', handle: '(415) 555-0192', avatar: 'M' },
        { name: 'David Miller', handle: 'd.miller@email.com', avatar: 'D' }
      ]
    },
    {
      id: 3,
      title: 'Deposit checks on the go',
      subtitle: 'Snap a picture to deposit in seconds',
      phoneGreeting: 'Mobile Deposit',
      depositStatus: 'Ready for Camera Scan',
      limits: 'Daily limit: $5,000.00 • 30-day limit: $15,000.00'
    },
    {
      id: 4,
      title: 'Turn cards on or off',
      subtitle: 'Instant card security at your fingertips',
      phoneGreeting: 'Card Controls',
      cardName: 'Wells Fargo Active Cash® Visa',
      cardNum: '...4520',
      status: 'Active 🟢'
    }
  ];

  const currentSlide = slides[activeSlide];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setExpandedAcct(null);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setExpandedAcct(null);
  };

  const handleSendFargo = (e) => {
    e.preventDefault();
    if (!fargoMessage.trim()) return;

    const userText = fargoMessage.trim();
    setFargoChat((prev) => [...prev, { sender: 'user', text: userText }]);
    setFargoMessage('');

    setTimeout(() => {
      let reply = "Here's what I found for you in your Wells Fargo account.";
      if (userText.toLowerCase().includes('balance')) {
        reply = "Your Everyday Checking balance is $2,667.93 and your Savings balance is $1,636.85.";
      } else if (userText.toLowerCase().includes('credit') || userText.toLowerCase().includes('fico')) {
        reply = "Your Experian FICO® Score is 785 (Exceptional), updated as of Oct 01, 2026.";
      } else if (userText.toLowerCase().includes('transfer') || userText.toLowerCase().includes('zelle')) {
        reply = "You can send money instantly using Zelle® or transfer funds between your checking and savings accounts.";
      }
      setFargoChat((prev) => [...prev, { sender: 'fargo', text: reply }]);
    }, 600);
  };

  // Indices for left and right peek cards
  const prevSlideIndex = (activeSlide - 1 + slides.length) % slides.length;
  const nextSlideIndex = (activeSlide + 1) % slides.length;

  return (
    <div className="wf-showcase-page">
      {/* ---------------- RED HEADER ---------------- */}
      <header className="wf-showcase-header">
        <div className="wf-showcase-header-content">
          <a 
            href="#home" 
            className="wf-showcase-brand"
            title="Wells Fargo Home"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            style={{ cursor: 'pointer' }}
            id="mobile-showcase-logo-home"
          >
            <span className="wf-showcase-logo">WELLS FARGO</span>
            <span className="wf-showcase-badge">Mobile® Banking</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button 
              onClick={() => alert('Download on App Store or Google Play')}
              style={{ backgroundColor: '#ffffff', color: '#d71e28', border: 'none', borderRadius: '999px', padding: '6px 18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
            >
              Get the App
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN SHOWCASE CAROUSEL SECTION ---------------- */}
      <section className="wf-carousel-section">
        <div className="wf-carousel-title-area">
          <h1 className="wf-carousel-main-heading">Wells Fargo Mobile® Experience</h1>
          <p className="wf-carousel-main-subtext">
            Check balances in a glance, send money, manage cards, and get personalized insights wherever you go.
          </p>
        </div>

        {/* ---------------- SLIDER TRACK (Matches user photo) ---------------- */}
        <div className="wf-carousel-track-wrapper">
          {/* Previous Arrow */}
          <button 
            className="wf-carousel-nav-btn prev" 
            onClick={handlePrev} 
            aria-label="Previous feature"
            id="btn-carousel-prev"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* Cards Stage */}
          <div className="wf-cards-stage">
            
            {/* LEFT PEEK CARD */}
            <div className="wf-side-card" onClick={handlePrev}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '8px' }}>Feature</div>
              <h3 className="wf-side-card-title">{slides[prevSlideIndex].title}</h3>
              <p style={{ fontSize: '12px', opacity: 0.85, marginTop: '6px', textAlign: 'center' }}>{slides[prevSlideIndex].subtitle}</p>
            </div>

            {/* CENTER HIGHLIGHTED CARD (Exact Match to User's Image) */}
            <div className="wf-center-card">
              {/* Top Text: "See your big picture / All your accounts in one place" */}
              <div className="wf-card-header-text">
                <h2 className="wf-card-main-title">{currentSlide.title}</h2>
                <p className="wf-card-subtitle">{currentSlide.subtitle}</p>
              </div>

              {/* ---------------- PHONE SCREEN INSIDE ---------------- */}
              <div className="wf-phone-container">
                {/* Status Bar */}
                <div className="wf-phone-statusbar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>9:41</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
                    <button className="wf-phone-signoff-btn" onClick={() => alert('Signed off from mobile session.')}>
                      Sign off
                    </button>
                  </div>
                </div>

                {/* Inner Phone Content */}
                <div className="wf-phone-body">
                  {/* Greeting: "Good evening, Henry" matching photo */}
                  <div className="wf-phone-greeting-row">
                    <span className="wf-phone-greeting-text">{currentSlide.phoneGreeting}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                  </div>

                  {/* Ask Fargo Bar matching photo */}
                  <div className="wf-fargo-bar" onClick={() => setShowFargoSheet(true)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      <span>Need help? Ask Fargo™</span>
                    </div>
                    <div className="wf-fargo-logo-icon">6</div>
                  </div>

                  {/* ---------------- SLIDE 0: MULTIPLE ACCOUNTS WITH BALANCES (Matching Photo) ---------------- */}
                  {activeSlide === 0 && (
                    <>
                      <div className="wf-phone-accounts-box">
                        {currentSlide.accounts.map((acct) => {
                          const isExpanded = expandedAcct === acct.id;

                          return (
                            <div 
                              key={acct.id} 
                              className={`wf-phone-account-item ${isExpanded ? 'active' : ''}`}
                              onClick={() => setExpandedAcct(isExpanded ? null : acct.id)}
                            >
                              <div className="wf-phone-account-label">
                                <span>{acct.name}</span>
                                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{isExpanded ? '▲' : '▼'}</span>
                              </div>
                              <div className="wf-phone-account-balance">{acct.balance}</div>
                              <div className="wf-phone-account-sub">{acct.type}</div>

                              {isExpanded && (
                                <div className="wf-phone-tray-expanded">
                                  <div className="wf-phone-tray-metric">
                                    <span>Routing:</span>
                                    <strong>{acct.routing}</strong>
                                  </div>
                                  <div className="wf-phone-tray-metric">
                                    <span>Latest:</span>
                                    <span>{acct.recent}</span>
                                  </div>
                                  <button 
                                    className="wf-phone-tray-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert(`Transfer flow opened for ${acct.name}`);
                                    }}
                                  >
                                    Transfer or Pay
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Horizontal Tabs: Checking | Savings & CDs | Credit Cards */}
                      <div className="wf-phone-tabs-row">
                        {['Checking', 'Savings & CDs', 'Credit Cards', 'Loans'].map((tab) => (
                          <button
                            key={tab}
                            className={`wf-phone-tab-item ${activePhoneTab === tab ? 'active' : ''}`}
                            onClick={() => setActivePhoneTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Bottom Promo Tile inside phone (Matching photo: Interested in managing debt?) */}
                      <div className="wf-phone-promo-card">
                        <div className="wf-phone-card-graphic"></div>
                        <div style={{ flexGrow: 1 }}>
                          <div className="wf-phone-promo-title">Interested in managing your debt?</div>
                          <div className="wf-phone-promo-sub">Get a special APR today on balance transfers</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ---------------- SLIDE 1: SPENDING INSIGHTS ---------------- */}
                  {activeSlide === 1 && (
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>September Spending</div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#111' }}>{currentSlide.metric}</div>
                        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '600', marginTop: '2px' }}>↓ 8.4% compared to last month</div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {currentSlide.insights.map((item) => (
                          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></span>
                              <span style={{ fontSize: '12px', fontWeight: '500' }}>{item.label}</span>
                            </div>
                            <strong style={{ fontSize: '12.5px' }}>{item.percent}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ---------------- SLIDE 2: SEND WITH ZELLE ---------------- */}
                  {activeSlide === 2 && (
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280' }}>Frequent Contacts</span>
                        <span style={{ fontSize: '11px', color: '#7414ca', fontWeight: '700' }}>Zelle®</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {currentSlide.contacts.map((c) => (
                          <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#7414ca', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px' }}>
                                {c.avatar}
                              </div>
                              <div>
                                <div style={{ fontSize: '12.5px', fontWeight: '700' }}>{c.name}</div>
                                <div style={{ fontSize: '11px', color: '#6b7280' }}>{c.handle}</div>
                              </div>
                            </div>
                            <button 
                              onClick={() => alert(`Sending money to ${c.name}`)}
                              style={{ backgroundColor: '#7414ca', color: '#fff', border: 'none', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Send
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ---------------- SLIDE 3: MOBILE CHECK DEPOSIT ---------------- */}
                  {activeSlide === 3 && (
                    <div style={{ flexGrow: 1, textAlign: 'center', padding: '10px 0' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#d71e28', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>Deposit a Check</div>
                      <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', marginBottom: '14px' }}>
                        Endorse the back of your check with "For Mobile Deposit at Wells Fargo Only", then take photos of front and back.
                      </p>
                      <button 
                        onClick={() => alert('Camera scanner initialized')}
                        style={{ backgroundColor: '#d71e28', color: '#fff', border: 'none', borderRadius: '999px', padding: '10px 20px', fontWeight: '700', fontSize: '13px', width: '100%', cursor: 'pointer' }}
                      >
                        Start Check Deposit
                      </button>
                    </div>
                  )}

                  {/* ---------------- SLIDE 4: CARD CONTROLS ---------------- */}
                  {activeSlide === 4 && (
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', color: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '14px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Wells Fargo Active Cash®</div>
                        <div style={{ fontSize: '18px', fontWeight: '800', margin: '14px 0 8px 0', letterSpacing: '2px' }}>•••• •••• •••• 4520</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.9 }}>
                          <span>HENRY SPENCER</span>
                          <span>EXP 08/29</span>
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>Card Lock / Unlock</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Instantly block unauthorized charges</div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', backgroundColor: '#d1fae5', padding: '4px 10px', borderRadius: '999px' }}>ACTIVE</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Dock Navigation */}
                <div className="wf-phone-dock">
                  <div className="wf-phone-dock-item active">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>
                    <span>Accounts</span>
                  </div>
                  <div className="wf-phone-dock-item" onClick={() => setActiveSlide(3)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path></svg>
                    <span>Deposit</span>
                  </div>
                  <div className="wf-phone-dock-item" onClick={() => setActiveSlide(2)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                    <span>Transfer</span>
                  </div>
                  <div className="wf-phone-dock-item" onClick={() => setActiveSlide(1)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>Plan</span>
                  </div>
                  <div className="wf-phone-dock-item" onClick={() => setShowFargoSheet(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <span>Menu</span>
                  </div>
                </div>

                {/* Fargo Assistant Drawer Overlay */}
                {showFargoSheet && (
                  <div className="wf-fargo-chat-overlay" onClick={() => setShowFargoSheet(false)}>
                    <div className="wf-fargo-sheet" onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="wf-fargo-logo-icon">6</div>
                          <strong style={{ fontSize: '14px' }}>Fargo™ AI Assistant</strong>
                        </div>
                        <button 
                          onClick={() => setShowFargoSheet(false)}
                          style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#666' }}
                        >
                          &times;
                        </button>
                      </div>

                      <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px', fontSize: '12px' }}>
                        {fargoChat.map((msg, i) => (
                          <div 
                            key={i} 
                            style={{ 
                              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                              backgroundColor: msg.sender === 'user' ? '#d71e28' : '#f1f5f9',
                              color: msg.sender === 'user' ? '#fff' : '#1e293b',
                              padding: '8px 12px',
                              borderRadius: '12px',
                              maxWidth: '85%'
                            }}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendFargo} style={{ display: 'flex', gap: '6px' }}>
                        <input 
                          type="text" 
                          placeholder="Ask Fargo anything..." 
                          value={fargoMessage}
                          onChange={(e) => setFargoMessage(e.target.value)}
                          style={{ flex: 1, padding: '8px 10px', borderRadius: '999px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }}
                          autoFocus
                        />
                        <button 
                          type="submit"
                          style={{ backgroundColor: '#d71e28', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          &uarr;
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT PEEK CARD */}
            <div className="wf-side-card" onClick={handleNext}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '8px' }}>Feature</div>
              <h3 className="wf-side-card-title">{slides[nextSlideIndex].title}</h3>
              <p style={{ fontSize: '12px', opacity: 0.85, marginTop: '6px', textAlign: 'center' }}>{slides[nextSlideIndex].subtitle}</p>
            </div>

          </div>

          {/* Next Arrow matching photo on the right */}
          <button 
            className="wf-carousel-nav-btn next" 
            onClick={handleNext} 
            aria-label="Next feature"
            id="btn-carousel-next"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        {/* Indicator dots */}
        <div className="wf-carousel-dots">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              className={`wf-dot ${activeSlide === idx ? 'active' : ''}`}
              onClick={() => {
                setActiveSlide(idx);
                setExpandedAcct(null);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
