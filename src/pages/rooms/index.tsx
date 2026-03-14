import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { rooms, formatPrice } from '@/data/rooms';
import { useTranslation } from '../../hooks/useTranslation';

export default function RoomsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Phòng Nghỉ &amp; Suite | Noi Bai Airport Hotel</title>
        <meta name="description" content="Khám phá các hạng phòng nghỉ sang trọng tại Noi Bai Airport Hotel." />
      </Head>

      <section className="page-header">
        <div className="container">
          <h1 className="page-title fade-in-up">{t.rooms.pageTitle}</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.rooms.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="rooms-grid">
            {rooms.map((room) => {
              const roomName = t.rooms.roomNames[room.slug as keyof typeof t.rooms.roomNames] || room.name;
              const roomDesc = t.rooms.roomDescriptions[room.slug as keyof typeof t.rooms.roomDescriptions] || room.description;
              const bedType = t.rooms.bedTypes[room.slug as keyof typeof t.rooms.bedTypes] || room.bedType;
              const capacity = t.rooms.capacities[room.slug as keyof typeof t.rooms.capacities] || room.capacity;

              return (
                <article key={room.id} className="room-card">
                  <Link href={`/rooms/${room.slug}`} className="room-image">
                    <Image
                      src={room.image}
                      alt={roomName}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 400px"
                      className="room-img"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <div className="room-image-overlay">
                      <span className="overlay-text">{t.rooms.viewDetail}</span>
                    </div>
                    <div className="room-price-badge">
                      <span>{t.rooms.from}</span>
                      <strong>{formatPrice(room.price)}</strong> {t.rooms.perNight}
                    </div>
                  </Link>

                  <div className="room-info">
                    <h2>{roomName}</h2>
                    <div className="room-meta">
                      <span><i className="icon">📐</i> {room.size} m²</span>
                      <span><i className="icon">🛏️</i> {bedType}</span>
                      <span><i className="icon">👥</i> {capacity}</span>
                    </div>

                    <p className="room-desc">{roomDesc.substring(0, 100)}...</p>

                    <Link href={`/rooms/${room.slug}`} className="btn btn-outline" style={{ width: '100%' }}>
                      {t.rooms.viewDetail}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header { padding-top: calc(var(--nav-height) + var(--space-12)); padding-bottom: var(--space-12); background-color: var(--color-primary); color: var(--color-white); text-align: center; }
        .page-title { font-size: clamp(1.5rem, 5vw, var(--text-4xl)); margin-bottom: var(--space-4); color: var(--color-white); }
        .page-subtitle { font-size: var(--text-base); color: var(--color-gray-300); max-width: 600px; margin: 0 auto; }
        .rooms-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-8); }
        @media (min-width: 992px) { .rooms-grid { grid-template-columns: repeat(3, 1fr); } }
        .room-card { background-color: var(--color-white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: all var(--transition-normal); display: flex; flex-direction: column; }
        .room-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        .room-image { position: relative; aspect-ratio: 4 / 3; overflow: hidden; display: block; cursor: pointer; }
        .room-card:hover .room-img { transform: scale(1.05); }
        .room-image-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center; transition: background var(--transition-normal); }
        .room-image:hover .room-image-overlay { background: rgba(0,0,0,0.35); }
        .overlay-text { color: #fff; font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--font-semibold); letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.8); padding: var(--space-2) var(--space-6); border-radius: var(--radius-sm); opacity: 0; transform: translateY(6px); transition: opacity var(--transition-normal), transform var(--transition-normal); }
        .room-image:hover .overlay-text { opacity: 1; transform: translateY(0); }
        .room-price-badge { position: absolute; bottom: 0; left: 0; background: rgba(30, 41, 59, 0.9); color: white; padding: var(--space-2) var(--space-4); backdrop-filter: blur(4px); border-top-right-radius: var(--radius-md); }
        .room-price-badge span { display: block; font-size: var(--text-xs); color: var(--color-gray-300); text-transform: uppercase; }
        .room-price-badge strong { font-size: var(--text-lg); color: var(--color-accent); }
        .room-info { padding: var(--space-6); display: flex; flex-direction: column; flex-grow: 1; }
        .room-info h2 { font-size: var(--text-xl); margin-bottom: var(--space-4); }
        .room-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-gray-200); font-size: var(--text-sm); color: var(--color-gray-600); }
        .room-meta span { display: flex; align-items: center; gap: var(--space-1); }
        .room-desc { margin-bottom: var(--space-6); flex-grow: 1; }
      `}</style>
    </>
  );
}
