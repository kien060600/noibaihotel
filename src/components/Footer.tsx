import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link href="/" className="logo">
              NỘI BÀI<span>.</span>HOTEL
            </Link>
            <p className="brand-description">
              {t.footer.brandDesc}
            </p>
          </div>

          <div className="footer-col">
            <h4 className="col-title">{t.footer.explore}</h4>
            <ul className="footer-links">
              <li><Link href="/rooms">{t.footer.roomsLink}</Link></li>
              <li><Link href="/services">{t.footer.servicesLink}</Link></li>
              <li><Link href="/blog">{t.footer.blogLink}</Link></li>
              <li><Link href="/contact">{t.footer.contactLink}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="col-title">{t.footer.contactTitle}</h4>
            <ul className="footer-contact">
              <li>
                <strong>{t.footer.addressLabel}</strong> {t.footer.addressValue}
              </li>
              <li>
                <strong>{t.footer.phoneLabel}</strong> <a href="tel:+84123456789">+84 123 456 789</a>
              </li>
              <li>
                <strong>{t.footer.emailLabel}</strong> <a href="mailto:booking@noibaihotel.com">booking@noibaihotel.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Noi Bai Airport Hotel. {t.footer.copyright}</p>
          <div className="legal-links">
            <Link href="/privacy">{t.footer.privacy}</Link>
            <Link href="/terms">{t.footer.terms}</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--color-primary);
          color: var(--color-gray-300);
          padding: var(--space-16) 0 var(--space-6);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }

        .logo {
          display: block;
          font-family: var(--font-serif);
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--color-white);
          margin-bottom: var(--space-4);
        }

        .logo span {
          color: var(--color-accent);
        }

        .brand-description {
          line-height: var(--leading-relaxed);
          max-width: 400px;
        }

        .col-title {
          font-family: var(--font-sans);
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--color-white);
          margin-bottom: var(--space-6);
        }

        .footer-links, .footer-contact {
          list-style: none;
        }

        .footer-links li, .footer-contact li {
          margin-bottom: var(--space-3);
        }

        .footer-links a, .footer-contact a {
          color: var(--color-gray-300);
        }

        .footer-links a:hover, .footer-contact a:hover {
          color: var(--color-white);
          padding-left: var(--space-1);
        }

        .footer-bottom {
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-gray-700);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          text-align: center;
          font-size: var(--text-sm);
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .legal-links {
          display: flex;
          gap: var(--space-6);
          justify-content: center;
        }

        .legal-links a {
          color: var(--color-gray-300);
        }
        
        .legal-links a:hover {
          color: var(--color-white);
        }
      `}</style>
    </footer>
  );
}
