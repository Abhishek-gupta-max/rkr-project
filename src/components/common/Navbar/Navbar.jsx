import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, CONTACT_INFO } from '../../../utils/constants';
import { useLanguage } from '../../../context/LanguageContext';

export const Navbar = () => {
  const { language, setLanguage, t, languages, currentLanguageObj } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const langRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isRtl = currentLanguageObj.dir === 'rtl';

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

  /* ── Close dropdown & drawer on desktop resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Click Outside & Escape key handlers for language dropdown ── */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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

  const getNavLabel = (link) => {
    if (link.path === '/') return t('nav_home');
    if (link.path === '/about') return t('nav_about');
    if (link.path === '/services') return t('nav_services');
    if (link.path === '/process') return t('nav_process');
    if (link.path === '/requirements') return t('nav_requirements');
    if (link.path === '/contact-info' || link.path === '/contact') return t('nav_contact');
    return link.label;
  };

  const filteredLanguages = languages.filter(l =>
    l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.code.toLowerCase().includes(langSearch.toLowerCase())
  );

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
        <span style={{ color: 'var(--gold)', margin: isRtl ? '0 0 0 6px' : '0 6px 0 0' }}>●</span>
        {t('announcement')}
        <span style={{ margin: '0 12px', opacity: 0.3 }}>|</span>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
        >
          {CONTACT_INFO.phone}
        </a>
      </div>

      {/* ── Main Navigation Header (FIXED STICKY TOP: 0) ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: '1.5px solid var(--fog)',
          boxShadow: scrolled ? '0 4px 20px rgba(13,17,23,0.08)' : 'none',
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            gap: 16,
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
                    padding: '6px 12px',
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
                  {getNavLabel(link)}
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

          {/* ── RIGHT: Language Selector + CTA + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            
            {/* 🌐 SELECT LANGUAGE DROPDOWN */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                type="button"
                aria-label="Select Language"
                aria-expanded={langDropdownOpen}
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setLangSearch('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  background: 'var(--mist)',
                  border: '1.5px solid var(--fog)',
                  borderRadius: 8,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--slate)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; }}
                onMouseLeave={e => { if (!langDropdownOpen) e.currentTarget.style.borderColor = 'var(--fog)'; }}
              >
                <span style={{ fontSize: 14 }}>🌐</span>
                <span>{currentLanguageObj.label}</span>
                <span style={{ fontSize: 10, transition: 'transform 0.2s', transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
              </button>

              {/* Scrollable & Searchable Dropdown Menu */}
              {langDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: isRtl ? 'auto' : 0,
                    left: isRtl ? 0 : 'auto',
                    background: '#fff',
                    border: '1.5px solid var(--fog)',
                    borderRadius: 12,
                    boxShadow: '0 12px 36px rgba(13,17,23,0.15)',
                    padding: '8px',
                    width: 220,
                    maxWidth: '90vw',
                    zIndex: 1050,
                    animation: 'fadeIn 0.15s ease'
                  }}
                >
                  <div style={{ paddingBottom: 6, borderBottom: '1px solid var(--fog)', marginBottom: 6 }}>
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '1px solid var(--fog)',
                        borderRadius: 6,
                        fontSize: 12,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                    {filteredLanguages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          background: language === l.code ? 'rgba(29,78,216,0.08)' : 'transparent',
                          border: 'none',
                          borderRadius: 6,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: language === l.code ? 700 : 500,
                          color: language === l.code ? 'var(--cobalt)' : 'var(--slate)',
                          cursor: 'pointer',
                          textAlign: isRtl ? 'right' : 'left',
                          transition: 'background 0.15s',
                          marginBottom: 2
                        }}
                        onMouseEnter={e => { if (language !== l.code) e.currentTarget.style.background = 'var(--mist)'; }}
                        onMouseLeave={e => { if (language !== l.code) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </span>
                        {language === l.code && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--cobalt)' }}>✓</span>}
                      </button>
                    ))}
                    {filteredLanguages.length === 0 && (
                      <div style={{ padding: '12px', fontSize: 12, color: 'var(--steel)', textAlign: 'center' }}>
                        No language found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp quick contact */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
              }}
              title="WhatsApp"
              className="nav-whatsapp-btn"
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
                padding: '9px 18px',
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
            >
              {t('get_manpower')}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }}>
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
                width: 38,
                height: 38,
                border: '1.5px solid var(--fog)',
                borderRadius: 10,
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--slate)',
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
          right: isRtl ? 'auto' : 0,
          left: isRtl ? 0 : 'auto',
          bottom: 0,
          width: 320,
          maxWidth: '88vw',
          background: 'var(--ivory)',
          zIndex: 1001,
          transform: isOpen ? 'translateX(0)' : (isRtl ? 'translateX(-100%)' : 'translateX(100%)'),
          transition: 'transform 0.35s var(--ease-out, cubic-bezier(0.16,1,0.3,1))',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isRtl ? '20px 0 60px rgba(13,17,23,0.2)' : '-20px 0 60px rgba(13,17,23,0.2)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '18px 20px',
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
              width: 32,
              height: 32,
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

        {/* Mobile Language Selector Dropdown / Select Grid */}
        <div style={{ padding: '12px 16px', borderBottom: '1.5px solid var(--fog)', background: 'var(--mist)' }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--slate)', marginBottom: 8 }}>
            🌐 {t('select_language')}:
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1.5px solid var(--fog)',
              background: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--slate)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.label} ({l.nativeName})
              </option>
            ))}
          </select>
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
                  padding: '12px 16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14.5,
                  color: active ? 'var(--cobalt)' : 'var(--charcoal)',
                  background: active ? 'rgba(29,78,216,0.06)' : 'transparent',
                  marginBottom: 2,
                }}
              >
                {getNavLabel(link)}
                {active && (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }}>
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
            padding: '16px 20px',
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
              fontSize: 13.5,
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            {t('get_manpower')}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
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
