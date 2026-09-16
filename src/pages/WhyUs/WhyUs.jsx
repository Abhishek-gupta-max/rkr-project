import React from 'react';
import { Link } from 'react-router-dom';
import { LICENSE_NO } from '../../utils/constants';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export const WhyUs = () => {
  useScrollAnimation();

  const testimonials = [
    {
      stars: '★★★★★',
      text: '"RKR Global Path provided me with excellent guidance throughout my overseas job placement. The entire process was transparent and hassle-free. Highly recommended!"',
      name: 'Rajesh Kumar',
      role: 'Healthcare Professional, Dubai'
    },
    {
      stars: '★★★★★',
      text: '"The team was very professional and supportive. They handled all documentation and visa process efficiently. I\'m now successfully working abroad!"',
      name: 'Priya Singh',
      role: 'IT Professional, Canada'
    },
    {
      stars: '★★★★★',
      text: '"Best recruitment agency I\'ve worked with. They understood my requirements perfectly and matched me with the ideal job. Simply outstanding service!"',
      name: 'Amit Patel',
      role: 'Engineer, Saudi Arabia'
    }
  ];

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
              <span className="text-amber-300">Why Choose Us</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Industry-leading recruitment with unmatched expertise and proven success record
            </p>
          </div>
        </div>
      </section>

      {/* Key Reasons */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Reason 1 */}
            <div className="flex gap-4 scroll-fade-in-left">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.218c0 1.695-.603 2.933-1.391 3.467.19.294.335.652.335 1.035 0 1.641-1.487 3-3.322 3H7.631c-1.835 0-3.322-1.359-3.322-3 0-.383.145-.74.335-1.035-.788-.534-1.391-1.772-1.391-3.467V6.518c0-1.691.977-3.149 2.414-3.063z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">MEA Approved & Government Registered</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We are fully registered with the Ministry of External Affairs (MEA) and Government of India.
                  Our License No: {LICENSE_NO} ensures complete legal compliance and credibility.
                </p>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="flex gap-4 scroll-fade-in-right">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">15+ Years of Excellence</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  With over 15 years of industry experience, we have built strong relationships with employers
                  worldwide and understand the nuances of international recruitment.
                </p>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="flex gap-4 scroll-fade-in-left">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">1000+ Successful Placements</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our proven track record of over 1000 successful placements across 50+ countries demonstrates
                  our capability and commitment to excellence.
                </p>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="flex gap-4 scroll-fade-in-right">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">100% Legal & Transparent</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We maintain complete transparency in all dealings. No hidden charges, no illegal practices -
                  just straightforward, compliant recruitment services.
                </p>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="flex gap-4 scroll-fade-in-left">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM16.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM10 16a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 15.657l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM4 10a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zM5.757 4.343l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">24/7 Support Available</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our dedicated support team is available round-the-clock to assist you with any queries, visa
                  issues, or concerns at any time.
                </p>
              </div>
            </div>

            {/* Reason 6 */}
            <div className="flex gap-4 scroll-fade-in-right">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white shadow-md">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-1.763 3.546a.75.75 0 001.06 1.06A2.25 2.25 0 1010 5.25a.75.75 0 00-1.5 0v2.546zM10 12a.75.75 0 110-1.5h.01a.75.75 0 110 1.5H10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-heading">Professional Guidance</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our experienced consultants provide personalized guidance through every step of your
                  recruitment journey from application to placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Statistics */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">What Sets Us Apart</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white text-center p-6 rounded-2xl shadow-sm border border-slate-100 scroll-scale-in">
              <div className="text-4xl font-bold text-amber-500 mb-2 font-heading">1000+</div>
              <p className="text-base font-bold text-slate-800 font-heading">Successful Placements</p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">Happy professionals working globally</p>
            </div>

            <div className="bg-white text-center p-6 rounded-2xl shadow-sm border border-slate-100 scroll-scale-in">
              <div className="text-4xl font-bold text-amber-500 mb-2 font-heading">50+</div>
              <p className="text-base font-bold text-slate-800 font-heading">Countries</p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">Worldwide employment opportunities</p>
            </div>

            <div className="bg-white text-center p-6 rounded-2xl shadow-sm border border-slate-100 scroll-scale-in">
              <div className="text-4xl font-bold text-amber-500 mb-2 font-heading">100%</div>
              <p className="text-base font-bold text-slate-800 font-heading">Legal Compliance</p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">MEA approved & government licensed</p>
            </div>

            <div className="bg-white text-center p-6 rounded-2xl shadow-sm border border-slate-100 scroll-scale-in">
              <div className="text-4xl font-bold text-amber-500 mb-2 font-heading">15+</div>
              <p className="text-base font-bold text-slate-800 font-heading">Years of Service</p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">Industry expertise and experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">Our Commitment to You</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:shadow-lg transition-all duration-300 scroll-scale-in">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 font-heading">Goal Oriented</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your success is our priority. We work diligently to match you with opportunities that align with
                your career goals and aspirations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:shadow-lg transition-all duration-300 scroll-scale-in">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 font-heading">Ethical Partnership</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe in honest and ethical practices. Your trust is earned through transparency and
                consistent delivery of promises.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:shadow-lg transition-all duration-300 scroll-scale-in">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 font-heading">Global Network</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our extensive network of verified employers and partners worldwide ensures you have access to
                the best opportunities globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50 scroll-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">What Our Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.02] transition-transform duration-300 scroll-scale-in">
                <div className="flex items-center gap-2 mb-4 text-amber-500">
                  {t.stars}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  {t.text}
                </p>
                <p className="font-bold text-blue-900 font-heading">{t.name}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 scroll-fade-in">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-brandBlue to-blue-900 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 scroll-scale-in">
            <h3 className="text-3xl font-bold text-white mb-4 font-heading">Join Thousands of Successful Professionals</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Start your overseas career journey with the most trusted recruitment agency in India.
            </p>
            <Link to="/apply" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
