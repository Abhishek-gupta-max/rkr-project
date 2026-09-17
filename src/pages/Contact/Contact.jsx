import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userService';
import { CONTACT_INFO, FAQS, LICENSE_NO, RA_NO } from '../../utils/constants';
import { validateEmail, validateFileSize, validateFileType } from '../../utils/validators';
import { useLanguage } from '../../context/LanguageContext';

const COUNTRY_CODES = [
  { code: '+91', country: 'India (+91)' },
  { code: '+971', country: 'UAE (+971)' },
  { code: '+966', country: 'Saudi Arabia (+966)' },
  { code: '+974', country: 'Qatar (+974)' },
  { code: '+968', country: 'Oman (+968)' },
  { code: '+965', country: 'Kuwait (+965)' },
  { code: '+973', country: 'Bahrain (+973)' },
  { code: '+94', country: 'Sri Lanka (+94)' },
  { code: '+7', country: 'Russia (+7)' },
  { code: '+1', country: 'USA/Canada (+1)' },
  { code: '+44', country: 'UK (+44)' },
];

const SKILL_CATEGORIES_LIST = [
  'Civil Engineers', 'Electrical Engineers', 'Mechanical Engineers',
  'Welders (3G / 6G / TIG / MIG)', 'Pipefitters & Fabricators', 'Electricians (Industrial & Commercial)',
  'Plumbers & Pipe Mechanics', 'Masons & Bricklayers', 'Steel Fixers & Bar Benders',
  'Heavy Equipment Operators', 'Scaffolders & Riggers', 'Carpenters (Shuttering & Furniture)',
  'HVAC Technicians', 'Auto Mechanics & Technicians', 'Industrial Painters', 'Safety Officers',
  'Security Guards & Officers', 'Factory Line Operators', 'Machine Mechanics Helpers',
  'Cooks & Kitchen Specialists', 'Forklift Operators', 'Warehouse Staff',
  'Light Vehicle Drivers', 'Housekeeping Supervisors', 'Electrician Assistants',
  'Plumbing Helpers', 'AC Technician Helpers', 'Painter Assistants',
  'General Site Labourers', 'Cleaners & Janitors', 'Agricultural Workers',
  'Packers & Cargo Handlers', 'Loading & Unloading Staff', 'Domestic Support Staff',
  'Facility Maintenance Helpers', 'Office Assistants', 'Watchmen & Groundskeepers',
  'Sanitation Workers', 'Fleet Washers', 'Kitchen Stewards'
];

const PRIMARY_SKILL_MAP = {
  'Civil Engineers': ['Site Engineer', 'Civil Supervisor', 'Quantity Surveyor', 'Structural Engineer', 'QA/QC Civil', 'Planning Engineer', 'Other'],
  'Electrical Engineers': ['Electrical Supervisor', 'Power & Distribution Engineer', 'HV/LV Electrician', 'Control & Instrumentation', 'QA/QC Electrical', 'Other'],
  'Mechanical Engineers': ['HVAC Mechanical Engineer', 'Piping Engineer', 'Maintenance Engineer', 'Plant Mechanical Technician', 'QA/QC Mechanical', 'Other'],
  'Welders (3G / 6G / TIG / MIG)': ['3G Welder', '6G Welder', 'TIG Welder', 'MIG Welder', 'Structural Welder', 'Pipe Welder', 'Other'],
  'Electricians (Industrial & Commercial)': ['Industrial Electrician', 'Commercial Electrician', 'Cable Jointer', 'Panel Board Assembler', 'Lineman', 'Other'],
  'Plumbers & Pipe Mechanics': ['Pipefitter', 'Plumber Mechanic', 'Sanitation Plumber', 'Firefighting Piping Technician', 'Other'],
  'Masons & Bricklayers': ['Block Mason', 'Tile Mason', 'Plaster Mason', 'Bricklayer', 'Marble Mason', 'Other'],
  'Steel Fixers & Bar Benders': ['Steel Fixer Foreman', 'Rebar Fabricator', 'Bar Bender Specialist', 'Other'],
  'Heavy Equipment Operators': ['Excavator Operator', 'Crane Operator', 'Bulldozer Operator', 'Forklift Driver', 'JCB Operator', 'Other'],
  'Scaffolders & Riggers': ['Certified Scaffolder', 'Heavy Rigger', 'Rigging Supervisor', 'Scaffold Inspector', 'Other'],
  'Carpenters (Shuttering & Furniture)': ['Shuttering Carpenter', 'Furniture Carpenter', 'Finishing Carpenter', 'Other'],
  'HVAC Technicians': ['AC Chillers Specialist', 'Duct Fabricator & Installer', 'HVAC Maintenance Tech', 'Refrigeration Tech', 'Other'],
  'Auto Mechanics & Technicians': ['Heavy Diesel Mechanic', 'Auto Electrician', 'Light Vehicle Mechanic', 'Hydraulic Technician', 'Other'],
  'Industrial Painters': ['Spray Painter', 'Sandblaster', 'Coating Inspector', 'Wall & Building Painter', 'Other'],
  'Safety Officers': ['NEBOSH Safety Officer', 'HSE Supervisor', 'Site Safety Inspector', 'Fire Safety Specialist', 'Other']
};

const EXPERIENCE_OPTIONS = [
  'Fresher',
  'Less than 1 Year',
  '1–2 Years',
  '2–5 Years',
  '5–10 Years',
  '10+ Years'
];

const PREFERRED_COUNTRIES = [
  'UAE / Dubai', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'Sri Lanka', 'Russia', 'Other International Markets'
];

/* ─────────────────────── CONTACT PAGE ─────────────────────── */
export const Contact = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const cvInputRef = useRef(null);
  const passportInputRef = useRef(null);
  const expCertInputRef = useRef(null);
  const otherDocInputRef = useRef(null);

  // State for Job Application Form
  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    date_of_birth: '',
    gender: 'Male',
    mobile_code: '+91',
    mobile_number: '',
    whatsapp_code: '+91',
    whatsapp_number: '',
    email: '',
    current_city: '',
    current_country: 'India',
    trade_category: 'Civil Engineers',
    total_experience: '2–5 Years',
    relevant_experience: '',
    current_job_title: '',
    previous_company: '',
    preferred_country: 'UAE / Dubai',
    expected_salary: '',
    primary_skill: '',
    additional_skills: '',
    certifications: '',
    passport_number: '',
    passport_expiry: '',
    message: '',
    consent: false
  });

  const [cvFile, setCvFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [expCertFile, setExpCertFile] = useState(null);
  const [otherDocFile, setOtherDocFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Auto populate trade from URL or React router location state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tradeFromUrl = params.get('trade');
    const tradeFromState = location.state?.tradeCategory || location.state?.jobPosition;

    const selectedTrade = tradeFromUrl || tradeFromState;
    if (selectedTrade) {
      setFormData((prev) => ({
        ...prev,
        trade_category: selectedTrade
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const key = name || id;
    setFormData((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e, setFile, label) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFileSize(file, 5)) {
        setStatus({ type: 'error', message: `${label} file size must be less than 5MB!` });
        return;
      }
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      if (!validateFileType(file, allowedExtensions)) {
        setStatus({ type: 'error', message: `${label} must be a PDF, DOC, DOCX, JPG, JPEG, or PNG file!` });
        return;
      }
      setFile(file);
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setStatus({ type: '', message: '' });

    // Validations
    if (!formData.full_name.trim()) {
      setStatus({ type: 'error', message: `${t('full_name')} is required!` });
      return;
    }
    if (!formData.mobile_number.trim()) {
      setStatus({ type: 'error', message: `${t('mobile_number')} is required!` });
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      setStatus({ type: 'error', message: `Please enter a valid ${t('email_address')}.` });
      return;
    }
    if (!formData.trade_category) {
      setStatus({ type: 'error', message: `Please select a Trade / Skill.` });
      return;
    }
    if (!formData.total_experience) {
      setStatus({ type: 'error', message: `Please select your ${t('total_experience')}.` });
      return;
    }
    if (!formData.preferred_country) {
      setStatus({ type: 'error', message: `Please select a ${t('preferred_country')}.` });
      return;
    }
    if (!formData.passport_number.trim()) {
      setStatus({ type: 'error', message: `${t('passport_number')} is required!` });
      return;
    }
    if (!formData.passport_expiry) {
      setStatus({ type: 'error', message: `${t('passport_expiry')} is required!` });
      return;
    }
    if (!cvFile) {
      setStatus({ type: 'error', message: `Please ${t('upload_cv')}!` });
      return;
    }
    if (!formData.consent) {
      setStatus({ type: 'error', message: 'You must check the declaration box to submit.' });
      return;
    }

    setLoading(true);

    try {
      const fullMobile = `${formData.mobile_code} ${formData.mobile_number.trim()}`;
      const fullWhatsapp = formData.whatsapp_number.trim() ? `${formData.whatsapp_code} ${formData.whatsapp_number.trim()}` : '';

      const submitData = new FormData();
      submitData.append('full_name', formData.full_name.trim());
      submitData.append('father_name', formData.father_name.trim());
      submitData.append('date_of_birth', formData.date_of_birth);
      submitData.append('gender', formData.gender);
      submitData.append('mobile_number', fullMobile);
      submitData.append('whatsapp_number', fullWhatsapp);
      submitData.append('email', formData.email.trim());
      submitData.append('current_city', formData.current_city.trim());
      submitData.append('current_country', formData.current_country.trim());
      submitData.append('trade_category', formData.trade_category);
      submitData.append('total_experience', formData.total_experience);
      submitData.append('relevant_experience', formData.relevant_experience.trim());
      submitData.append('current_job_title', formData.current_job_title.trim());
      submitData.append('previous_company', formData.previous_company.trim());
      submitData.append('preferred_country', formData.preferred_country);
      submitData.append('expected_salary', formData.expected_salary.trim());
      submitData.append('primary_skill', formData.primary_skill || formData.trade_category);
      submitData.append('additional_skills', formData.additional_skills.trim());
      submitData.append('certifications', formData.certifications.trim());
      submitData.append('passport_number', formData.passport_number.trim());
      submitData.append('passport_expiry', formData.passport_expiry);
      submitData.append('message', formData.message.trim());

      submitData.append('cv_document', cvFile);
      if (passportFile) submitData.append('passport_document', passportFile);
      if (expCertFile) submitData.append('experience_certificate', expCertFile);
      if (otherDocFile) submitData.append('other_documents', otherDocFile);

      const res = await userService.submitApplication(submitData);

      if (res?.success) {
        setSubmittedData({
          application_id: res.application_id,
          full_name: formData.full_name,
          trade_category: formData.trade_category,
          mobile_number: fullMobile,
          submitted_at: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      } else {
        setStatus({
          type: 'error',
          message: res?.error || res?.message || 'Unable to submit your application. Please try again.'
        });
      }
    } catch (err) {
      console.error('[Job Application Submit Error]:', err);
      const serverErrMsg = err?.response?.data?.error;
      setStatus({
        type: 'error',
        message: serverErrMsg || 'Unable to submit your application right now. Please check network connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  const primarySkillOptions = PRIMARY_SKILL_MAP[formData.trade_category] || ['Skilled Specialist', 'Trade Technician', 'Supervisor', 'Assistant / Helper', 'Other'];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── EDITORIAL HERO ── */}
      <section style={{ background: 'var(--slate)', padding: '72px 60px 64px', color: '#fff' }} className="contact-hero">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              INTERNATIONAL RECRUITMENT PORTAL
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            {t('apply_for_job')}
          </h1>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15.5, color: 'rgba(255,255,255,0.7)', maxWidth: 640, lineHeight: 1.7 }}>
            {t('apply_subtitle')}
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

          {/* LEFT: Verified Information & License Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--slate)', marginBottom: 12 }}>
                RKR GLOBALPATH HR MANPOWER
              </h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: 'var(--steel)', lineHeight: 1.6 }}>
                Authorized & MEA-Licensed Overseas Recruitment Agency, Ministry of External Affairs, Govt of India.
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
                  OFFICIAL RECRUITMENT EMAIL
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

          {/* RIGHT: JOB APPLICATION FORM */}
          <div style={{ background: 'var(--ivory)', border: '1.5px solid var(--fog)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            
            {/* SUCCESS STATE */}
            {submittedData ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }} className="animate-fade-in">
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--slate)', marginBottom: 10 }}>
                  {t('app_success_title')}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: 'var(--steel)', lineHeight: 1.6, marginBottom: 24 }}>
                  {t('app_success_desc')}
                </p>

                <div style={{ background: 'var(--mist)', border: '1.5px dashed var(--cobalt)', borderRadius: 12, padding: '20px', marginBottom: 28, textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    {t('app_id')}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: 'var(--cobalt)', marginBottom: 12 }}>
                    {submittedData.application_id}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--charcoal)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div><strong>{t('full_name')}:</strong> {submittedData.full_name}</div>
                    <div><strong>{t('selected_trade')}:</strong> {submittedData.trade_category}</div>
                    <div><strong>{t('mobile_number')}:</strong> {submittedData.mobile_number}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/" style={{ padding: '12px 22px', background: 'var(--slate)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 8, textDecoration: 'none' }}>
                    {t('back_to_skills')}
                  </Link>
                  <button onClick={() => { setSubmittedData(null); setCvFile(null); setPassportFile(null); setExpCertFile(null); setOtherDocFile(null); }} style={{ padding: '12px 22px', background: 'transparent', border: '1.5px solid var(--slate)', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 8, cursor: 'pointer' }}>
                    {t('submit_another')}
                  </button>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <div>
                
                {/* Header Strip */}
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1.5px solid var(--fog)' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>
                    {t('apply_for_job')}
                  </h3>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'var(--steel)', margin: '4px 0 0 0' }}>
                    {t('apply_subtitle')}
                  </p>
                </div>

                {/* Selected Trade Card Banner */}
                <div style={{ background: 'rgba(201,168,76,0.1)', border: '1.5px solid var(--gold)', borderRadius: 10, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {t('selected_trade')}
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--slate)', marginTop: 2 }}>
                      {formData.trade_category}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--cobalt)', background: '#fff', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--fog)' }}>
                    Auto-selected
                  </span>
                </div>

                {/* Status alert */}
                {status.message && (
                  <div style={{
                    padding: '12px 16px', marginBottom: 20, borderRadius: 8,
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600,
                    background: status.type === 'success' ? '#F0FDF4' : '#FEF2F2',
                    color: status.type === 'success' ? '#166534' : '#991B1B',
                    border: `1.5px solid ${status.type === 'success' ? '#BBF7D0' : '#FECACA'}`,
                  }}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  
                  {/* ═══════════════════════════════
                      1. PERSONAL INFORMATION
                  ═══════════════════════════════ */}
                  <div>
                    <h4 style={sectionHeaderStyle}>{t('personal_info')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('full_name')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="e.g. Rajesh Kumar" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('father_name')}</label>
                          <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father's Name" style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('dob')}</label>
                          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('gender')}</label>
                          <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle} disabled={loading}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        {/* Mobile with country code */}
                        <div>
                          <label style={labelStyle}>{t('mobile_number')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <select name="mobile_code" value={formData.mobile_code} onChange={handleChange} style={{ ...inputStyle, width: '110px', flexShrink: 0, padding: '10px 6px' }} disabled={loading}>
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>{c.code}</option>
                              ))}
                            </select>
                            <input type="tel" name="mobile_number" required value={formData.mobile_number} onChange={handleChange} placeholder="9876543210" style={{ ...inputStyle, flexGrow: 1 }} disabled={loading} />
                          </div>
                        </div>

                        {/* WhatsApp with country code */}
                        <div>
                          <label style={labelStyle}>{t('whatsapp_number')}</label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <select name="whatsapp_code" value={formData.whatsapp_code} onChange={handleChange} style={{ ...inputStyle, width: '110px', flexShrink: 0, padding: '10px 6px' }} disabled={loading}>
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>{c.code}</option>
                              ))}
                            </select>
                            <input type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder="9876543210" style={{ ...inputStyle, flexGrow: 1 }} disabled={loading} />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }} className="form-row-3">
                        <div>
                          <label style={labelStyle}>{t('email_address')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@example.com" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('current_city')}</label>
                          <input type="text" name="current_city" value={formData.current_city} onChange={handleChange} placeholder="e.g. Patna / Delhi" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('current_country')}</label>
                          <input type="text" name="current_country" value={formData.current_country} onChange={handleChange} placeholder="India" style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* ═══════════════════════════════
                      2. PROFESSIONAL INFORMATION
                  ═══════════════════════════════ */}
                  <div>
                    <h4 style={sectionHeaderStyle}>{t('professional_info')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('selected_trade')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <select name="trade_category" required value={formData.trade_category} onChange={handleChange} style={{ ...inputStyle, fontWeight: 700 }} disabled={loading}>
                            {SKILL_CATEGORIES_LIST.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>{t('total_experience')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <select name="total_experience" required value={formData.total_experience} onChange={handleChange} style={inputStyle} disabled={loading}>
                            {EXPERIENCE_OPTIONS.map((exp, idx) => (
                              <option key={idx} value={exp}>{exp}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('relevant_experience')}</label>
                          <input type="text" name="relevant_experience" value={formData.relevant_experience} onChange={handleChange} placeholder="e.g. 3 Years Gulf Experience" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('current_job_title')}</label>
                          <input type="text" name="current_job_title" value={formData.current_job_title} onChange={handleChange} placeholder="e.g. Site Engineer / Welder" style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }} className="form-row-3">
                        <div>
                          <label style={labelStyle}>{t('previous_company')}</label>
                          <input type="text" name="previous_company" value={formData.previous_company} onChange={handleChange} placeholder="Previous Company Name" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('preferred_country')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <select name="preferred_country" required value={formData.preferred_country} onChange={handleChange} style={inputStyle} disabled={loading}>
                            {PREFERRED_COUNTRIES.map((c, idx) => (
                              <option key={idx} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>{t('expected_salary')}</label>
                          <input type="text" name="expected_salary" value={formData.expected_salary} onChange={handleChange} placeholder="e.g. 3000 SAR / 2500 AED" style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* ═══════════════════════════════
                      3. SKILLS & CERTIFICATIONS
                  ═══════════════════════════════ */}
                  <div>
                    <h4 style={sectionHeaderStyle}>{t('skills_certifications')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('primary_skill')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <select name="primary_skill" value={formData.primary_skill} onChange={handleChange} style={inputStyle} disabled={loading}>
                            <option value="">Select primary skill specialization...</option>
                            {primarySkillOptions.map((sk, idx) => (
                              <option key={idx} value={sk}>{sk}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>{t('additional_skills')}</label>
                          <input type="text" name="additional_skills" value={formData.additional_skills} onChange={handleChange} placeholder="e.g. Blueprint Reading, Pipefitting" style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>{t('certifications')}</label>
                        <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="e.g. ITI Certified, IOSH, AWS Welder Certificate" style={inputStyle} disabled={loading} />
                      </div>

                    </div>
                  </div>

                  {/* ═══════════════════════════════
                      4. DOCUMENTS
                  ═══════════════════════════════ */}
                  <div>
                    <h4 style={sectionHeaderStyle}>{t('documents')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                        <div>
                          <label style={labelStyle}>{t('passport_number')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <input type="text" name="passport_number" required value={formData.passport_number} onChange={handleChange} placeholder="e.g. Z1234567" style={inputStyle} disabled={loading} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('passport_expiry')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <input type="date" name="passport_expiry" required value={formData.passport_expiry} onChange={handleChange} style={inputStyle} disabled={loading} />
                        </div>
                      </div>

                      {/* File Upload Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-row">
                        
                        {/* CV / Resume */}
                        <div style={uploadBoxStyle}>
                          <label style={labelStyle}>{t('upload_cv')} <span style={{ color: 'var(--sienna)' }}>*</span></label>
                          <input type="file" ref={cvInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setCvFile, 'CV / Resume')} />
                          <button type="button" onClick={() => cvInputRef.current.click()} style={uploadBtnStyle} disabled={loading}>
                            📄 {cvFile ? cvFile.name : 'Choose CV / Resume (PDF/DOCX/JPG)'}
                          </button>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--steel)' }}>
                            <span>{cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, DOC, DOCX, JPG (Max 5MB)'}</span>
                            {cvFile && <span onClick={() => setCvFile(null)} style={{ color: 'var(--sienna)', cursor: 'pointer', fontWeight: 700 }}>Remove</span>}
                          </div>
                        </div>

                        {/* Passport Doc */}
                        <div style={uploadBoxStyle}>
                          <label style={labelStyle}>{t('upload_passport')}</label>
                          <input type="file" ref={passportInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setPassportFile, 'Passport Document')} />
                          <button type="button" onClick={() => passportInputRef.current.click()} style={uploadBtnStyle} disabled={loading}>
                            Passport File
                          </button>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--steel)' }}>
                            <span>{passportFile ? `${(passportFile.size / 1024 / 1024).toFixed(2)} MB` : 'Front & Back Copy'}</span>
                            {passportFile && <span onClick={() => setPassportFile(null)} style={{ color: 'var(--sienna)', cursor: 'pointer', fontWeight: 700 }}>Remove</span>}
                          </div>
                        </div>

                        {/* Experience Cert */}
                        <div style={uploadBoxStyle}>
                          <label style={labelStyle}>{t('upload_experience')}</label>
                          <input type="file" ref={expCertInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setExpCertFile, 'Experience Certificate')} />
                          <button type="button" onClick={() => expCertInputRef.current.click()} style={uploadBtnStyle} disabled={loading}>
                            Experience Cert
                          </button>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--steel)' }}>
                            <span>{expCertFile ? `${(expCertFile.size / 1024 / 1024).toFixed(2)} MB` : 'Service letters'}</span>
                            {expCertFile && <span onClick={() => setExpCertFile(null)} style={{ color: 'var(--sienna)', cursor: 'pointer', fontWeight: 700 }}>Remove</span>}
                          </div>
                        </div>

                        {/* Other Documents */}
                        <div style={uploadBoxStyle}>
                          <label style={labelStyle}>{t('upload_other')}</label>
                          <input type="file" ref={otherDocInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setOtherDocFile, 'Other Document')} />
                          <button type="button" onClick={() => otherDocInputRef.current.click()} style={uploadBtnStyle} disabled={loading}>
                            Other Document
                          </button>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--steel)' }}>
                            <span>{otherDocFile ? `${(otherDocFile.size / 1024 / 1024).toFixed(2)} MB` : 'Trade Cert, License'}</span>
                            {otherDocFile && <span onClick={() => setOtherDocFile(null)} style={{ color: 'var(--sienna)', cursor: 'pointer', fontWeight: 700 }}>Remove</span>}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* ═══════════════════════════════
                      5. ADDITIONAL INFORMATION
                  ═══════════════════════════════ */}
                  <div>
                    <h4 style={sectionHeaderStyle}>{t('additional_info')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      
                      <div>
                        <label style={labelStyle}>{t('message_placeholder')}</label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder={t('message_placeholder')}
                          value={formData.message}
                          onChange={handleChange}
                          disabled={loading}
                          style={{ ...inputStyle, resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          name="consent"
                          id="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          disabled={loading}
                          style={{ marginTop: 3, width: 16, height: 16, cursor: 'pointer' }}
                        />
                        <label htmlFor="consent" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5, color: 'var(--slate)', cursor: 'pointer', lineHeight: 1.5 }}>
                          {t('declaration')} <span style={{ color: 'var(--sienna)' }}>*</span>
                        </label>
                      </div>

                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '14px 24px',
                      background: loading ? 'var(--steel)' : 'var(--cobalt)',
                      color: '#fff',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 8,
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      marginTop: 8,
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--cobalt-dark)'; }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--cobalt)'; }}
                  >
                    {loading ? t('submitting') : t('submit_application')}
                  </button>

                </form>
              </div>
            )}

          </div>
        </div>

        <style>{`
          .contact-main { padding: 80px 60px; }
          .contact-grid { grid-template-columns: 5fr 7fr; gap: 64px; }
          .form-row { grid-template-columns: 1fr 1fr; }
          .form-row-3 { grid-template-columns: 1fr 1fr 1fr; }
          @media (max-width: 1024px) {
            .contact-main { padding: 64px 32px !important; }
            .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
          @media (max-width: 640px) {
            .contact-main { padding: 48px 20px !important; }
            .form-row { grid-template-columns: 1fr !important; }
            .form-row-3 { grid-template-columns: 1fr !important; }
          }
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

const sectionHeaderStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 16,
  fontWeight: 700,
  color: 'var(--cobalt)',
  paddingBottom: 6,
  borderBottom: '1.5px solid var(--fog)',
  marginBottom: 12
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--slate)',
  marginBottom: 4,
  letterSpacing: '0.02em',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  background: '#fff',
  border: '1.5px solid var(--fog)',
  borderRadius: 8,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 13.5,
  color: 'var(--slate)',
  outline: 'none',
  boxSizing: 'border-box'
};

const uploadBoxStyle = {
  background: 'var(--mist)',
  border: '1.5px solid var(--fog)',
  borderRadius: 8,
  padding: '12px',
  boxSizing: 'border-box'
};

const uploadBtnStyle = {
  width: '100%',
  padding: '8px 12px',
  background: '#fff',
  border: '1.5px dashed var(--cobalt)',
  borderRadius: 6,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 12.5,
  fontWeight: 600,
  color: 'var(--cobalt)',
  cursor: 'pointer',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default Contact;
