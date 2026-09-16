import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES_FULL = [
  {
    num: '01', type: 'Overseas Recruitment',
    title: 'Overseas Manpower Recruitment',
    description: 'End-to-end international placement of skilled, semi-skilled, and unskilled manpower to verified overseas employers across Gulf and Asia.',
    image: '/images/corporate_desk_empty_team.jpeg',
    details: ['Demand letter processing', 'Employer verification', 'Candidate sourcing & screening', 'End-to-end deployment support'],
  },
  {
    num: '02', type: 'Construction & Civil',
    title: 'Construction & Civil Workforce',
    description: 'Mason, Plumber, Electrician, Carpenter, Welder, Painter, Fitter, Rigger, Steel Fixers and general Construction Labour for projects across the Gulf and Middle East.',
    image: '/images/modern_indian_skilled_trades.jpeg',
    details: ['Civil engineers & supervisors', 'Mason, welder, rigger, scaffolder', 'Electrical & plumbing trades', 'Heavy equipment operators'],
  },
  {
    num: '03', type: 'Healthcare',
    title: 'Healthcare Professionals',
    description: 'Registered Nurses, Doctors, Lab Technicians, Paramedics, Medical Assistants and Caregivers with complete licensing support for international placements.',
    image: '/images/hospital.jpeg',
    details: ['Registered nurses & doctors', 'Lab technicians & paramedics', 'Caregivers & medical assistants', 'Licensing & attestation support'],
  },
  {
    num: '04', type: 'Hospitality',
    title: 'Hospitality & Hotel Staff',
    description: 'Chefs, Cooks, Waiters, Housekeeping Staff, Hospitality Managers, Stewards and Retail Professionals for hotels, restaurants and consumer businesses worldwide.',
    image: '/images/hospitality.jpeg',
    details: ['Chefs, cooks, stewards', 'Front desk & reception staff', 'Housekeeping supervisors', 'Retail & F&B professionals'],
  },
  {
    num: '05', type: 'Oil & Gas',
    title: 'Oil, Gas & Energy Sector',
    description: 'Rig Workers, Safety Officers, Engineers, Heavy Equipment Operators and Pipeline Workers for energy and large infrastructure projects globally.',
    image: '/images/oil.jpeg',
    details: ['Rig workers & pipeline crew', 'Safety officers (NEBOSH/IOSH)', 'Heavy equipment operators', 'Process engineers & technicians'],
  },
  {
    num: '06', type: 'IT & Corporate',
    title: 'IT & BPO Professionals',
    description: 'Software Developers, Data Analysts, Network Engineers, Customer Service Executives and Business Process Specialists for global tech companies.',
    image: '/images/IT.jpeg',
    details: ['Software developers & engineers', 'Data analysts & QA testers', 'Network & system admins', 'BPO & customer service staff'],
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Demand Letter', desc: 'Employer submits workforce requirements and terms of employment.' },
  { num: '02', title: 'Employer Verification', desc: 'We verify employer credentials, job offers, and destination country laws.' },
  { num: '03', title: 'Candidate Screening', desc: 'Rigorous shortlisting from our verified candidate database.' },
  { num: '04', title: 'Interview Coordination', desc: 'Facilitate in-person or virtual interviews between employer and candidates.' },
  { num: '05', title: 'Offer & Documentation', desc: 'Issue offer letters and assist with all legal documentation.' },
  { num: '06', title: 'Joining Support', desc: 'Visa processing, medical, travel coordination and pre-departure briefing.' },
];

export const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--slate)', padding: '72px 80px', position: 'relative', overflow: 'hidden' }} className="srv-hero">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--gold), var(--cobalt), var(--gold))' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.07)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />What We Offer
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 18 }}>
            Our Recruitment <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Services</em>
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Comprehensive overseas manpower recruitment solutions tailored to your industry, scale, and international workforce needs.
          </p>
        </div>
        <style>{`
          .srv-hero { padding:72px 80px; }
          @media (max-width:1024px) { .srv-hero { padding:56px 32px !important; } }
          @media (max-width:640px) { .srv-hero { padding:48px 20px !important; } }
          @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(0.8); } }
        `}</style>
      </section>

      {/* ── Services Grid ── */}
      <section style={{ padding: '80px 80px', background: 'var(--mist)' }} className="srv-grid-section">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Featured first service (wide) */}
          <div style={{ position: 'relative', height: 380, borderRadius: 20, overflow: 'hidden', marginBottom: 20, cursor: 'pointer' }}>
            <img src={SERVICES_FULL[0].image} alt={SERVICES_FULL[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.2) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '44px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--gold)', color: 'var(--slate)', borderRadius: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, width: 'fit-content' }}>{SERVICES_FULL[0].type}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>{SERVICES_FULL[0].title}</h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 500, lineHeight: 1.65, marginBottom: 20 }}>{SERVICES_FULL[0].description}</p>
              <Link to="/contact-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--gold)', textDecoration: 'none' }}>
                Request This Service <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* 2×3 grid of remaining */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="srv-inner-grid">
            {SERVICES_FULL.slice(1).map((srv, i) => (
              <div key={i}
                style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', height: 280 }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <img src={srv.image} alt={srv.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: activeService === i ? 'scale(1.06)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.35) 60%, transparent 100%)', transition: 'opacity 0.3s ease', opacity: activeService === i ? 1 : 0.85 }} />
                <div style={{ position: 'absolute', inset: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(201,168,76,0.85)', color: 'var(--slate)', borderRadius: 5, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, width: 'fit-content' }}>{srv.type}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>{srv.title}</h3>

                  {/* Expanded details on hover */}
                  <div style={{ overflow: 'hidden', maxHeight: activeService === i ? 200 : 0, transition: 'max-height 0.35s ease', opacity: activeService === i ? 1 : 0 }}>
                    <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none' }}>
                      {srv.details.map((d, j) => (
                        <li key={j} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, paddingLeft: 14, position: 'relative', marginBottom: 2 }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>›</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--gold)', textDecoration: 'none' }}>
                    Request Manpower →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .srv-grid-section { padding:80px 80px; }
          .srv-inner-grid { grid-template-columns:repeat(2,1fr); }
          @media (max-width:1024px) { .srv-grid-section { padding:64px 32px !important; } }
          @media (max-width:768px) { .srv-inner-grid { grid-template-columns:1fr !important; } }
          @media (max-width:640px) { .srv-grid-section { padding:48px 20px !important; } }
        `}</style>
      </section>

      {/* ── Process ── */}
      <section style={{ background: 'var(--slate)', padding: '80px 80px', position: 'relative', overflow: 'hidden' }} className="srv-process">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--gold), var(--cobalt), var(--gold))' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.07)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />Our Process
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Recruitment Process
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="srv-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: 16 }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .srv-process { padding:80px 80px; }
          .srv-process-grid { grid-template-columns:repeat(3,1fr); }
          @media (max-width:1024px) { .srv-process { padding:64px 32px !important; } .srv-process-grid { grid-template-columns:repeat(2,1fr) !important; } }
          @media (max-width:640px) { .srv-process { padding:48px 20px !important; } .srv-process-grid { grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--mist)', padding: '72px 80px', textAlign: 'center' }} className="srv-cta">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 700, color: 'var(--slate)', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 16 }}>
            Ready to Get the Right Team?
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'var(--steel)', lineHeight: 1.7, marginBottom: 36 }}>
            Let us help you source, screen, and deploy the exact professionals your project needs — fast, legally, and reliably.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: 'var(--cobalt)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: 'none', boxShadow: '0 6px 20px rgba(29,78,216,0.3)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cobalt-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--cobalt)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Request Consultation <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', background: 'transparent', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, borderRadius: 10, textDecoration: 'none', border: '1.5px solid var(--slate)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate)'; }}
            >View All Sections</Link>
          </div>
        </div>
        <style>{`
          .srv-cta { padding:72px 80px; }
          @media (max-width:1024px) { .srv-cta { padding:56px 32px !important; } }
          @media (max-width:640px) { .srv-cta { padding:48px 20px !important; } }
        `}</style>
      </section>
    </div>
  );
};

export default Services;
