import React from 'react';
import Head from 'next/head';
import { useTranslation } from '../hooks/useTranslation';

export default function ContactPage() {
  const { t } = useTranslation();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Noi Bai Airport Hotel",
    "image": "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?auto=format&fit=crop&q=80",
    "@id": "https://noibaihotel.com",
    "url": "https://noibaihotel.com",
    "telephone": "+84123456789",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đường Võ Nguyên Giáp",
      "addressLocality": "Sóc Sơn",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.2187,
      "longitude": 105.7958
    }
  };

  return (
    <>
      <Head>
        <title>Liên Hệ | Noi Bai Airport Hotel | Đặt phòng nhanh chóng</title>
        <meta name="description" content="Liên hệ Noi Bai Airport Hotel qua Hotline: +84123456789. Địa chỉ: Võ Nguyên Giáp, Sóc Sơn." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </Head>

      <section className="page-header">
        <div className="container">
          <h1 className="page-title fade-in-up">{t.contact.pageTitle}</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.contact.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <h2>{t.contact.infoTitle}</h2>
              <p>{t.contact.infoDesc}</p>

              <ul className="info-list">
                <li>
                  <span className="icon">📍</span>
                  <div>
                    <strong>{t.contact.addressLabel}</strong>
                    <p>{t.contact.addressValue}</p>
                  </div>
                </li>
                <li>
                  <span className="icon">📞</span>
                  <div>
                    <strong>{t.contact.phoneLabel}</strong>
                    <p>0975 280 338</p>
                  </div>
                </li>
                <li>
                  <span className="icon">✉️</span>
                  <div>
                    <strong>{t.contact.emailLabel}</strong>
                    <p>booking@noibaihotel.com</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-form-wrapper">
              <h2>{t.contact.formTitle}</h2>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>{t.contact.formName}</label>
                  <input type="text" className="form-control" placeholder={t.contact.formNamePlaceholder} required />
                </div>
                <div className="form-group">
                  <label>{t.contact.formEmail}</label>
                  <input type="email" className="form-control" placeholder="example@email.com" required />
                </div>
                <div className="form-group">
                  <label>{t.contact.formMessage}</label>
                  <textarea className="form-control" rows={5} placeholder={t.contact.formMessagePlaceholder} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.contact.formSubmit}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header {
          padding-top: calc(var(--nav-height) + var(--space-12));
          padding-bottom: var(--space-16);
          background-color: var(--color-primary);
          color: var(--color-white);
          text-align: center;
        }
        .page-title { font-size: var(--text-4xl); margin-bottom: var(--space-4); color: var(--color-white); }
        .page-subtitle { font-size: var(--text-lg); color: var(--color-gray-300); max-width: 600px; margin: 0 auto; }
        .contact-layout { display: grid; grid-template-columns: 1fr; gap: var(--space-16); }
        @media (min-width: 992px) { .contact-layout { grid-template-columns: 1fr 1fr; } }
        .contact-info h2, .contact-form-wrapper h2 { color: var(--color-primary); margin-bottom: var(--space-4); font-size: var(--text-3xl); }
        .info-list { list-style: none; margin-top: var(--space-8); display: flex; flex-direction: column; gap: var(--space-6); }
        .info-list li { display: flex; gap: var(--space-4); align-items: flex-start; }
        .info-list .icon { font-size: var(--text-2xl); background: var(--color-gray-100); padding: var(--space-3); border-radius: var(--radius-full); display: flex; }
        .info-list strong { display: block; font-family: var(--font-sans); font-size: var(--text-lg); margin-bottom: var(--space-1); color: var(--color-primary); }
        .info-list p { margin: 0; color: var(--color-gray-600); }
        .contact-form-wrapper { background: var(--color-gray-50); padding: var(--space-8); border-radius: var(--radius-lg); border: 1px solid var(--border-light); }
        .form-group { margin-bottom: var(--space-6); }
        .form-group label { display: block; font-size: var(--text-sm); font-weight: var(--font-medium); margin-bottom: var(--space-2); color: var(--color-gray-700); }
        .form-control { width: 100%; padding: var(--space-3); border: 1px solid var(--color-gray-300); border-radius: var(--radius-sm); font-family: var(--font-sans); font-size: var(--text-base); background-color: var(--color-white); transition: all var(--transition-fast); }
        .form-control:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 2px rgba(180, 83, 9, 0.2); }
      `}</style>
    </>
  );
}
