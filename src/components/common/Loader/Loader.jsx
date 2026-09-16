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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        <div className="loader-text">RKR Global Path</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
