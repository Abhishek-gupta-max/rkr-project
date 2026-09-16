import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../../../utils/constants';

/**
 * FloatingActions — Global floating contact buttons
 * Desktop: fixed right-side pill stack (WhatsApp / Call / Email)
 * Mobile: sticky bottom action bar
 */
export const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* Slide in after 3s */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const actions = [
    {
      id: 'wa',
      label: 'WhatsApp',
      shortLabel: 'Chat',
      href: `https://wa.me/${CONTACT_INFO.whatsApp}?text=Hello%2C%20I%20am%20interested%20in%20your%20recruitment%20services.`,
      bg: '#25D366',
      hoverBg: '#1EAD53',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      id: 'call',
      label: 'Call Us',
      shortLabel: 'Call',
      href: `tel:${CONTACT_INFO.phone}`,
      bg: 'var(--cobalt)',
      hoverBg: 'var(--cobalt-dark)',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44C2 2.18 3.04 2 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: 'email',
      label: 'Email Us',
      shortLabel: 'Email',
      href: `mailto:${CONTACT_INFO.email}`,
      bg: 'var(--slate)',
      hoverBg: '#0d1a35',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
          <rect x="2" y="4" width="20" height="16" rx="2"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ── Desktop Floating Pill Stack ── */}
      <div
        aria-label="Quick contact actions"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: `translateY(-50%) translateX(${visible ? '0' : '120px'})`,
          zIndex: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
        className="floating-actions-desktop"
      >
        {actions.map((a) => (
          <a
            key={a.id}
            href={a.href}
            target={a.id === 'wa' ? '_blank' : undefined}
            rel={a.id === 'wa' ? 'noopener noreferrer' : undefined}
            aria-label={a.label}
            title={a.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px 10px 14px',
              background: a.bg,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '24px 0 0 24px',
              fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              boxShadow: '-4px 4px 16px rgba(13,17,23,0.18)',
              transition: 'all 0.25s ease',
              transform: expanded ? 'translateX(0)' : 'translateX(52px)',
              minWidth: 130,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = a.hoverBg;
              e.currentTarget.style.transform = 'translateX(0)';
              setExpanded(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = a.bg;
            }}
          >
            <span style={{ flexShrink: 0 }}>{a.icon}</span>
            <span>{a.label}</span>
          </a>
        ))}
      </div>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 500,
          display: 'none',
          alignItems: 'center',
          gap: 8,
          background: 'var(--slate)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          borderRadius: 100,
          padding: '8px 16px',
          boxShadow: '0 8px 32px rgba(13,17,23,0.25)',
        }}
        className="floating-actions-mobile"
        aria-label="Mobile contact bar"
      >
        {actions.map((a) => (
          <a
            key={a.id}
            href={a.href}
            target={a.id === 'wa' ? '_blank' : undefined}
            rel={a.id === 'wa' ? 'noopener noreferrer' : undefined}
            aria-label={a.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 18px',
              background: a.bg,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 100,
              fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ display: 'flex' }}>{a.icon}</span>
            <span>{a.shortLabel}</span>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .floating-actions-desktop { display: none !important; }
          .floating-actions-mobile { display: flex !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-actions-desktop { transition: none !important; }
        }
      `}</style>
    </>
  );
};

export default FloatingActions;
