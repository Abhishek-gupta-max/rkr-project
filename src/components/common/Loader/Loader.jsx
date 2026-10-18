import React from 'react';
import './Loader.css';

export const Loader = ({ active = true }) => {
  if (!active) return null;

  return (
    <div id="pageLoader" className="page-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <div className="loader-ring"></div>
          <div className="loader-ring loader-ring-2"></div>
          <div className="loader-icon">
            {/* Globe icon — matches brand identity */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
        </div>
        <div className="loader-text">RKR Globalpath</div>
        <div className="loader-sub">HR &amp; Manpower Solutions</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
