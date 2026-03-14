import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from '../hooks/useTranslation';

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Dịch Vụ &amp; Giải Trí | Noi Bai Airport Hotel</title>
        <meta name="description" content="Trải nghiệm dịch vụ 5 sao đích thực tại Noi Bai Airport Hotel: Nhà hàng Á-Âu, Spa phục hồi năng lượng, và phòng Gym hiện đại." />
      </Head>

      <section className="page-header">
        <div className="container">
          <h1 className="page-title fade-in-up">{t.services.title}</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.services.subtitle}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="services-grid">

            <div className="service-card">
              <div className="service-img">
                <Image
                  src="/images/service/588533094.jpg"
                  alt={t.services.restaurant}
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="service-content">
                <h2>{t.services.restaurant}</h2>
                <p>{t.services.restaurantDesc}</p>
                <ul>
                  {t.services.restaurantItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="service-card reverse">
              <div className="service-img">
                <Image
                  src="/images/service/498249257.jpg"
                  alt={t.services.spa}
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="service-content">
                <h2>{t.services.spa}</h2>
                <p>{t.services.spaDesc}</p>
                <ul>
                  {t.services.spaItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-img">
                <Image
                  src="/images/Background/274606571.jpg"
                  alt={t.services.gym}
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="service-content">
                <h2>{t.services.gym}</h2>
                <p>{t.services.gymDesc}</p>
                <ul>
                  {t.services.gymItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header { padding-top: calc(var(--nav-height) + var(--space-12)); padding-bottom: var(--space-12); background-color: var(--color-primary); color: var(--color-white); text-align: center; }
        .page-title { font-size: clamp(1.5rem, 5vw, var(--text-4xl)); margin-bottom: var(--space-4); color: var(--color-white); }
        .page-subtitle { font-size: var(--text-base); color: var(--color-gray-300); max-width: 800px; margin: 0 auto; }
        .services-grid { display: flex; flex-direction: column; gap: var(--space-16); }
        .service-card { display: grid; grid-template-columns: 1fr; gap: 0; align-items: center; background: var(--color-gray-50); border-radius: var(--radius-lg); overflow: hidden; }
        @media (min-width: 992px) { .service-card { grid-template-columns: 1fr 1fr; background: transparent; gap: var(--space-8); } .service-card.reverse { direction: rtl; } .service-card.reverse .service-content { direction: ltr; } }
        .service-img { position: relative; overflow: hidden; aspect-ratio: 4 / 3; }
        @media (min-width: 992px) { .service-img { aspect-ratio: unset; height: 380px; border-radius: var(--radius-lg); } }
        .service-content { padding: var(--space-6); }
        @media (min-width: 992px) { .service-content { padding: var(--space-8); } }
        @media (max-width: 767px) {
          .service-content { padding: var(--space-5) var(--space-4); }
          .services-grid { gap: var(--space-10); }
        }
        .service-content h2 { color: var(--color-primary); margin-bottom: var(--space-4); }
        .service-content p { color: var(--color-gray-600); margin-bottom: var(--space-6); line-height: var(--leading-relaxed); }
        .service-content ul { list-style: none; }
        .service-content li { margin-bottom: var(--space-2); padding-left: var(--space-6); position: relative; color: var(--color-gray-700); }
        .service-content li::before { content: "—"; position: absolute; left: 0; color: var(--color-accent); }
      `}</style>
    </>
  );
}
