import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { rooms, formatPrice } from '@/data/rooms';
import { useTranslation } from '../../hooks/useTranslation';

export default function RoomDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation();

  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <div className="section container text-center" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <h1>{t.rooms.notFound}</h1>
        <Link href="/rooms" className="btn btn-primary" style={{ marginTop: '24px' }}>
          {t.rooms.backToRooms}
        </Link>
      </div>
    );
  }

  const roomSlug = room.slug as keyof typeof t.rooms.roomNames;
  const roomName = t.rooms.roomNames[roomSlug] || room.name;
  const roomDesc = t.rooms.roomDescriptions[roomSlug] || room.description;
  const bedType = t.rooms.bedTypes[roomSlug] || room.bedType;
  const capacity = t.rooms.capacities[roomSlug] || room.capacity;
  const view = t.rooms.views[roomSlug] || room.view;
  const amenities = t.rooms.amenities[roomSlug] || room.amenities;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "name": room.name,
    "description": room.description,
    "image": room.images,
    "bed": { "@type": "BedDetails", "typeOfBed": room.bedType },
    "occupancy": { "@type": "QuantitativeValue", "value": room.capacity },
    "offers": { "@type": "Offer", "price": room.price, "priceCurrency": "VND" }
  };

  return (
    <>
      <Head>
        <title>{roomName} | Noi Bai Airport Hotel</title>
        <meta name="description" content={roomDesc} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>

      <article className="room-detail">
        <header className="room-banner" style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.7)), url(${room.image})` }}>
          <div className="container">
            <h1 className="fade-in-up">{roomName}</h1>
            <div className="room-price fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t.rooms.from} <strong>{formatPrice(room.price)}</strong> {t.rooms.perNight}
            </div>
          </div>
        </header>

        <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
          <div className="content-layout">
            <div className="main-info">
              <div className="gallery">
                {room.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${roomName} view ${idx + 1}`} loading="lazy" />
                ))}
              </div>

              <section className="description-section">
                <h2>{t.rooms.overview}</h2>
                <p>{roomDesc}</p>
              </section>

              <section className="amenities-section">
                <h2>{t.rooms.detailTitle}</h2>
                <ul className="amenities-list">
                  {amenities.map((item: string, idx: number) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="booking-sidebar">
              <div className="booking-card">
                <h3>{t.rooms.detailBooking}</h3>
                <div className="price-display">
                  <strong>{formatPrice(room.price)}</strong>
                  <span> {t.rooms.perNight}</span>
                </div>

                <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>{t.rooms.checkIn}</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.checkOut}</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.guests}</label>
                    <select className="form-control">
                      <option>{t.rooms.guest1Adult}</option>
                      <option>{t.rooms.guest2Adults}</option>
                      <option>{t.rooms.guestAddChildren}</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    {t.rooms.detailBooking}
                  </button>
                  <p className="form-note">{t.rooms.noChargeYet}</p>
                </form>
              </div>

              <div className="quick-facts">
                <h4>{t.rooms.quickInfo}</h4>
                <ul>
                  <li><strong>{t.rooms.detailSize}:</strong> {room.size} m²</li>
                  <li><strong>{t.rooms.detailBed}:</strong> {bedType}</li>
                  <li><strong>{t.rooms.detailCapacity}:</strong> {capacity}</li>
                  <li><strong>{t.rooms.detailView}:</strong> {view}</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <style jsx>{`
        .room-banner { height: 60vh; min-height: 400px; background-size: cover; background-position: center; display: flex; align-items: flex-end; padding-bottom: var(--space-12); color: var(--color-white); }
        .room-banner h1 { font-size: var(--text-5xl); color: var(--color-white); margin-bottom: var(--space-4); }
        @media (max-width: 767px) {
          .room-banner { height: 45vh; min-height: 260px; padding-bottom: var(--space-8); }
          .room-banner h1 { font-size: var(--text-3xl); }
        }
        .room-price { font-family: var(--font-sans); font-size: var(--text-lg); font-weight: var(--font-medium); }
        .room-price strong { font-size: var(--text-3xl); color: var(--color-accent); }
        .content-layout { display: grid; grid-template-columns: 1fr; gap: var(--space-12); margin-top: var(--space-8); }
        @media (min-width: 992px) { .content-layout { grid-template-columns: 2fr 1fr; margin-top: var(--space-12); } }
        .gallery { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-12); }
        .gallery img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius-md); }
        @media (max-width: 767px) {
          .gallery { grid-template-columns: 1fr; }
        }
        .description-section, .amenities-section { margin-bottom: var(--space-12); }
        h2 { color: var(--color-primary); border-bottom: 2px solid var(--color-gray-200); padding-bottom: var(--space-4); margin-bottom: var(--space-6); }
        .amenities-list { display: grid; grid-template-columns: 1fr; gap: var(--space-4); list-style: none; }
        @media (min-width: 768px) { .amenities-list { grid-template-columns: 1fr 1fr; } }
        .amenities-list li { font-size: var(--text-base); color: var(--color-gray-700); padding: var(--space-3) var(--space-4); background: var(--color-gray-50); border-radius: var(--radius-sm); }
        .booking-sidebar { position: sticky; top: calc(var(--nav-height) + var(--space-8)); }
        .booking-card { background: var(--color-white); padding: var(--space-8); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border-light); margin-bottom: var(--space-8); }
        @media (max-width: 767px) {
          .booking-card { padding: var(--space-6); }
          .booking-sidebar { position: static; }
        }
        .booking-card h3 { margin-bottom: var(--space-2); font-family: var(--font-sans); font-size: var(--text-xl); border: none; }
        .price-display { margin-bottom: var(--space-6); padding-bottom: var(--space-6); border-bottom: 1px solid var(--border-light); }
        .price-display strong { font-size: var(--text-2xl); color: var(--color-primary); }
        .form-group { margin-bottom: var(--space-4); }
        .form-group label { display: block; font-size: var(--text-sm); font-weight: var(--font-medium); margin-bottom: var(--space-2); color: var(--color-gray-700); }
        .form-control { width: 100%; padding: var(--space-3); border: 1px solid var(--color-gray-300); border-radius: var(--radius-sm); font-family: var(--font-sans); font-size: var(--text-base); background-color: var(--color-gray-50); }
        .form-control:focus { outline: none; border-color: var(--color-accent); background-color: var(--color-white); }
        .form-note { text-align: center; font-size: var(--text-xs); margin-top: var(--space-4); }
        .quick-facts { background: var(--color-gray-50); padding: var(--space-6); border-radius: var(--radius-md); }
        .quick-facts h4 { margin-bottom: var(--space-4); font-family: var(--font-sans); font-size: var(--text-base); }
        .quick-facts ul { list-style: none; }
        .quick-facts li { margin-bottom: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); display: flex; justify-content: space-between; border-bottom: 1px dashed var(--color-gray-300); padding-bottom: var(--space-2); }
      `}</style>
    </>
  );
}
