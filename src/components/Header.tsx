import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '../hooks/useTranslation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { t, locale, switchLocale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.rooms, path: '/rooms' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link href="/" className="logo">
          NOI BAI AIRPORT HOTEL
        </Link>

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${router.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switcher">
            <button
              className={`lang-btn ${locale === 'vi' ? 'active' : ''}`}
              onClick={() => switchLocale('vi')}
            >
              VI
            </button>
            <span className="lang-divider">|</span>
            <button
              className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
              onClick={() => switchLocale('en')}
            >
              EN
            </button>
          </div>
          <Link href="/rooms" className="btn btn-primary">
            {t.nav.bookNow}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          z-index: 1000;
          transition: all var(--transition-normal);
        }
        
        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          box-shadow: var(--shadow-sm);
          height: 70px;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: #ffffff;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .header-scrolled .logo {
          color: var(--color-primary);
          text-shadow: none;
        }

        .logo span {
          color: var(--color-accent);
        }

        .desktop-nav {
          display: none;
          gap: var(--space-8);
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-link {
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          padding: var(--space-2) 0;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .header-scrolled .nav-link {
          color: var(--color-primary);
          text-shadow: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-accent);
          transition: width var(--transition-normal);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .header-scrolled .nav-link,
        .header-scrolled .logo {
          color: var(--color-gray-900);
          text-shadow: none;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .lang-switcher {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .lang-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          color: rgba(255,255,255,0.7);
          padding: var(--space-1) var(--space-2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color var(--transition-normal);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .lang-btn.active {
          color: #ffffff;
        }

        .lang-btn:hover {
          color: var(--color-accent);
        }

        .header-scrolled .lang-btn {
          color: var(--color-gray-500);
          text-shadow: none;
        }

        .header-scrolled .lang-btn.active {
          color: var(--color-accent);
        }

        .lang-divider {
          color: rgba(255,255,255,0.5);
          font-size: var(--text-xs);
        }

        .header-scrolled .lang-divider {
          color: var(--color-gray-400);
        }
      `}</style>
    </header>
  );
}
