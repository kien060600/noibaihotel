import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Map Section */}
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3272564504923!2d105.78352029999999!3d21.218867700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135039ac829fe5d%3A0x4a0c2dd04118113f!2sNoi%20Bai%20Airport%20Hotel!5e0!3m2!1sen!2s!4v1773502679487!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Info Section */}
          <div className="footer-info">
            <ul className="footer-contact">
              <li>
                {t.footer.addressLabel} {t.footer.addressValue}
              </li>
              <li>
                {t.footer.emailLabel} <a href="mailto:booking@noibaihotel.com">booking@noibaihotel.com</a>
              </li>
              <li>
                Website: <a href="https://www.noibaiairporthotel.com">www.noibaiairporthotel.com</a>
              </li>
              <li>
                Hotline: <a href="tel:+84975280338">0975 280 338</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Ornament */}
        <div className="footer-divider">
          <div className="ornament">
            <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 20 L80 5 L60 20 L80 35 Z" fill="var(--color-accent, #cfb160)" />
              <path d="M100 20 L120 5 L140 20 L120 35 Z" fill="var(--color-accent, #cfb160)" />
              <circle cx="100" cy="20" r="10" fill="var(--color-accent, #cfb160)" />
              <rect x="10" y="19" width="40" height="2" fill="var(--color-accent, #cfb160)" />
              <rect x="150" y="19" width="40" height="2" fill="var(--color-accent, #cfb160)" />
            </svg>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Pinterest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" />
            </svg>
          </a>
        </div>

        {/* Footer Navigation */}
        <div className="footer-nav">
          <Link href="/">{t.nav.home.toUpperCase()}</Link>
          <Link href="/rooms">{t.nav.rooms.toUpperCase()}</Link>
          <Link href="/blog">{t.nav.blog.toUpperCase()}</Link>
          <Link href="/services">{t.nav.services.toUpperCase()}</Link>
          <Link href="/contact">{t.nav.contact.toUpperCase()}</Link>
          <Link href="/book">{t.nav.bookNow.toUpperCase()}</Link>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>
            COPYRIGHT &copy; {new Date().getFullYear()} NỘI BÀI HOTEL - DESIGNED BY <a href="https://ezcloud.vn" target="_blank" rel="noopener noreferrer">KienTT</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--color-primary, #212121);
          color: #cccccc;
          padding: 80px 0 40px;
          border-top: 1px solid #333;
        }

        @media (max-width: 767px) {
          .footer { padding: 48px 0 32px; }
          .footer-top { margin-bottom: 36px; gap: 28px; }
          .footer-info { font-size: 14px; }
          .footer-nav { gap: 12px; }
          .footer-nav a { font-size: 12px; }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Top Section: Map & Info */
        .footer-top {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 60px;
        }

        @media (min-width: 768px) {
          .footer-top {
            flex-direction: row;
            align-items: center;
          }
        }

        .footer-map {
          flex: 1;
        }

        .footer-map iframe {
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .footer-info {
          flex: 1;
          font-family: var(--font-serif, serif);
          font-size: 16px;
          line-height: 2;
        }

        .footer-contact {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-contact li {
          margin-bottom: 12px;
          color: #e0e0e0;
        }

        .footer-contact a {
          color: #e0e0e0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-contact a:hover {
          color: var(--color-accent, #cfb160);
        }

        /* Divider */
        .footer-divider {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        /* Social Icons */
        .footer-social {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: var(--color-accent, #cfb160);
          color: white;
          border-radius: 50%;
          transition: background-color 0.3s, transform 0.3s;
          opacity: 0.9;
        }

        .social-icon:hover {
          background-color: #b59b54;
          transform: translateY(-3px);
          opacity: 1;
        }

        /* Footer Navigation links */
        .footer-nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .footer-nav a {
          color: #888888;
          font-size: 13px;
          font-family: var(--font-sans, sans-serif);
          font-weight: 500;
          letter-spacing: 1px;
          transition: color 0.3s;
          text-decoration: none;
        }

        .footer-nav a:hover {
          color: var(--color-accent, #cfb160);
        }

        /* Bottom Section */
        .footer-bottom {
          text-align: center;
          font-size: 12px;
          color: #888888;
          font-family: var(--font-sans, sans-serif);
          letter-spacing: 1px;
        }

        .footer-bottom a {
          color: var(--color-accent, #cfb160);
          text-decoration: none;
        }
        
        .footer-bottom a:hover {
           text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
