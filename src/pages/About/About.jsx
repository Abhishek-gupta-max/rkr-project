import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/common/Modal/Modal';
import { COMPANY_NAME, LICENSE_NO, CONTACT_INFO } from '../../utils/constants';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ src: '', title: '' });

  useScrollAnimation();

  const openCertModal = (src, title) => {
    setModalContent({ src, title });
    setModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-32 pb-24 md:pt-40 md:pb-36 bg-cover bg-center" style={{ backgroundImage: "url('/images/corporate_desk_empty_team.jpeg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/90 to-blue-900/80 pointer-events-none" />
        
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">About RKR Globalpath HR Manpower</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Your trusted partner in global manpower recruitment
            </p>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
            {/* Left: Our Story */}
            <div className="scroll-fade-in-left">
              <h2 className="text-4xl font-bold text-blue-900 mb-6 font-heading">Our Story</h2>
              <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                RKR Globalpath HR Manpower was founded with one clear mission: to provide honest, legal, and transparent overseas recruitment services to skilled professionals across India. Based in Buxar, Bihar, we serve job seekers from across the country who aspire to build global careers.
              </p>
              <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                We are a Government of India licensed recruitment agency (License No: B-3489/BIH/PER/100/5/11494/2026) approved by the Ministry of External Affairs (MEA). Our team ensures that every placement is 100% legal, every document verified, and every candidate treated with dignity and respect.
              </p>
              <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                At RKR Globalpath, we don't just fill positions — we build careers, create opportunities, and earn trust. Every job seeker deserves transparency, security, and proper guidance, while every employer deserves reliable and dedicated talent.
              </p>
              <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                Your trust is our responsibility, and your success is our mission.
              </p>
            </div>
            
            {/* Right: Owner Image Card */}
            <div className="scroll-fade-in-right">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-[24rem] sm:h-[26rem] flex items-center justify-center relative overflow-hidden">
                  <img src="/images/corporate_desk_empty_team.jpeg" alt="RKR Global Path Management" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                </div>
                
                <div className="p-6 flex flex-col h-full">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-1 font-heading">RKR Globalpath Team</h3>
                    <p className="text-amber-600 font-semibold mb-3">HR Recruitment & Placement Experts</p>
                    <p className="text-slate-600 text-sm leading-relaxed">Licensed by the Ministry of External Affairs, our team ensures every candidate gets a safe, verified, and dignified overseas placement. Bihar-based, globally connected.</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0116 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-amber-600 transition-colors">{CONTACT_INFO.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
                      </svg>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-amber-600 transition-colors">{CONTACT_INFO.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-slate-50 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 scroll-scale-in">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 font-heading">Our Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-slate-700 font-medium">100% legal and transparent recruitment</span>
              </div>
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-slate-700 font-medium">Dedicated support throughout the process</span>
              </div>
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-slate-700 font-medium">Client satisfaction as our priority</span>
              </div>
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-slate-700 font-medium">Post-deployment support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all scroll-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-heading">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">To facilitate seamless, legal, and transparent overseas recruitment while ensuring the highest standards of ethical conduct and compliance.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all scroll-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-heading">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">To become the most trusted overseas recruitment partner connecting talented professionals with global opportunities.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all scroll-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.218c0 1.695-.603 2.933-1.391 3.467.19.294.335.652.335 1.035 0 1.641-1.487 3-3.322 3H7.631c-1.835 0-3.322-1.359-3.322-3 0-.383.145-.74.335-1.035-.788-.534-1.391-1.772-1.391-3.467V6.518c0-1.691.977-3.149 2.414-3.063z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-heading">Our Values</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Integrity, transparency, excellence, and client satisfaction guide every decision and action we take.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Certifications Section */}
      <section className="py-20 px-4 bg-slate-50" id="certifications">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">Verified & Trusted</span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 font-heading">Government Certifications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are officially recognized and licensed by multiple government bodies. Click any certificate to view full size.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Certificate 1: Incorporation Certificate */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 cursor-pointer" 
                onClick={() => openCertModal('/images/certificate.PNG', 'Certificate of Incorporation')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/certificate.PNG" alt="Certificate of Incorporation" className="w-full h-44 sm:h-52 md:h-60 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Incorporation Certificate</h3>
                  <p className="text-xs text-amber-600 font-semibold">Ministry of External Affairs</p>
                </div>
              </div>
            </div>

            {/* Certificate 2: Registration Certificate */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer" 
                onClick={() => openCertModal('/images/license_certificate.PNG', 'Registration Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/license_certificate.PNG" alt="Registration Certificate" className="w-full h-44 sm:h-52 md:h-60 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Registration Certificate</h3>
                  <p className="text-xs text-blue-600 font-semibold">State Govt. Approved</p>
                </div>
              </div>
            </div>

            {/* Certificate 3: MEA Emblem */}
            {/* <div>
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 cursor-pointer" 
                onClick={() => openCertModal('/images/mea_logo.png', 'MEA Official Recognition')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <img src="/images/mea_logo.png" alt="MEA Official Recognition" className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 font-heading">MEA Recognized</h3>
                      <p className="text-xs text-green-600 font-semibold">Official Government Emblem</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">Proudly bearing the official MEA emblem, signifying our trusted partnership with the Government of India for overseas manpower.</p>
                </div>
              </div>
            </div>*/}

            {/* Certificate 3 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 cursor-pointer" 
                onClick={() => openCertModal('/images/updated_shop_and_establishment.pdf', 'Shop & Establishment Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden rounded-lg border border-dashed border-purple-200 bg-purple-50 relative">
                    <iframe
                      src="/images/updated_shop_and_establishment.pdf#view=fitH&toolbar=0"
                      title="Shop & Establishment Certificate Preview"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Shop & Establishment</h3>
                 {/* <p className="text-xs text-purple-600 font-semibold">Updated PDF Certificate</p> */}
                </div>
              </div>
            </div>

            {/* Certificate 4 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-200 cursor-pointer" 
                onClick={() => openCertModal('/images/udyam_registration_certificate.pdf', 'Udyam Registration Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 to-sky-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden rounded-lg border border-dashed border-cyan-200 bg-cyan-50 relative">
                    <iframe
                      src="/images/udyam_registration_certificate.pdf#view=fitH&toolbar=0"
                      title="Udyam Registration Certificate"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">Ministry of External Affairs</h3>
                  {/* <p className="text-xs text-blue-600 font-semibold">State Govt. Approved</p> */}
                </div>
              </div>
            </div>

            {/* Certificate 5 */}
            <div className="scroll-scale-in">
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 cursor-pointer" 
                onClick={() => openCertModal('/images/gst_certificate.pdf', 'GST Certificate')}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden rounded-lg border border-dashed border-amber-200 bg-amber-50 relative">
                    <iframe
                      src="/images/gst_certificate.pdf#view=fitH&toolbar=0"
                      title="GST Certificate"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-base font-bold text-blue-900 font-heading">GST Certificate</h3>
                  <p className="text-xs text-amber-600 font-semibold">Goods & Services Tax</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Trust Bar */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.218c0 1.695-.603 2.933-1.391 3.467.19.294.335.652.335 1.035 0 1.641-1.487 3-3.322 3H7.631c-1.835 0-3.322-1.359-3.322-3 0-.383.145-.74.335-1.035-.788-.534-1.391-1.772-1.391-3.467V6.518c0-1.691.977-3.149 2.414-3.063z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <p className="text-sm text-blue-200 mb-1">Our commitment to quality and compliance</p>
                  <h3 className="text-xl text-yellow-200 font-bold">100% Certified & Government Compliant</h3>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-300">6+</p>
                  <p className="text-xs text-blue-200">Certificates</p>
                </div>
                <div className="w-px h-10 bg-blue-600 hidden md:block"></div>
                <div className="text-center">
                  <p className="text-blue-200 text-sm">Verified by</p>
                  <p className="text-lg text-yellow-200 font-bold">Government of India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-r from-brandBlue to-blue-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-heading">Why Choose RKR Globalpath</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">MEA Registered</h4>
                <p className="text-blue-100 text-sm">Officially recognized by Ministry of External Affairs, ensuring legitimate and legal operations.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Proven Results</h4>
                <p className="text-blue-100 text-sm">1000+ successful placements with 100% client satisfaction across multiple countries.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0116 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Comprehensive Support</h4>
                <p className="text-blue-100 text-sm">End-to-end assistance from visa processing to post-deployment onboarding.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-300/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">Expert Team</h4>
                <p className="text-blue-100 text-sm">Experienced professionals with deep knowledge of global recruitment and visa processes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-amber-300/30 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-blue-900 mb-4 font-heading">Get in Touch</h3>
            <p className="text-slate-700 mb-8 text-lg">
              Ready to start your journey to global employment? Contact us today for a consultation.
            </p>
            <Link to="/contact" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0116 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        size="lg"
      >
        <div className="flex items-center justify-center p-2">
          {modalContent.src.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={modalContent.src}
              title={modalContent.title}
              className="w-full h-[70vh] rounded-lg border border-slate-100"
            />
          ) : (
            <img 
              src={modalContent.src} 
              alt={modalContent.title} 
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md border border-slate-100" 
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default About;
