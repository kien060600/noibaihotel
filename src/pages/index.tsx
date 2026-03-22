import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { rooms, formatPrice } from '../data/rooms';
import { useTranslation } from '../hooks/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();
  const featuredRoom = rooms[0];
  const featuredSlug = featuredRoom.slug as keyof typeof t.rooms.roomNames;
  const featuredName = t.rooms.roomNames[featuredSlug] || featuredRoom.name;
  const featuredDesc = t.rooms.roomDescriptions[featuredSlug] || featuredRoom.description;
  const featuredBed = t.rooms.bedTypes[featuredSlug] || featuredRoom.bedType;
  const featuredCapacity = t.rooms.capacities[featuredSlug] || featuredRoom.capacity;

  return (
    <>
      <Head>
        <title>Noi Bai Airport Hotel | Đẳng cấp &amp; Tinh tế</title>
        <meta name="description" content="Khách sạn cao cấp gần Sân bay Nội Bài. Thiết kế tối giản hiện đại, dịch vụ 5 sao, chỉ cách sân bay 5 phút." />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        {/* Desktop backgrounds */}
        <Image
          src="/images/Background/hotel-front.jpg"
          alt="Noi Bai Airport Hotel"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img desktop-bg"
        />
        <Image
          src="/images/Background/hotel-front-2.jpg"
          alt="Noi Bai Airport Hotel"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img desktop-bg fade-anim"
        />

        {/* Mobile backgrounds */}
        <Image
          src="/images/Background/hotel-front-mobile.jpg"
          alt="Noi Bai Airport Hotel"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img mobile-bg"
        />
        <Image
          src="/images/Background/hotel-front-mobile-2.jpg"
          alt="Noi Bai Airport Hotel"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img mobile-bg fade-anim"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-card">
            <p className="hero-label">NOI BAI AIRPORT HOTEL</p>
            <h1 className="hero-title fade-in-up">{t.home.heroTitle}</h1>
            <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.home.heroSubtitle}
            </p>
            <Link href="/rooms" className="btn btn-accent fade-in-up" style={{ animationDelay: '0.4s' }}>
              {t.home.heroButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.home.featuresTitle}</h2>
            <p className="section-subtitle">{t.home.featuresSubtitle}</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>{t.home.feature1Title}</h3>
              <p>{t.home.feature1Desc}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛏️</div>
              <h3>{t.home.feature2Title}</h3>
              <p>{t.home.feature2Desc}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>{t.home.feature3Title}</h3>
              <p>{t.home.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Room */}
      <section className="section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.home.roomsTitle}</h2>
            <p className="section-subtitle">{t.home.roomsSubtitle}</p>
          </div>

          <div className="featured-room">
            <Link href={`/rooms/${featuredRoom.slug}`} passHref legacyBehavior>
              <a className="featured-img" style={{ display: 'block' }}>
                <Image
                  src={featuredRoom.images[0]}
                  alt={featuredName}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  style={{ objectFit: 'cover', transform: 'translateZ(0)', willChange: 'transform' }}
                />
              </a>
            </Link>
            <div className="featured-info">
              <h3 className="featured-name">{featuredName}</h3>
              <p className="featured-desc">{featuredDesc}</p>
              <div className="featured-meta">
                <span>{featuredRoom.size} m²</span>
                <span>{featuredBed}</span>
                <span>{featuredCapacity}</span>
              </div>
              <div className="featured-footer">
                <span className="featured-price">{t.rooms.from} {formatPrice(featuredRoom.price)}{t.rooms.perNight}</span>
                <Link href={`/rooms/${featuredRoom.slug}`} className="btn btn-primary">{t.home.viewDetail}</Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/rooms" className="btn btn-outline">{t.home.viewAll}</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }

        :global(.hero-bg-img) {
          object-fit: cover;
          object-position: center 33%;
        }

        :global(.mobile-bg) {
          display: none !important;
        }

        :global(.fade-anim) {
          animation: fadeTop 6s ease-in-out infinite alternate !important;
        }

        @keyframes fadeTop {
          0%, 30% { opacity: 0; }
          70%, 100% { opacity: 1; }
        }

        @media (max-width: 767px) {
          .hero {
            min-height: 90dvh; /* Reduced height on mobile to crop less of the sides */
          }
          :global(.hero-bg-img) {
            object-position: center center; /* Cắt ưu tiên trung tâm ảnh cho tỉ lệ dọc của điện thoại */
          }
          :global(.desktop-bg) {
            display: none !important;
          }
          :global(.mobile-bg) {
            display: block !important;
          }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 0 var(--space-6) var(--space-12);
        }

        .hero-card {
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          padding: var(--space-10) var(--space-12);
          text-align: center;
          max-width: 700px;
          width: 100%;
        }

        @media (max-width: 767px) {
          .hero-card { padding: var(--space-8) var(--space-6); }
        }

        .hero-label {
          font-size: var(--text-sm);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: var(--space-4);
          color: rgba(255,255,255,0.7);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: var(--font-bold);
          color: #ffffff;
          margin-bottom: var(--space-4);
        }

        .hero-subtitle {
          font-size: var(--text-base);
          margin-bottom: var(--space-8);
          color: rgba(255,255,255,0.85);
          line-height: var(--leading-relaxed);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: var(--text-3xl);
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }

        .section-subtitle {
          font-size: var(--text-lg);
          color: var(--color-gray-500);
        }

        @media (max-width: 767px) {
          .section-title { font-size: var(--text-2xl); }
          .section-subtitle { font-size: var(--text-base); }
        }

        .bg-gray { background-color: var(--color-gray-50); }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
        }

        @media (min-width: 768px) {
          .features-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .feature-card {
          text-align: center;
          padding: var(--space-8);
        }

        @media (max-width: 767px) {
          .feature-card { padding: var(--space-4) var(--space-6); }
        }

        .feature-icon { font-size: 2.5rem; margin-bottom: var(--space-4); }

        .feature-card h3 {
          font-size: var(--text-xl);
          color: var(--color-primary);
          margin-bottom: var(--space-3);
        }

        .feature-card p {
          color: var(--color-gray-500);
          line-height: var(--leading-relaxed);
        }

        .featured-room {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (min-width: 768px) {
          .featured-room { grid-template-columns: 1fr 1fr; }
        }

        .featured-img {
          position: relative;
          overflow: hidden;
          height: 280px;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (min-width: 768px) {
          .featured-img { height: 100%; min-height: 400px; }
        }

        .featured-info {
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 767px) {
          .featured-info { padding: var(--space-6); }
        }

        .featured-name {
          font-family: var(--font-serif);
          font-size: var(--text-2xl);
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }

        .featured-desc {
          color: var(--color-gray-500);
          margin-bottom: var(--space-6);
          line-height: var(--leading-relaxed);
        }

        .featured-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          color: var(--color-gray-500);
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .featured-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .featured-price {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--color-accent);
        }
      `}</style>
    </>
  );
}
