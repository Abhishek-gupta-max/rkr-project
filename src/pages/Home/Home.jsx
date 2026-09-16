import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/common/Modal/Modal';
import { COMPANY_NAME, CONTACT_INFO, LICENSE_NO, RA_NO, ESTABLISHED_YEAR } from '../../utils/constants';

/* ── Scroll Reveal Hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Data ── */
const ALL_SERVICES = [
  { num: '01', title: 'Overseas Manpower Recruitment', desc: 'End-to-end international recruitment and placement of skilled, semi-skilled, and unskilled workforce to verified overseas employers across the Gulf Region and international markets.' },
  { num: '02', title: 'Skilled Manpower Sourcing', desc: 'Sourcing certified engineers, welders, electricians, plumbers, masons, riggers, and technical specialists from talent hubs across India.' },
  { num: '03', title: 'Semi-Skilled Manpower Sourcing', desc: 'Sourcing factory operators, security personnel, cooks, warehouse staff, and equipment operators suited for industrial and commercial operations.' },
  { num: '04', title: 'Unskilled Workforce Supply', desc: 'Deploying general labourers, site helpers, cleaners, farm hands, and logistics support staff with rapid turnaround.' },
  { num: '05', title: 'Client Interview Coordination', desc: 'Organizing structured in-person trade testing, candidate screening, and virtual interview sessions for visiting delegate teams.' },
  { num: '06', title: 'Visa & Emigration Support', desc: 'Complete handling of employment visa applications, government emigration clearance, and legal attestation workflows.' },
  { num: '07', title: 'Medical Coordination', desc: 'Scheduling and tracking mandatory pre-deployment medical fitness examinations at GAMCA / NAMCA approved medical centers.' },
  { num: '08', title: 'Travel & Deployment Logistics', desc: 'Flight booking, group movement management, airport departure assistance, and arrival briefing coordination with employers.' },
  { num: '09', title: 'Documentation & Attestation', desc: 'Educational, commercial, and legal document verification, apostille services, and police clearance certificate (PCC) assistance.' },
  { num: '10', title: 'Pre-Departure Briefing & Welfare', desc: 'Orienting workers on destination country labor laws, cultural norms, safety guidelines, and ongoing candidate welfare support.' },
];

const MANPOWER_DATA = {
  skilled: [
    'Civil Engineers', 'Electrical Engineers', 'Mechanical Engineers',
    'Welders (3G / 6G / TIG / MIG)', 'Pipefitters & Fabricators', 'Electricians (Industrial & Commercial)',
    'Plumbers & Pipe Mechanics', 'Masons & Bricklayers', 'Steel Fixers & Bar Benders',
    'Heavy Equipment Operators', 'Scaffolders & Riggers', 'Carpenters (Shuttering & Furniture)',
    'HVAC Technicians', 'Auto Mechanics & Technicians', 'Industrial Painters', 'Safety Officers'
  ],
  semiSkilled: [
    'Security Guards & Officers', 'Factory Line Operators', 'Machine Mechanics Helpers',
    'Cooks & Kitchen Specialists', 'Forklift Operators', 'Warehouse Staff',
    'Light Vehicle Drivers', 'Housekeeping Supervisors', 'Electrician Assistants',
    'Plumbing Helpers', 'AC Technician Helpers', 'Painter Assistants'
  ],
  unskilled: [
    'General Site Labourers', 'Cleaners & Janitors', 'Agricultural Workers',
    'Packers & Cargo Handlers', 'Loading & Unloading Staff', 'Domestic Support Staff',
    'Facility Maintenance Helpers', 'Office Assistants', 'Watchmen & Groundskeepers',
    'Sanitation Workers', 'Fleet Washers', 'Kitchen Stewards'
  ],
};

const JOURNEY_STEPS = [
  { num: '01', title: 'Requirement & Sourcing', desc: 'Client submits workforce requirements; candidate database is screened and shortlisted.' },
  { num: '02', title: 'Trade Test & Screening', desc: 'Candidates undergo practical trade evaluations and credentials verification.' },
  { num: '03', title: 'Client Interview', desc: 'Employers select candidates via direct in-person interviews or virtual delegations.' },
  { num: '04', title: 'Selection & Offer', desc: 'Selected candidates receive formal job offers, terms, and employment contracts.' },
  { num: '05', title: 'Medical Examination', desc: 'Mandatory GAMCA/NAMCA approved medical fitness certification is completed.' },
  { num: '06', title: 'Visa Processing', desc: 'Embassy visa application, stamping, and emigration approval are executed.' },
  { num: '07', title: 'Pre-Departure Orientation', desc: 'Comprehensive briefing on workplace guidelines, safety, and legal rights.' },
  { num: '08', title: 'Flight & Deployment', desc: 'Ticketing, airport coordination, and official deployment to destination country.' },
];

const STRENGTHS = [
  'Skilled & Reliable Manpower Sourcing',
  'Extensive Verified Candidate Database',
  'Experienced International Recruitment Specialists',
  'Rigorous Trade Testing & Screening',
  'Swift Client Interview Delegation',
  'Transparent & Ethical Recruitment Standards',
  'Complete Documentation & Legal Attestation',
  'GAMCA Medical & Visa Assistance',
  'Punctual Overseas Deployment Support',
  'Direct Client Representative Coordination',
  'Strict Quality Control & Candidate Fit',
  'Government Licensed Overseas Employment Support',
];

const DESTINATIONS = [
  { name: 'UAE / Dubai', region: 'Gulf Region' },
  { name: 'Saudi Arabia', region: 'Gulf Region' },
  { name: 'Qatar', region: 'Gulf Region' },
  { name: 'Oman', region: 'Gulf Region' },
  { name: 'Kuwait', region: 'Gulf Region' },
  { name: 'Bahrain', region: 'Gulf Region' },
  { name: 'Sri Lanka', region: 'South Asia' },
  { name: 'Russia', region: 'Eurasia' },
  { name: 'Other Markets', region: 'Global' },
];

/* ─────────────────────────────────────────────── */
export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ src: '', title: '' });
  const [activeService, setActiveService] = useState(0);
  const [activeManpowerTab, setActiveManpowerTab] = useState('skilled');
  const [hoveredStrength, setHoveredStrength] = useState(null);

  useReveal();

  const openCertModal = (src, title) => { setModalContent({ src, title }); setModalOpen(true); };

  const manpowerTabs = [
    { key: 'skilled', label: 'Skilled', count: MANPOWER_DATA.skilled.length },
    { key: 'semiSkilled', label: 'Semi-Skilled', count: MANPOWER_DATA.semiSkilled.length },
    { key: 'unskilled', label: 'Unskilled', count: MANPOWER_DATA.unskilled.length },
  ];

  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════
          HERO — Editorial & Purposeful
      ═══════════════════════════════ */}
      <section id="home" style={{ display: 'grid', gridTemplateColumns: '12fr 10fr', minHeight: '85vh', background: 'var(--slate)' }} className="hero-section">

        {/* LEFT: Text & Content */}
        <div style={{ padding: '80px 60px 80px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }} className="hero-left">

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Global Manpower Solutions
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4.2vw, 60px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 24 }}>
            Connecting the <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Right People</em>
            <br />With the Right Opportunities.
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15.5, lineHeight: 1.75, maxWidth: 480, marginBottom: 40, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            A premier MEA-licensed manpower agency delivering ethical recruitment, candidate trade testing, and overseas deployment solutions for international infrastructure, industrial, and commercial enterprises.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/contact-info" id="hero-get-manpower"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: 'var(--gold)', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get Manpower <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/contact-info" id="hero-contact-us"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'transparent', color: 'rgba(255,255,255,0.85)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, borderRadius: 10, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
            >Contact Us</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              `MEA License: ${LICENSE_NO}`,
              `Government Reg No: ${RA_NO}`,
              '100% Transparent & Compliant Recruitment Process'
            ].map((b, i) => (
              <div key={i} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--gold)', fontSize: 14 }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Authentic Editorial Photo */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0f1a35', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }} className="hero-right">
          <div style={{ position: 'relative', width: '100%', height: '100%', maxHeight: 520, borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <img src="/images/modern_indian_skilled_trades.jpeg" alt="Professional Manpower Workforce" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,39,68,0.7) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Certified Technical Workforce</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600 }}>Skilled trades ready for international deployment</div>
            </div>
          </div>
        </div>

        <style>{`
          .hero-section { grid-template-columns: 12fr 10fr; min-height: 85vh; }
          @media (max-width: 960px) {
            .hero-section { grid-template-columns: 1fr !important; }
            .hero-left { padding: 60px 32px 48px !important; }
            .hero-right { padding: 0 32px 48px !important; min-height: 380px !important; }
          }
          @media (max-width: 640px) {
            .hero-left { padding: 40px 20px 32px !important; }
            .hero-right { padding: 0 20px 40px !important; min-height: 300px !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          TRUST INFORMATION STRIP
      ═══════════════════════════════ */}
      <div style={{ background: 'var(--cream)', borderBottom: '1.5px solid var(--fog)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="trust-grid">
          {[
            { value: ESTABLISHED_YEAR, label: 'Established', sub: 'Foundational Operations' },
            { value: '10+ Years', label: 'Experience', sub: 'Overseas Manpower' },
            { value: RA_NO, label: 'Registration', sub: 'Government Approved', mono: true },
            { value: 'Buxar, Bihar', label: 'Head Office', sub: 'India Operations' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '36px 32px', borderRight: i < 3 ? '1px solid var(--fog)' : 'none', display: 'flex', flexDirection: 'column', gap: 6 }} className={`scroll-reveal stagger-${i+1}`}>
              <div style={{ fontFamily: s.mono ? "'JetBrains Mono', monospace" : "'Playfair Display', serif", fontSize: s.mono ? 16 : 36, fontWeight: 700, color: 'var(--slate)', lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11.5, fontWeight: 700, color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: 'var(--steel)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <style>{`
          .trust-grid { grid-template-columns: repeat(4, 1fr); }
          @media (max-width: 900px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .trust-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>

      {/* ═══════════════════════════════
          ABOUT SECTION — Asymmetric Layout
      ═══════════════════════════════ */}
      <section id="about" style={{ background: 'var(--ivory)', padding: '90px 60px' }} className="about-section">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 72, alignItems: 'center' }} className="about-grid">

          <div style={{ position: 'relative' }} className="scroll-reveal-left">
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 480, border: '1.5px solid var(--fog)', boxShadow: '0 16px 40px rgba(13,17,23,0.1)' }}>
              <img src="/images/corporate_desk_empty_team.jpeg" alt="RKR Globalpath Recruitment Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="scroll-reveal-right">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                About RKR Globalpath
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                A Legacy of Trust in International Manpower Deployment
              </h2>
            </div>

            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'var(--steel)', lineHeight: 1.75 }}>
              {COMPANY_NAME} is an authorized, MEA-licensed manpower recruitment firm based in Buxar, Bihar. We bridge the gap between skilled Indian talent and overseas corporate clients across the Gulf, Middle East, and global markets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'MEA License No.', value: LICENSE_NO, mono: true },
                { label: 'Registration No.', value: RA_NO, mono: true },
                { label: 'Corporate ID (CIN)', value: 'U78300BIH2025PTC219970', mono: true },
                { label: 'Headquarters', value: 'Buxar, Bihar - 802101', mono: false },
              ].map((info, i) => (
                <div key={i} style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 10, padding: '12px 16px' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 700, color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{info.label}</div>
                  <div style={{ fontFamily: info.mono ? "'JetBrains Mono', monospace" : "'Plus Jakarta Sans', sans-serif", fontSize: info.mono ? 10.5 : 13, fontWeight: 600, color: 'var(--slate)', wordBreak: 'break-all' }}>{info.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Strict background screening & trade qualifications testing',
                'Full compliance with Ministry of External Affairs standards',
                'Transparent employer-candidate agreement coordination',
                'End-to-end visa, medical, and departure flight arrangements'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--cobalt)', fontWeight: 700 }}>•</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: 'var(--charcoal)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--cobalt)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13.5, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--cobalt-dark)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--cobalt)'; }}>
                Explore Services <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/contact-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'transparent', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13.5, borderRadius: 10, textDecoration: 'none', border: '1.5px solid var(--slate)', transition: 'all 0.25s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate)'; }}>Contact Office</Link>
            </div>
          </div>
        </div>
        <style>{`
          .about-section { padding: 90px 60px; }
          .about-grid { grid-template-columns: 5fr 7fr; gap: 72px; }
          @media (max-width: 1024px) { .about-section { padding: 72px 32px !important; } .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
          @media (max-width: 640px) { .about-section { padding: 56px 20px !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          SERVICES — List Navigation Experience
      ═══════════════════════════════ */}
      <section id="services" style={{ background: 'var(--mist)', padding: '90px 60px' }} className="services-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 48 }} className="scroll-reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
              Recruitment Solutions
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.2 }}>
              Structured Overseas Services
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--ivory)', borderRadius: 16, overflow: 'hidden', border: '1.5px solid var(--fog)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }} className="services-grid scroll-scale">
            
            {/* Left: Interactive List */}
            <div style={{ borderRight: '1.5px solid var(--fog)' }}>
              {ALL_SERVICES.map((srv, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '18px 24px',
                    cursor: 'pointer',
                    borderBottom: i < ALL_SERVICES.length - 1 ? '1px solid var(--fog)' : 'none',
                    borderLeft: `3px solid ${activeService === i ? 'var(--cobalt)' : 'transparent'}`,
                    background: activeService === i ? 'rgba(29,78,216,0.04)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: activeService === i ? 'var(--cobalt)' : 'var(--pewter)', minWidth: 24 }}>{srv.num}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: activeService === i ? 700 : 500, color: activeService === i ? 'var(--slate)' : 'var(--charcoal)', lineHeight: 1.3 }}>{srv.title}</span>
                </div>
              ))}
            </div>

            {/* Right: Clean Detail Panel */}
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div key={activeService}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: 'var(--gold-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Service {ALL_SERVICES[activeService]?.num} / 10
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--slate)', lineHeight: 1.3, marginBottom: 16 }}>
                  {ALL_SERVICES[activeService]?.title}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'var(--steel)', lineHeight: 1.75, marginBottom: 32 }}>
                  {ALL_SERVICES[activeService]?.desc}
                </p>
                <Link to="/contact-info"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--cobalt)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--cobalt-dark)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cobalt)'; }}
                >
                  Enquire About This Service <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .services-section { padding: 90px 60px; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 1024px) { .services-section { padding: 72px 32px !important; } }
          @media (max-width: 768px) { .services-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 640px) { .services-section { padding: 56px 20px !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          MANPOWER CATEGORIES
      ═══════════════════════════════ */}
      <section id="manpower" style={{ background: 'var(--ivory)', padding: '90px 60px' }} className="manpower-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
            <div className="scroll-reveal">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                Workforce Classifications
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.2 }}>
                Trades & Skill Categories
              </h2>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--mist)', borderRadius: 10, padding: 4, border: '1.5px solid var(--fog)' }} className="scroll-reveal">
              {manpowerTabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveManpowerTab(tab.key)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700,
                    padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: activeManpowerTab === tab.key ? 'var(--slate)' : 'transparent',
                    color: activeManpowerTab === tab.key ? '#fff' : 'var(--steel)',
                    transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid of trades without emojis */}
          <div key={activeManpowerTab} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="manpower-grid">
            {MANPOWER_DATA[activeManpowerTab].map((trade, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cobalt)', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: 'var(--slate)' }}>{trade}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .manpower-section { padding: 90px 60px; }
          .manpower-grid { grid-template-columns: repeat(4, 1fr); }
          @media (max-width: 1024px) { .manpower-section { padding: 72px 32px !important; } .manpower-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 768px) { .manpower-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .manpower-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          RECRUITMENT PROCESS — Timeline
      ═══════════════════════════════ */}
      <section id="process" style={{ background: 'var(--slate)', color: '#fff', padding: '90px 60px' }} className="process-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 56 }} className="scroll-reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
              Structured Workflow
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              The Recruitment Journey
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '12px auto 0' }}>
              Eight transparent, compliant milestones from demand receipt to candidate flight deployment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="process-grid">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }} className={`scroll-reveal stagger-${(i%4)+1}`}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  STEP {step.num}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .process-section { padding: 90px 60px; }
          .process-grid { grid-template-columns: repeat(4, 1fr); }
          @media (max-width: 1024px) { .process-section { padding: 72px 32px !important; } .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px) { .process-section { padding: 56px 20px !important; } .process-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          DESTINATIONS
      ═══════════════════════════════ */}
      <section id="destinations" style={{ background: 'var(--ivory)', padding: '90px 60px' }} className="dest-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 40 }} className="scroll-reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
              International Operations
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--slate)' }}>
              Primary Overseas Markets
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="dest-grid">
            {DESTINATIONS.map((d, i) => (
              <div key={i} style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--slate)' }}>{d.name}</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 600, color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d.region}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .dest-section { padding: 90px 60px; }
          .dest-grid { grid-template-columns: repeat(3, 1fr); }
          @media (max-width: 900px) { .dest-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px) { .dest-section { padding: 56px 20px !important; } .dest-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          WHY CHOOSE US & STRENGTHS
      ═══════════════════════════════ */}
      <section id="strengths" style={{ background: 'var(--cream)', padding: '90px 60px' }} className="strengths-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64 }} className="strengths-grid">
            
            <div className="scroll-reveal-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
                Core Capabilities
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.25, marginBottom: 16 }}>
                Why Leading Employers Choose RKR Globalpath
              </h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'var(--steel)', lineHeight: 1.7 }}>
                Our 12 core operational standards guarantee precision, candidate authenticity, and legal compliance across all international manpower deployments.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: 'var(--ivory)', borderRadius: 14, border: '1.5px solid var(--fog)', overflow: 'hidden' }} className="strengths-inner-grid scroll-reveal-right">
              {STRENGTHS.map((strength, i) => (
                <div key={i}
                  onMouseEnter={() => setHoveredStrength(i)}
                  onMouseLeave={() => setHoveredStrength(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--fog)',
                    borderRight: i % 2 === 0 ? '1px solid var(--fog)' : 'none',
                    borderLeft: hoveredStrength === i ? '3px solid var(--gold)' : '3px solid transparent',
                    background: hoveredStrength === i ? 'rgba(201,168,76,0.04)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: hoveredStrength === i ? 'var(--gold-dim)' : 'var(--pewter)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: hoveredStrength === i ? 700 : 500, color: hoveredStrength === i ? 'var(--slate)' : 'var(--charcoal)', lineHeight: 1.35 }}>
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .strengths-section { padding: 90px 60px; }
          .strengths-grid { grid-template-columns: 5fr 7fr; gap: 64px; }
          .strengths-inner-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 1024px) { .strengths-section { padding: 72px 32px !important; } .strengths-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
          @media (max-width: 640px) { .strengths-section { padding: 56px 20px !important; } .strengths-inner-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          LEGAL & CERTIFICATIONS
      ═══════════════════════════════ */}
      <section id="certificates" style={{ background: 'var(--ivory)', padding: '90px 60px' }} className="cert-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="scroll-reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 16 }}>
              Compliance & Verification
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, color: 'var(--slate)', marginBottom: 10 }}>
              Government Licenses & Registrations
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: 'var(--steel)' }}>
              Verified documentation for legal overseas recruitment operations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="cert-grid">
            {[
              { src: '/images/certificate.PNG', title: 'Ministry of Corporate Affairs', label: 'Certificate of Incorporation', accent: 'var(--gold)' },
              { src: '/images/license_certificate.PNG', title: 'Ministry of External Affairs', label: 'MEA License Certificate', accent: 'var(--cobalt)' },
              { src: '/images/gst_certificate.pdf', title: 'GST Registration', label: 'Goods & Services Tax', accent: 'var(--slate)' },
            ].map((cert, i) => (
              <div key={i} onClick={() => openCertModal(cert.src, cert.label)}
                style={{ cursor: 'pointer', background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 14, overflow: 'hidden', transition: 'all 0.25s ease' }}
                className={`scroll-scale stagger-${i+1}`}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cert.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--fog)'; }}
              >
                <div style={{ height: 3, background: cert.accent }} />
                <div style={{ padding: 24, background: 'var(--mist)', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cert.src.endsWith('.pdf') ? (
                    <div style={{ textAlign: 'center', color: 'var(--steel)' }}>
                      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity: 0.5, marginBottom: 6 }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600 }}>Click to View Document</div>
                    </div>
                  ) : (
                    <img src={cert.src} alt={cert.label} style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} loading="lazy" />
                  )}
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--slate)', marginBottom: 2 }}>{cert.title}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: 'var(--steel)' }}>{cert.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .cert-section { padding: 90px 60px; }
          .cert-grid { grid-template-columns: repeat(3, 1fr); }
          @media (max-width: 900px) { .cert-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 640px) { .cert-section { padding: 56px 20px !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          DUAL CTA — Employer & Candidate
      ═══════════════════════════════ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="dual-cta-section">
        {/* Employer CTA */}
        <div style={{ background: 'var(--slate)', padding: '72px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="scroll-reveal">
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>Employer Consultation</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Need Reliable Overseas Manpower?
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
              Submit your project workforce requirements and speak directly with our recruitment delegation team.
            </p>
            <Link to="/contact-info" id="cta-employer-requirement"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: 'var(--gold)', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13.5, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; }}
            >
              Submit Requirement <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Candidate CTA */}
        <div style={{ background: 'var(--cobalt)', padding: '72px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="scroll-reveal">
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>Candidate Registration</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Looking for International Placement?
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
              Register your trade skills and credentials with our Buxar office for upcoming client interviews and overseas job calls.
            </p>
            <Link to="/contact-info" id="cta-candidate-opportunity"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#fff', color: 'var(--cobalt)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13.5, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              Explore Opportunities <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        <style>{`
          .dual-cta-section { grid-template-columns: 1fr 1fr; }
          @media (max-width: 768px) { .dual-cta-section { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════
          MAIN CTA — Strategic Footer Lead
      ═══════════════════════════════ */}
      <section style={{ background: '#0d1420', padding: '80px 60px', textAlign: 'center', color: '#fff' }} className="main-cta-section">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            Ready to Build Your International Team?
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 36 }}>
            Contact our senior recruitment specialists at RKR Globalpath HR Manpower for tailored manpower solutions and official documentation advice.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact-info" id="cta-final-manpower"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'var(--gold)', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; }}
            >
              Get Manpower Now <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: 'transparent', color: 'rgba(255,255,255,0.85)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, borderRadius: 10, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Call {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} src={modalContent.src} title={modalContent.title} />
    </div>
  );
};

export default Home;
