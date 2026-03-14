import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '../hooks/useTranslation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { t, locale, switchLocale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.rooms, path: '/rooms' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const handleLang = (lang: 'vi' | 'en' | 'zh') => {
    switchLocale(lang);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          <Link href="/" className="logo">NOI BAI AIRPORT HOTEL</Link>

          {/* Desktop nav */}
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

          {/* Desktop actions */}
          <div className="header-actions desktop-actions">
            <div className="lang-switcher">
              <button className={`lang-btn ${locale === 'vi' ? 'active' : ''}`} onClick={() => switchLocale('vi')}>VI</button>
              <span className="lang-divider">|</span>
              <button className={`lang-btn ${locale === 'en' ? 'active' : ''}`} onClick={() => switchLocale('en')}>EN</button>
              <span className="lang-divider">|</span>
              <button className={`lang-btn ${locale === 'zh' ? 'active' : ''}`} onClick={() => switchLocale('zh')}>中文</button>
            </div>
            <Link href="/rooms" className="btn btn-primary">{t.nav.bookNow}</Link>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className={`hamburger ${isMenuOpen ? 'is-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`mobile-nav-link ${router.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mobile-lang">
          <button className={`lang-btn ${locale === 'vi' ? 'active' : ''}`} onClick={() => handleLang('vi')}>VI</button>
          <span className="lang-divider">|</span>
          <button className={`lang-btn ${locale === 'en' ? 'active' : ''}`} onClick={() => handleLang('en')}>EN</button>
          <span className="lang-divider">|</span>
          <button className={`lang-btn ${locale === 'zh' ? 'active' : ''}`} onClick={() => handleLang('zh')}>中文</button>
        </div>

        <Link href="/rooms" className="btn btn-primary mobile-book-btn" onClick={() => setIsMenuOpen(false)}>
          {t.nav.bookNow}
        </Link>
      </div>

      <style jsx>{`
        /* ---- Header bar ---- */
        .header {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: var(--nav-height);
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          z-index: 1000;
          transition: all var(--transition-normal);
        }
        .header-scrolled {
          background-color: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          box-shadow: var(--shadow-sm);
          height: 64px;
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        /* ---- Logo ---- */
        .logo {
          font-family: var(--font-serif);
          font-size: clamp(0.85rem, 3.5vw, 1.5rem);
          font-weight: var(--font-bold);
          color: #fff;
          letter-spacing: 0.04em;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
        .header-scrolled .logo {
          color: var(--color-primary);
          text-shadow: none;
        }

        /* ---- Desktop nav ---- */
        .desktop-nav { display: none; gap: var(--space-8); }
        @media (min-width: 768px) { .desktop-nav { display: flex; } }

        .nav-link {
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          padding: var(--space-2) 0;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .header-scrolled .nav-link { color: var(--color-gray-900); text-shadow: none; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background-color: var(--color-accent);
          transition: width var(--transition-normal);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        /* ---- Desktop actions ---- */
        .desktop-actions { display: none; align-items: center; gap: var(--space-4); }
        @media (min-width: 768px) { .desktop-actions { display: flex; } }

        .lang-switcher { display: flex; align-items: center; gap: var(--space-1); }
        .lang-btn {
          background: none; border: none; cursor: pointer;
          font-size: var(--text-xs); font-weight: var(--font-bold);
          color: rgba(255,255,255,0.7);
          padding: var(--space-1) var(--space-2);
          text-transform: uppercase; letter-spacing: 0.05em;
          transition: color var(--transition-normal);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .lang-btn.active { color: #fff; }
        .lang-btn:hover { color: var(--color-accent); }
        .header-scrolled .lang-btn { color: var(--color-gray-500); text-shadow: none; }
        .header-scrolled .lang-btn.active { color: var(--color-accent); }
        .lang-divider { color: rgba(255,255,255,0.4); font-size: var(--text-xs); }
        .header-scrolled .lang-divider { color: var(--color-gray-300); }

        /* ---- Hamburger — mobile only ---- */
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .hamburger:hover { background: rgba(255,255,255,0.15); }
        .hamburger.scrolled:hover { background: rgba(0,0,0,0.07); }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hamburger.scrolled span { background: var(--color-primary); }

        .hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (min-width: 768px) { .hamburger { display: none; } }

        /* ---- Mobile overlay ---- */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open { opacity: 1; }
        @media (max-width: 767px) { .mobile-overlay { display: block; pointer-events: none; }
          .mobile-overlay.open { pointer-events: auto; } }

        /* ---- Mobile drawer ---- */
        .mobile-drawer {
          display: none;
          position: fixed;
          top: var(--nav-height);
          left: 0; right: 0;
          background: var(--color-primary);
          z-index: 999;
          padding: var(--space-6) var(--space-6) var(--space-8);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .mobile-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 767px) { .mobile-drawer { display: block; } }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          margin-bottom: var(--space-6);
        }
        .mobile-nav-link {
          font-family: var(--font-sans);
          font-size: var(--text-base);
          font-weight: var(--font-medium);
          color: rgba(255,255,255,0.75);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: var(--space-3) var(--space-2);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }
        .mobile-nav-link:last-child { border-bottom: none; }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--color-accent);
          padding-left: var(--space-4);
        }

        .mobile-lang {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          padding-top: var(--space-4);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-lang .lang-btn { font-size: var(--text-sm); color: rgba(255,255,255,0.6); }
        .mobile-lang .lang-btn.active { color: var(--color-accent); }
        .mobile-lang .lang-divider { color: rgba(255,255,255,0.3); }

        .mobile-book-btn { width: 100%; justify-content: center; }
      `}</style>
    </>
  );
}
