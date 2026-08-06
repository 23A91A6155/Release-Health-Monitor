import React from 'react';

const Header: React.FC = () => {
  const release = import.meta.env.VITE_SENTRY_RELEASE || 'development';

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="url(#headerGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="url(#headerGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="url(#headerGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="headerGrad" x1="2" y1="2" x2="22" y2="22">
                  <stop stopColor="#00d4ff" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="header__title">Release Health Monitor</h1>
            <p className="header__subtitle">
              <span className="header__status-dot" />
              Tracking release <code>{release}</code>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
