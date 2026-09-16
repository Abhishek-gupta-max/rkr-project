import React, { useState } from 'react';
import userService from '../../services/userService';
import { CONTACT_INFO, FAQS, LICENSE_NO, RA_NO } from '../../utils/constants';

/* ── Standard Professional Input Component ── */
const FormField = ({ id, label, type = 'text', required, placeholder, value, onChange, as: Tag = 'input', rows, children, disabled }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 12.5,
        fontWeight: 700,
        color: 'var(--slate)',
        letterSpacing: '0.02em',
      }}>
        {label}{required && <span style={{ color: 'var(--sienna)', marginLeft: 3 }}>*</span>}
      </label>
      {Tag === 'select' ? (
        <select id={id} required={required} value={value} onChange={onChange} disabled={disabled}
          style={{
            width: '100%', padding: '12px 14px', background: disabled ? 'var(--mist)' : '#fff',
            border: '1.5px solid var(--fog)', borderRadius: 8,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
            color: 'var(--slate)', outline: 'none', transition: 'border-color 0.2s ease', cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--fog)'; }}
        >{children}</select>
      ) : Tag === 'textarea' ? (
        <textarea id={id} required={required} rows={rows} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
          style={{
            width: '100%', padding: '12px 14px', background: disabled ? 'var(--mist)' : '#fff',
            border: '1.5px solid var(--fog)', borderRadius: 8,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
            color: 'var(--slate)', outline: 'none', transition: 'border-color 0.2s ease', resize: 'vertical',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--fog)'; }}
        />
      ) : (
        <input type={type} id={id} required={required} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
          style={{
            width: '100%', padding: '12px 14px', background: disabled ? 'var(--mist)' : '#fff',
            border: '1.5px solid var(--fog)', borderRadius: 8,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
            color: 'var(--slate)', outline: 'none', transition: 'border-color 0.2s ease',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--cobalt)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--fog)'; }}
        />
      )}
    </div>
  );
};

/* ─────────────────────── CONTACT PAGE ─────────────────────── */
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setStatus({ type: '', message: '' });

    // Client-side validation
    const name = formData.name.trim();
    const company = formData.company.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const requirement = formData.requirement.trim();
    const message = formData.message.trim();

    if (!name || !email || !phone || !requirement || !message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields marked with *.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: name,
        company_name: company,
        email: email,
        phone: phone,
        requirement_type: requirement,
        message: message,
      };

      const res = await userService.submitContactForm(payload);

      if (res?.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your enquiry has been submitted successfully. We will contact you shortly.'
        });
        setFormData({ name: '', company: '', email: '', phone: '', requirement: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: res?.error || 'Unable to submit your enquiry right now. Please try again.'
        });
      }
    } catch (err) {
      console.error('[Enquiry Submit Error]:', err);
      const serverErrMsg = err?.response?.data?.error;
      setStatus({
        type: 'error',
        message: serverErrMsg || 'Unable to submit your enquiry right now. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── EDITORIAL HERO ── */}
      <section style={{ background: 'var(--slate)', padding: '72px 60px 64px', color: '#fff' }} className="contact-hero">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              DIRECT CONTACT
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            LET'S BUILD YOUR WORKFORCE.
          </h1>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15.5, color: 'rgba(255,255,255,0.7)', maxWidth: 540, lineHeight: 1.7 }}>
            Connect with our recruitment specialists in Buxar, Bihar. Whether you need technical trade teams or overseas employment guidance, we are ready to assist.
          </p>
        </div>
        <style>{`
          .contact-hero { padding: 72px 60px 64px; }
          @media (max-width: 1024px) { .contact-hero { padding: 56px 32px 48px !important; } }
          @media (max-width: 640px) { .contact-hero { padding: 40px 20px 36px !important; } }
        `}</style>
      </section>

      {/* ── MAIN LAYOUT — SPLIT ── */}
      <section style={{ padding: '80px 60px', background: 'var(--cream)' }} className="contact-main">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64 }} className="contact-grid">

          {/* LEFT: Verified Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--slate)', marginBottom: 12 }}>
                RKR GLOBALPATH HR MANPOWER
              </h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: 'var(--steel)', lineHeight: 1.6 }}>
                Licensed Overseas Employment & Manpower Recruitment Agency, Government of India.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10.5, fontWeight: 700, color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                  REGISTERED OFFICE ADDRESS
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: 'var(--slate)', lineHeight: 1.6 }}>
                  {CONTACT_INFO.address}
                </div>
              </div>

              <div style={{ background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10.5, fontWeight: 700, color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                  DIRECT PHONE & WHATSAPP
                </div>
                <a href={`tel:${CONTACT_INFO.phone}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--cobalt)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                  {CONTACT_INFO.phone}
                </a>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: 'var(--steel)' }}>
                  Mon–Sat: 9:00 AM – 7:00 PM IST
                </div>
              </div>

              <div style={{ background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10.5, fontWeight: 700, color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                  OFFICIAL EMAIL
                </div>
                <a href={`mailto:${CONTACT_INFO.email}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--slate)', textDecoration: 'none', wordBreak: 'break-all' }}>
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10.5, fontWeight: 700, color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                  GOVERNMENT LICENSING CREDENTIALS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--slate)' }}>
                    <strong>License No:</strong> {LICENSE_NO}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--slate)' }}>
                    <strong>Reg No:</strong> {RA_NO}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Business Enquiry Form */}
          <div style={{ background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 16, padding: '40px 36px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--slate)', marginBottom: 8 }}>
              Business Enquiry Form
            </h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: 'var(--steel)', marginBottom: 28 }}>
              Please complete all required fields. We respond to employer and candidate enquiries promptly.
            </p>

            {status.message && (
              <div style={{
                padding: '14px 18px', marginBottom: 24, borderRadius: 8,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, fontWeight: 600,
                background: status.type === 'success' ? '#F0FDF4' : '#FEF2F2',
                color: status.type === 'success' ? '#166534' : '#991B1B',
                border: `1.5px solid ${status.type === 'success' ? '#BBF7D0' : '#FECACA'}`,
              }}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <FormField id="name" label="Full Name" required placeholder="e.g. Rajesh Kumar" value={formData.name} onChange={handleChange} disabled={loading} />
                <FormField id="company" label="Company Name" placeholder="e.g. Gulf Contracting Co." value={formData.company} onChange={handleChange} disabled={loading} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <FormField id="email" label="Email Address" type="email" required placeholder="name@company.com" value={formData.email} onChange={handleChange} disabled={loading} />
                <FormField id="phone" label="Phone / WhatsApp" type="tel" required placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} disabled={loading} />
              </div>

              <FormField id="requirement" label="Requirement Type" as="select" required value={formData.requirement} onChange={handleChange} disabled={loading}>
                <option value="">Select your enquiry type...</option>
                <option value="Overseas Manpower Sourcing (Employer)">Overseas Manpower Sourcing (Employer)</option>
                <option value="Skilled Technical Trades">Skilled Technical Trades</option>
                <option value="Semi-Skilled Workforce">Semi-Skilled Workforce</option>
                <option value="Unskilled Site Labourers">Unskilled Site Labourers</option>
                <option value="Visa & Emigration Services">Visa & Emigration Services</option>
                <option value="Medical & Attestation Support">Medical & Attestation Support</option>
                <option value="Overseas Candidate Opportunity">Overseas Candidate Opportunity (Candidate)</option>
                <option value="General Corporate Enquiry">General Corporate Enquiry</option>
              </FormField>

              <FormField id="message" label="Message & Requirements" as="textarea" required rows={4} placeholder="Provide details regarding trade skills, estimated candidate volume, destination country, or general enquiry..." value={formData.message} onChange={handleChange} disabled={loading} />

              <button type="submit" disabled={loading}
                style={{
                  padding: '14px 24px', background: loading ? 'var(--steel)' : 'var(--cobalt)', color: '#fff',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14,
                  borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s ease', marginTop: 8,
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--cobalt-dark)'; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--cobalt)'; }}
              >
                {loading ? 'Submitting...' : 'Submit Requirement'}
              </button>
            </form>
          </div>
        </div>

        <style>{`
          .contact-main { padding: 80px 60px; }
          .contact-grid { grid-template-columns: 5fr 7fr; gap: 64px; }
          .form-row { grid-template-columns: 1fr 1fr; }
          @media (max-width: 1024px) { .contact-main { padding: 64px 32px !important; } .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
          @media (max-width: 640px) { .contact-main { padding: 48px 20px !important; } .form-row { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── FAQ ACCORDION ── */}
      {FAQS && FAQS.length > 0 && (
        <section style={{ background: 'var(--ivory)', padding: '72px 60px', borderTop: '1.5px solid var(--fog)' }} className="contact-faq">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--slate)', marginBottom: 28, textAlign: 'center' }}>
              Frequently Asked Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQS.map((faq, idx) => (
                <div key={idx} style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{ width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--slate)', textAlign: 'left' }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ fontSize: 18, fontWeight: 400, color: 'var(--steel)' }}>{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 20px 16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: 'var(--steel)', lineHeight: 1.6, borderTop: '1px solid var(--fog)' }}>
                      <div style={{ paddingTop: 12 }}>{faq.answer}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            .contact-faq { padding: 72px 60px; }
            @media (max-width: 640px) { .contact-faq { padding: 48px 20px !important; } }
          `}</style>
        </section>
      )}
    </div>
  );
};

export default Contact;
