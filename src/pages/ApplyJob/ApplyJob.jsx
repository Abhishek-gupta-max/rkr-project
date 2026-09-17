import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userService';
import { validateEmail, validatePhone, validateFileSize, validateFileType } from '../../utils/validators';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';

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

const PREFERRED_COUNTRIES = [
  'UAE / Dubai', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'Sri Lanka', 'Russia', 'Other International Markets'
];

export const ApplyJob = () => {
  useScrollAnimation();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const cvInputRef = useRef(null);
  const passportInputRef = useRef(null);
  const expCertInputRef = useRef(null);
  const otherDocInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    date_of_birth: '',
    gender: 'Male',
    mobile_number: '',
    whatsapp_number: '',
    email: '',
    current_city: '',
    current_country: 'India',
    trade_category: '',
    total_experience: '',
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

  // File States
  const [cvFile, setCvFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [expCertFile, setExpCertFile] = useState(null);
  const [otherDocFile, setOtherDocFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);

  // Auto-populate trade category from URL query param or state
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e, setFile, label) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFileSize(file, 5)) {
        setStatus({ type: 'error', message: `${label} size must be less than 5MB!` });
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
    setStatus({ type: '', message: '' });

    // Client-side validations
    if (!formData.full_name.trim()) {
      setStatus({ type: 'error', message: t('val_name_req') || 'Full Name is required!' });
      return;
    }
    if (!formData.mobile_number.trim()) {
      setStatus({ type: 'error', message: t('val_mobile_req') || 'Mobile Number is required!' });
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      setStatus({ type: 'error', message: t('val_email_invalid') || 'Please enter a valid email address!' });
      return;
    }
    if (!formData.trade_category) {
      setStatus({ type: 'error', message: t('val_trade_req') || 'Please select a Trade / Skill Category!' });
      return;
    }
    if (!cvFile) {
      setStatus({ type: 'error', message: 'Please upload your CV / Resume!' });
      return;
    }
    if (!formData.consent) {
      setStatus({ type: 'error', message: 'You must confirm that your details are accurate.' });
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    submitData.append('cv_document', cvFile);
    if (passportFile) submitData.append('passport_document', passportFile);
    if (expCertFile) submitData.append('experience_certificate', expCertFile);
    if (otherDocFile) submitData.append('other_documents', otherDocFile);

    try {
      const res = await userService.submitApplication(submitData);
      if (res.success) {
        setSubmittedData({
          application_id: res.application_id,
          full_name: formData.full_name,
          trade_category: formData.trade_category,
          mobile_number: formData.mobile_number,
          email: formData.email,
          submitted_at: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      } else {
        setStatus({ type: 'error', message: res.error || res.message || 'Failed to submit application. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Connection or server error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      
      {/* ── Page Banner Header ── */}
      <section style={{ background: 'var(--slate)', padding: '70px 60px', position: 'relative', overflow: 'hidden' }} className="apply-banner">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--gold), var(--cobalt), var(--gold))' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', color: '#fff' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
            International Candidate Registration
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>
            {t('apply_for_job')}
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
            {t('apply_subtitle')}
          </p>
        </div>
      </section>

      {/* ── Main Section ── */}
      <section style={{ padding: '60px 40px' }} className="apply-body">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          
          {/* SUCCESS SCREEN */}
          {submittedData ? (
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid var(--fog)', padding: '48px 40px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', textAlign: 'center' }} className="animate-fade-in">
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>
                ✓
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--slate)', marginBottom: 8 }}>
                {t('app_success_title')}
              </h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: 'var(--steel)', maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.6 }}>
                {t('app_success_desc')}
              </p>

              {/* Reference Card */}
              <div style={{ background: 'var(--mist)', border: '1.5px dashed var(--cobalt)', borderRadius: 14, padding: '24px 32px', maxWidth: 480, margin: '0 auto 36px', textAlign: 'left' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  {t('app_id')}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: 'var(--cobalt)', marginBottom: 16 }}>
                  {submittedData.application_id}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13, borderTop: '1px solid var(--fog)', paddingTop: 14, color: 'var(--charcoal)' }}>
                  <div><strong>Applicant:</strong> {submittedData.full_name}</div>
                  <div><strong>Trade:</strong> {submittedData.trade_category}</div>
                  <div><strong>Mobile:</strong> {submittedData.mobile_number}</div>
                  <div><strong>Date:</strong> {submittedData.submitted_at}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" style={{ padding: '13px 28px', background: 'var(--slate)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: 'none' }}>
                  {t('back_to_skills')}
                </Link>
                <button onClick={() => { setSubmittedData(null); setCvFile(null); setPassportFile(null); setExpCertFile(null); setOtherDocFile(null); }} style={{ padding: '13px 28px', background: 'transparent', border: '1.5px solid var(--slate)', color: 'var(--slate)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 10, cursor: 'pointer' }}>
                  {t('submit_another')}
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM */
            <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid var(--fog)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              
              {/* Form Title Strip */}
              <div style={{ background: 'var(--slate)', padding: '24px 36px', color: '#fff', display: 'flex', alignItems: 'center', justify: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 }}>
                    {t('apply_for_job')}
                  </h2>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '4px 0 0 0' }}>
                    Fields marked with <span style={{ color: 'var(--gold)' }}>*</span> are mandatory for profile evaluation.
                  </p>
                </div>
                {formData.trade_category && (
                  <div style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold)', borderRadius: 8, padding: '6px 14px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>
                    {t('selected_trade')}: {formData.trade_category}
                  </div>
                )}
              </div>

              {/* Status Alert */}
              {status.message && (
                <div style={{ margin: '24px 36px 0', padding: '14px 20px', borderRadius: 10, background: status.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1.5px solid ${status.type === 'error' ? '#fca5a5' : '#a7f3d0'}`, color: status.type === 'error' ? '#991b1b' : '#065f46', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ padding: '36px' }}>
                
                {/* SECTION 1: PERSONAL INFORMATION */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '2px solid var(--mist)', marginBottom: 20 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>{t('personal_info')}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="form-grid-3">
                    <div>
                      <label style={labelStyle}>{t('full_name')} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="e.g. Rahul Sharma" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('father_name')}</label>
                      <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} placeholder={t('father_name')} style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('dob')}</label>
                      <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('gender')}</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>{t('mobile_number')} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="tel" name="mobile_number" required value={formData.mobile_number} onChange={handleChange} placeholder="+91 9876543210" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('whatsapp_number')}</label>
                      <input type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder={t('whatsapp_number')} style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('email_address')}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('current_city')}</label>
                      <input type="text" name="current_city" value={formData.current_city} onChange={handleChange} placeholder="e.g. Patna / New Delhi" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('current_country')}</label>
                      <input type="text" name="current_country" value={formData.current_country} onChange={handleChange} placeholder="India" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PROFESSIONAL INFORMATION */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '2px solid var(--mist)', marginBottom: 20 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>{t('professional_info')}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="form-grid-3">
                    <div>
                      <label style={labelStyle}>{t('selected_trade')} <span style={{ color: '#ef4444' }}>*</span></label>
                      <select name="trade_category" required value={formData.trade_category} onChange={handleChange} style={{ ...inputStyle, background: '#f8fafc', fontWeight: 700, color: 'var(--cobalt)' }}>
                        <option value="">-- Select Trade --</option>
                        {SKILL_CATEGORIES_LIST.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>{t('total_experience')}</label>
                      <input type="text" name="total_experience" value={formData.total_experience} onChange={handleChange} placeholder="e.g. 5 Years" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('relevant_experience')}</label>
                      <input type="text" name="relevant_experience" value={formData.relevant_experience} onChange={handleChange} placeholder="e.g. 3 Years Gulf Experience" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('current_job_title')}</label>
                      <input type="text" name="current_job_title" value={formData.current_job_title} onChange={handleChange} placeholder="e.g. Senior Welder / Mason" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('previous_company')}</label>
                      <input type="text" name="previous_company" value={formData.previous_company} onChange={handleChange} placeholder="Company Name" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('preferred_country')}</label>
                      <select name="preferred_country" value={formData.preferred_country} onChange={handleChange} style={inputStyle}>
                        {PREFERRED_COUNTRIES.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>{t('expected_salary')}</label>
                      <input type="text" name="expected_salary" value={formData.expected_salary} onChange={handleChange} placeholder="e.g. 2500 AED / 3000 SAR" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: SKILLS & CERTIFICATIONS */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '2px solid var(--mist)', marginBottom: 20 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>{t('skills_certifications')}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="form-grid-3">
                    <div>
                      <label style={labelStyle}>{t('primary_skill')}</label>
                      <input type="text" name="primary_skill" value={formData.primary_skill} onChange={handleChange} placeholder="e.g. 6G TIG & MIG Welding" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('additional_skills')}</label>
                      <input type="text" name="additional_skills" value={formData.additional_skills} onChange={handleChange} placeholder="e.g. Blueprint reading, Pipefitting" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('certifications')}</label>
                      <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="e.g. ITI, IOSH, AWS Certified" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: PASSPORT & DOCUMENT UPLOADS */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '2px solid var(--mist)', marginBottom: 20 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>{t('documents')}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 20 }} className="form-grid-2">
                    <div>
                      <label style={labelStyle}>{t('passport_number')}</label>
                      <input type="text" name="passport_number" value={formData.passport_number} onChange={handleChange} placeholder="e.g. Z1234567" style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>{t('passport_expiry')}</label>
                      <input type="date" name="passport_expiry" value={formData.passport_expiry} onChange={handleChange} style={inputStyle} />
                    </div>
                  </div>

                  {/* Upload Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="form-grid-2">
                    
                    {/* CV Upload */}
                    <div style={uploadCardStyle}>
                      <label style={labelStyle}>{t('upload_cv')} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="file" ref={cvInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setCvFile, t('upload_cv'))} />
                      <button type="button" onClick={() => cvInputRef.current.click()} style={uploadBtnStyle}>
                        📄 {cvFile ? cvFile.name : 'Choose CV File (PDF/DOC/JPG)'}
                      </button>
                      <span style={uploadHelpStyle}>{cvFile ? `Selected: ${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : 'Max 5MB. PDF, DOCX, JPG'}</span>
                    </div>

                    {/* Passport Upload */}
                    <div style={uploadCardStyle}>
                      <label style={labelStyle}>{t('upload_passport')}</label>
                      <input type="file" ref={passportInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setPassportFile, t('upload_passport'))} />
                      <button type="button" onClick={() => passportInputRef.current.click()} style={uploadBtnStyle}>
                        🛂 {passportFile ? passportFile.name : 'Choose Passport File'}
                      </button>
                      <span style={uploadHelpStyle}>{passportFile ? `Selected: ${(passportFile.size / 1024 / 1024).toFixed(2)} MB` : 'Front & Back Page Copy'}</span>
                    </div>

                    {/* Experience Certificate */}
                    <div style={uploadCardStyle}>
                      <label style={labelStyle}>{t('upload_experience')}</label>
                      <input type="file" ref={expCertInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setExpCertFile, t('upload_experience'))} />
                      <button type="button" onClick={() => expCertInputRef.current.click()} style={uploadBtnStyle}>
                        🏆 {expCertFile ? expCertFile.name : 'Choose Experience Cert'}
                      </button>
                      <span style={uploadHelpStyle}>{expCertFile ? `Selected: ${(expCertFile.size / 1024 / 1024).toFixed(2)} MB` : 'Previous Service Certificates'}</span>
                    </div>

                    {/* Other Documents */}
                    <div style={uploadCardStyle}>
                      <label style={labelStyle}>{t('upload_other')}</label>
                      <input type="file" ref={otherDocInputRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e, setOtherDocFile, t('upload_other'))} />
                      <button type="button" onClick={() => otherDocInputRef.current.click()} style={uploadBtnStyle}>
                        📁 {otherDocFile ? otherDocFile.name : 'Choose Other Document'}
                      </button>
                      <span style={uploadHelpStyle}>{otherDocFile ? `Selected: ${(otherDocFile.size / 1024 / 1024).toFixed(2)} MB` : 'Driving License, Trade Certs, etc.'}</span>
                    </div>

                  </div>
                </div>

                {/* SECTION 5: ADDITIONAL & CONSENT */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '2px solid var(--mist)', marginBottom: 20 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>5</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--slate)', margin: 0 }}>{t('additional_info')}</h3>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Message / Additional Details</label>
                    <textarea name="message" rows="3" value={formData.message} onChange={handleChange} placeholder={t('message_placeholder')} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  <div style={{ background: 'var(--mist)', border: '1.5px solid var(--fog)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <input type="checkbox" name="consent" id="consent" checked={formData.consent} onChange={handleChange} style={{ marginTop: 3, cursor: 'pointer', width: 18, height: 18 }} />
                    <label htmlFor="consent" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'var(--charcoal)', cursor: 'pointer', lineHeight: 1.5 }}>
                      {t('declaration')} <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'right', paddingTop: 10 }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '16px 42px',
                      background: 'var(--slate)',
                      color: '#fff',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: 12,
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 8px 24px rgba(15,26,53,0.2)',
                      transition: 'all 0.25s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="inline-block animate-spin">⏳</span> {t('submitting')}
                      </>
                    ) : (
                      <>{t('submit_application')} →</>
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </section>

      <style>{`
        .apply-banner { padding: 70px 60px; }
        .apply-body { padding: 60px 40px; }
        .form-grid-3 { grid-template-columns: repeat(3, 1fr); }
        .form-grid-2 { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 960px) {
          .apply-banner { padding: 50px 24px !important; }
          .apply-body { padding: 40px 16px !important; }
          .form-grid-3 { grid-template-columns: 1fr !important; }
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 12.5,
  fontWeight: 700,
  color: 'var(--slate)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.04em'
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 8,
  border: '1.5px solid var(--fog)',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 14,
  color: 'var(--slate)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box'
};

const uploadCardStyle = {
  background: 'var(--mist)',
  border: '1.5px solid var(--fog)',
  borderRadius: 10,
  padding: '14px 18px',
  boxSizing: 'border-box'
};

const uploadBtnStyle = {
  width: '100%',
  padding: '10px 14px',
  background: '#fff',
  border: '1.5px dashed var(--cobalt)',
  borderRadius: 8,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--cobalt)',
  cursor: 'pointer',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const uploadHelpStyle = {
  display: 'block',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 11,
  color: 'var(--steel)',
  marginTop: 6
};

export default ApplyJob;
