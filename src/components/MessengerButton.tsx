import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const MESSENGER_URL = 'https://m.me/61567646420350';

const tooltips = {
  vi: 'Chat với chúng tôi',
  en: 'Chat with us',
  zh: '与我们聊天',
};

export default function MessengerButton() {
  const { locale } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const tooltip = tooltips[locale] ?? tooltips.vi;

  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tooltip}
      className="messenger-fab"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <span className={`fab-tooltip ${hovered ? 'visible' : ''}`}>
        {tooltip}
      </span>

      {/* Messenger icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 2C7.373 2 2 7.06 2 13.333c0 3.426 1.674 6.48 4.3 8.527V26l3.91-2.149c1.044.29 2.15.449 3.29.449 6.627 0 12-5.06 12-11.333C26 7.06 20.627 2 14 2z"
          fill="white"
        />
        <path
          d="M15.07 16.867l-3.054-3.253-5.963 3.253 6.563-6.974 3.054 3.254 5.963-3.254-6.563 6.974z"
          fill="#0084FF"
        />
      </svg>

      <style jsx>{`
        .messenger-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0084FF 0%, #0099FF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 132, 255, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .messenger-fab:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 132, 255, 0.55);
          color: white;
        }

        .fab-tooltip {
          position: absolute;
          right: 66px;
          background: rgba(15, 23, 42, 0.9);
          color: #fff;
          font-size: 13px;
          font-family: var(--font-sans);
          font-weight: 500;
          white-space: nowrap;
          padding: 6px 12px;
          border-radius: 6px;
          pointer-events: none;
          opacity: 0;
          transform: translateX(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .fab-tooltip::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-left-color: rgba(15, 23, 42, 0.9);
          border-right: none;
        }

        .fab-tooltip.visible {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 480px) {
          .messenger-fab {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </a>
  );
}
