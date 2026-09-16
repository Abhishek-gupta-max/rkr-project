import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, LICENSE_NO, RA_NO, CONTACT_INFO, SOCIAL_LINKS, ESTABLISHED_YEAR } from '../../../utils/constants';

export const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/process', label: 'Process' },
    { path: '/why-us', label: 'Why Choose Us' },
    { path: '/contact-info', label: 'Contact' },
  ];

  const serviceLinks = [
    'Overseas Recruitment',
    'Bulk Hiring Solutions',
    'Visa Processing',
    'Documentation & Compliance',
    'Candidate Screening',
    'Deployment Support',
  ];

  return (
    <footer
      style={{
        background: 'var(--slate)',
        color: 'rgba(255,255,255,0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(to right, var(--gold), var(--cobalt), var(--gold))',
        }}
      />

      {/* Texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main footer content ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 80px 48px', maxWidth: 1300, margin: '0 auto' }} className="footer-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: 60, marginBottom: 64 }} className="footer-grid">

          {/* Col 1: Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo */}
            <div>
              <img
                src="/images/logo.jpeg"
                alt={COMPANY_NAME}
                style={{
                  height: 52,
                  width: 'auto',
                  objectFit: 'contain',
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: 10,
                  padding: '6px 12px',
                  marginBottom: 16,
                  display: 'block',
                  borderBottom: '2px solid var(--gold)',
                }}
              />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                RKR Globalpath HR Manpower
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Global Talent × Global Opportunity
              </div>
            </div>

            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              A premier MEA-approved overseas recruitment partner delivering elite workforce solutions across the Gulf, Middle East, Europe, and Asia since {ESTABLISHED_YEAR}.
            </p>

            {/* License badge */}
            <div
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1.5px solid rgba(201,168,76,0.2)',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9.5, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                MEA Registration
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
                {RA_NO}
              </div>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                { href: SOCIAL_LINKS.youtube, label: 'YouTube', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              ].map((s, i) => (
                s.href && s.href !== '#' ? (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--gold)';
                      e.currentTarget.style.borderColor = 'var(--gold)';
                      e.currentTarget.style.color = 'var(--slate)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {s.icon}
                  </a>
                ) : null
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13.5,
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 0',
                      transition: 'color 0.2s ease, gap 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--gold)';
                      e.currentTarget.style.gap = '12px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                      e.currentTarget.style.gap = '8px';
                    }}
                  >
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13.5,
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 0',
                      transition: 'color 0.2s ease, gap 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--gold)';
                      e.currentTarget.style.gap = '12px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                      e.currentTarget.style.gap = '8px';
                    }}
                  >
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flexShrink: 0, marginTop: 2, color: 'var(--gold)' }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  {CONTACT_INFO.address}
                </span>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flexShrink: 0, color: 'var(--gold)' }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44C2 2.18 3.04 2 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flexShrink: 0, color: 'var(--gold)' }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                  </svg>
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                    lineHeight: 1.4,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flexShrink: 0, color: 'var(--gold)', marginTop: 1 }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    {CONTACT_INFO.hours.weekdays}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                    {CONTACT_INFO.hours.sunday}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sub-footer ── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5, color: 'rgba(255,255,255,0.3)' }}>
            © {year} <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 600 }}>{COMPANY_NAME}</Link>. All Rights Reserved.
          </p>

          {/* License pill */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                color: 'var(--gold)',
                fontWeight: 500,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
              License: {LICENSE_NO}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner { padding: 80px 80px 48px; }
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.4fr; gap: 60px; }
        @media (max-width: 1200px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 48px !important; } }
        @media (max-width: 768px) { .footer-inner { padding: 60px 32px 36px !important; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr !important; } .footer-inner { padding: 48px 20px 28px !important; } }
      `}</style>
    </footer>
  );
};

export default Footer;
