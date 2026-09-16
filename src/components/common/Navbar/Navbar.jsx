import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, CONTACT_INFO } from '../../../utils/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* ── Scroll detection for frosted glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile drawer on route change ── */
  useEffect(() => { setIsOpen(false); }, [location]);

  /* ── Body scroll lock for mobile drawer ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Close on desktop resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Smart anchor/route click handler ── */
  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const anchor = path.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      } else {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ── Top Announcement Bar ── */}
      <div
        style={{
          background: 'var(--slate)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: '11.5px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '7px 24px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span style={{ color: 'var(--gold)', marginRight: 6 }}>●</span>
        MEA Licensed Recruitment Agency · Buxar, Bihar · Mon–Sat 9AM–6PM
        <span style={{ margin: '0 12px', opacity: 0.3 }}>|</span>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
        >
          {CONTACT_INFO.phone}
        </a>
      </div>

      {/* ── Main Navigation ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1.5px solid var(--fog)' : '1.5px solid var(--fog)',
          boxShadow: scrolled ? '0 4px 20px rgba(13,17,23,0.08)' : 'none',
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            gap: 24,
          }}
        >
          {/* ── LEFT: Logo ── */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <img
              src="/images/logo.jpeg"
              alt="RKR Globalpath HR Manpower"
              style={{ height: 44, width: 'auto', objectFit: 'contain', borderRadius: 4 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: 'var(--slate)',
                  letterSpacing: '-0.01em',
                }}
              >
                RKR GLOBALPATH
              </span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 9.5,
                  color: 'var(--gold-dim)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                HR MANPOWER
              </span>
            </div>
          </Link>

          {/* ── CENTER: Desktop Nav Links ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flex: 1,
              justifyContent: 'center',
            }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: active ? 'var(--cobalt)' : 'var(--charcoal)',
                    padding: '6px 14px',
                    borderRadius: 8,
                    position: 'relative',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                    background: active ? 'rgba(29,78,216,0.06)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--cobalt)';
                      e.currentTarget.style.background = 'rgba(29,78,216,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--charcoal)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20,
                        height: 2.5,
                        borderRadius: 2,
                        background: 'var(--cobalt)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: CTA + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* WhatsApp quick contact */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
              }}
              title="WhatsApp"
              className="nav-whatsapp-btn"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,211,102,0.3)';
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            {/* Get Manpower CTA */}
            <Link
              to="/contact-info"
              id="nav-get-manpower"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 20px',
                background: 'var(--cobalt)',
                color: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 10,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 14px rgba(29,78,216,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--cobalt-dark)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(29,78,216,0.40)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--cobalt)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(29,78,216,0.3)';
              }}
            >
              Get Manpower
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                border: '1.5px solid var(--fog)',
                borderRadius: 10,
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--slate)',
                transition: 'border-color 0.2s',
              }}
              className="nav-hamburger"
            >
              {isOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4 7h16M4 12h16M4 17h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer Backdrop ── */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13,17,23,0.55)',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ── Mobile Drawer Panel ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 320,
          maxWidth: '88vw',
          background: 'var(--ivory)',
          zIndex: 1001,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s var(--ease-out, cubic-bezier(0.16,1,0.3,1))',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(13,17,23,0.2)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1.5px solid var(--fog)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/images/logo.jpeg" alt="Logo" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: 'var(--slate)', lineHeight: 1.1 }}>
                RKR GLOBALPATH
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 9, color: 'var(--gold-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                HR MANPOWER
              </div>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'var(--mist)',
              border: 'none',
              borderRadius: 8,
              width: 34,
              height: 34,
              cursor: 'pointer',
              color: 'var(--charcoal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px' }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: active ? 'var(--cobalt)' : 'var(--charcoal)',
                  background: active ? 'rgba(29,78,216,0.06)' : 'transparent',
                  marginBottom: 2,
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {link.label}
                {active && (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1.5px solid var(--fog)',
            background: 'var(--mist)',
          }}
        >
          <Link
            to="/contact-info"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px',
              background: 'var(--cobalt)',
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 10,
              textDecoration: 'none',
              marginBottom: 12,
            }}
          >
            Get Manpower
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <div style={{ fontSize: 12, color: 'var(--steel)', textAlign: 'center' }}>
            <div>📞 <a href={`tel:${CONTACT_INFO.phone}`} style={{ color: 'var(--slate)', textDecoration: 'none', fontWeight: 600 }}>{CONTACT_INFO.phone}</a></div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 768px) {
          .nav-whatsapp-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
