import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { rooms, formatPrice } from '@/data/rooms';
import { useTranslation } from '../../hooks/useTranslation';

const HOUR_OPTIONS = Array.from({ length: 12 }).map((_, i) => String(i + 1).padStart(2, '0'));
const MINUTE_OPTIONS = ['00', '15', '30', '45'];

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

  const [checkInDate, setCheckInDate] = useState('');
  const [checkInHour, setCheckInHour] = useState('02');
  const [checkInMinute, setCheckInMinute] = useState('00');
  const [checkInAmPm, setCheckInAmPm] = useState('PM');
  
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutHour, setCheckOutHour] = useState('02');
  const [checkOutMinute, setCheckOutMinute] = useState('00');
  const [checkOutAmPm, setCheckOutAmPm] = useState('AM');
  
  const [showCheckInHourPicker, setShowCheckInHourPicker] = useState(false);
  const [showCheckInMinutePicker, setShowCheckInMinutePicker] = useState(false);
  const [showCheckOutHourPicker, setShowCheckOutHourPicker] = useState(false);
  const [showCheckOutMinutePicker, setShowCheckOutMinutePicker] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const now = new Date();
    
    // Check-in: current time + 24 hours
    const checkIn = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const inYear = checkIn.getFullYear();
    const inMonth = String(checkIn.getMonth() + 1).padStart(2, '0');
    const inDay = String(checkIn.getDate()).padStart(2, '0');
    setCheckInDate(`${inYear}-${inMonth}-${inDay}`);
    
    const inHours = checkIn.getHours();
    const inAmPm = inHours >= 12 ? 'PM' : 'AM';
    const inDisplayHours = inHours % 12 === 0 ? 12 : inHours % 12;
    setCheckInHour(String(inDisplayHours).padStart(2, '0'));
    
    const inMins = checkIn.getMinutes();
    const inRoundedMins = Math.round(inMins / 15) * 15;
    setCheckInMinute(String(inRoundedMins === 60 ? 0 : inRoundedMins).padStart(2, '0'));
    setCheckInAmPm(inAmPm);

    // Check-out: check-in + 12 hours (1 buổi)
    const checkOut = new Date(checkIn.getTime() + 12 * 60 * 60 * 1000);
    const outYear = checkOut.getFullYear();
    const outMonth = String(checkOut.getMonth() + 1).padStart(2, '0');
    const outDay = String(checkOut.getDate()).padStart(2, '0');
    setCheckOutDate(`${outYear}-${outMonth}-${outDay}`);
    
    const outHours = checkOut.getHours();
    const outAmPm = outHours >= 12 ? 'PM' : 'AM';
    const outDisplayHours = outHours % 12 === 0 ? 12 : outHours % 12;
    setCheckOutHour(String(outDisplayHours).padStart(2, '0'));
    
    const outMins = checkOut.getMinutes();
    const outRoundedMins = Math.round(outMins / 15) * 15;
    setCheckOutMinute(String(outRoundedMins === 60 ? 0 : outRoundedMins).padStart(2, '0'));
    setCheckOutAmPm(outAmPm);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        guestName,
        phone: guestPhone,
        roomSlug: room.slug,
        checkInDate,
        checkInTime: `${checkInHour}:${checkInMinute} ${checkInAmPm}`,
        checkOutDate,
        checkOutTime: `${checkOutHour}:${checkOutMinute} ${checkOutAmPm}`,
        guests: parseInt(guestsCount, 10),
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Booking failed');
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(t.rooms.bookingError || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };


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
        <header className="room-banner">
          <Image
            src={room.image}
            alt={roomName}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="room-banner-overlay" />
          <div className="container banner-content">
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
                  <div key={idx} className="gallery-item">
                    <Image
                      src={img}
                      alt={`${roomName} ${idx + 1}`}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 600px"
                      style={{ objectFit: 'cover', transform: 'translateZ(0)', willChange: 'transform' }}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
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

                {submitSuccess ? (
                  <div className="booking-success" style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', color: 'var(--color-success, #10B981)', marginBottom: '16px' }}>✓</div>
                    <h4 style={{ marginBottom: '8px' }}>{t.rooms.bookingSuccessTitle || 'Booking Submitted!'}</h4>
                    <p>{t.rooms.bookingSuccessDesc || 'Thank you! We will contact you soon to confirm.'}</p>
                    <button onClick={() => setSubmitSuccess(false)} className="btn btn-outline" style={{ marginTop: '16px', width: '100%' }}>
                      {t.rooms.bookAnother || 'Book Another Room'}
                    </button>
                  </div>
                ) : (
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                  {submitError && <div className="alert alert-error" style={{ color: 'red', marginBottom: '16px' }}>{submitError}</div>}
                  <div className="form-group">
                    <label>{t.rooms.guestName}</label>
                    <input type="text" className="form-control" placeholder={t.rooms.guestNamePlaceholder} required value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.guestPhone}</label>
                    <input type="tel" className="form-control" placeholder={t.rooms.guestPhonePlaceholder} required value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.checkIn}</label>
                    <div className="datetime-wrapper">
                      <input 
                        type="date" 
                        className="form-control date-input" 
                        required 
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                      <div className="time-select-group">
                        <div style={{ position: 'relative', flex: 1 }}>
                          <button 
                            type="button"
                            className="form-control time-select"
                            onClick={() => setShowCheckInHourPicker(!showCheckInHourPicker)}
                            style={{ userSelect: 'none', width: '100%' }}
                          >
                            {checkInHour}
                          </button>
                          {showCheckInHourPicker && (
                            <>
                              <div className="picker-overlay" onClick={() => setShowCheckInHourPicker(false)} />
                              <div className="hour-picker-grid">
                                {HOUR_OPTIONS.map((hour) => (
                                  <button 
                                    key={hour} 
                                    type="button" 
                                    className={`hour-btn ${checkInHour === hour ? 'active' : ''}`}
                                    onClick={() => { setCheckInHour(hour); setShowCheckInHourPicker(false); }}
                                  >
                                    {hour}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>:</span>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <button 
                            type="button"
                            className="form-control time-select"
                            onClick={() => setShowCheckInMinutePicker(!showCheckInMinutePicker)}
                            style={{ userSelect: 'none', width: '100%' }}
                          >
                            {checkInMinute}
                          </button>
                          {showCheckInMinutePicker && (
                            <>
                              <div className="picker-overlay" onClick={() => setShowCheckInMinutePicker(false)} />
                              <div className="hour-picker-grid minute-picker-grid">
                                {MINUTE_OPTIONS.map((min) => (
                                  <button 
                                    key={min} 
                                    type="button" 
                                    className={`hour-btn ${checkInMinute === min ? 'active' : ''}`}
                                    onClick={() => { setCheckInMinute(min); setShowCheckInMinutePicker(false); }}
                                  >
                                    {min}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <button 
                          type="button"
                          className="form-control time-select"
                          onClick={() => setCheckInAmPm(prev => prev === 'AM' ? 'PM' : 'AM')}
                          style={{ userSelect: 'none', flex: 1.2 }}
                        >
                          {checkInAmPm}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.checkOut}</label>
                    <div className="datetime-wrapper">
                      <input 
                        type="date" 
                        className="form-control date-input" 
                        required 
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      />
                      <div className="time-select-group">
                        <div style={{ position: 'relative', flex: 1 }}>
                          <button 
                            type="button"
                            className="form-control time-select"
                            onClick={() => setShowCheckOutHourPicker(!showCheckOutHourPicker)}
                            style={{ userSelect: 'none', width: '100%' }}
                          >
                            {checkOutHour}
                          </button>
                          {showCheckOutHourPicker && (
                            <>
                              <div className="picker-overlay" onClick={() => setShowCheckOutHourPicker(false)} />
                              <div className="hour-picker-grid">
                                {HOUR_OPTIONS.map((hour) => (
                                  <button 
                                    key={hour} 
                                    type="button" 
                                    className={`hour-btn ${checkOutHour === hour ? 'active' : ''}`}
                                    onClick={() => { setCheckOutHour(hour); setShowCheckOutHourPicker(false); }}
                                  >
                                    {hour}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>:</span>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <button 
                            type="button"
                            className="form-control time-select"
                            onClick={() => setShowCheckOutMinutePicker(!showCheckOutMinutePicker)}
                            style={{ userSelect: 'none', width: '100%' }}
                          >
                            {checkOutMinute}
                          </button>
                          {showCheckOutMinutePicker && (
                            <>
                              <div className="picker-overlay" onClick={() => setShowCheckOutMinutePicker(false)} />
                              <div className="hour-picker-grid minute-picker-grid">
                                {MINUTE_OPTIONS.map((min) => (
                                  <button 
                                    key={min} 
                                    type="button" 
                                    className={`hour-btn ${checkOutMinute === min ? 'active' : ''}`}
                                    onClick={() => { setCheckOutMinute(min); setShowCheckOutMinutePicker(false); }}
                                  >
                                    {min}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <button 
                          type="button"
                          className="form-control time-select"
                          onClick={() => setCheckOutAmPm(prev => prev === 'AM' ? 'PM' : 'AM')}
                          style={{ userSelect: 'none', flex: 1.2 }}
                        >
                          {checkOutAmPm}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.rooms.guests}</label>
                    <input type="number" className="form-control" min="1" value={guestsCount} onChange={(e) => setGuestsCount(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={isSubmitting}>
                    {isSubmitting ? (t.rooms.bookingLoading || 'Submitting...') : t.rooms.detailBooking}
                  </button>
                  <p className="form-note">{t.rooms.noChargeYet}</p>
                </form>
                )}
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
        .room-banner { position: relative; overflow: hidden; height: 60vh; min-height: 400px; display: flex; align-items: flex-end; color: var(--color-white); }
        .room-banner-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(17,24,39,0.35), rgba(17,24,39,0.7)); z-index: 1; }
        .banner-content { position: relative; z-index: 2; padding-bottom: var(--space-12); }
        .room-banner h1 { font-size: var(--text-5xl); color: var(--color-white); margin-bottom: var(--space-4); }
        @media (max-width: 767px) {
          .room-banner { height: 45vh; min-height: 260px; }
          .banner-content { padding-bottom: var(--space-8); }
          .room-banner h1 { font-size: var(--text-3xl); }
        }
        .room-price { font-family: var(--font-sans); font-size: var(--text-lg); font-weight: var(--font-medium); }
        .room-price strong { font-size: var(--text-3xl); color: var(--color-accent); }
        .content-layout { display: grid; grid-template-columns: 1fr; gap: var(--space-12); margin-top: var(--space-8); }
        @media (min-width: 992px) { .content-layout { grid-template-columns: 2fr 1fr; margin-top: var(--space-12); } }
        .gallery { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-12); }
        .gallery-item { position: relative; aspect-ratio: 4 / 3; overflow: hidden; border-radius: var(--radius-md); transform: translateZ(0); backface-visibility: hidden; }
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
        .datetime-wrapper { display: flex; gap: var(--space-2); }
        .date-input { flex: 2; }
        .time-select-group { flex: 1; display: flex; gap: var(--space-1); }
        .time-select { padding: var(--space-3) var(--space-2); text-align: center; cursor: pointer; }
        .picker-overlay { position: fixed; inset: 0; z-index: 9; }
        .hour-picker-grid { position: absolute; top: calc(100% + var(--space-2)); left: 50%; transform: translateX(-50%); z-index: 10; background: var(--color-white); border: 1px solid var(--border-light); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); padding: var(--space-3); display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2); width: 220px; }
        .minute-picker-grid { width: max-content; }
        .hour-btn { padding: var(--space-2); border: 1px solid var(--color-gray-200); border-radius: var(--radius-sm); background: var(--color-white); cursor: pointer; font-family: var(--font-sans); font-size: var(--text-sm); transition: all var(--transition-fast); }
        .hour-btn:hover { background: var(--color-gray-50); border-color: var(--color-gray-300); }
        .hour-btn.active { background: var(--color-primary); color: var(--color-white); border-color: var(--color-primary); }
        @media (max-width: 480px) { .datetime-wrapper { flex-direction: column; } .date-input, .time-select-group { flex: unset; width: 100%; } }
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
