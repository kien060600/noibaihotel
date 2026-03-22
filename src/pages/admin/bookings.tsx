import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Booking {
  id: string;
  guestName: string;
  phone: string;
  roomSlug: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  guests: number;
  status: string;
  createdAt: string;
}

export default function AdminBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status, router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Manage Bookings | Admin Dashboard</title>
      </Head>
      
      <div className="admin-layout">
        <header className="admin-header">
          <div className="admin-container header-content">
            <h1>Noi Bai Hotel Admin</h1>
            <div className="user-controls">
              <span>Welcome, {session?.user?.name || 'Admin'}</span>
              <button onClick={() => signOut()} className="btn-logout">Logout</button>
            </div>
          </div>
        </header>

        <main className="admin-container">
          <div className="dashboard-header">
            <h2>Bookings Management</h2>
            <button onClick={fetchBookings} className="btn-refresh">Refresh Data</button>
          </div>

          <div className="table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Phone</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Guests</th>
                  <th>Date Booked</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">No bookings found.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="font-medium">{booking.guestName}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.roomSlug}</td>
                      <td>
                        <div className="text-sm">{booking.checkInDate}</div>
                        <div className="text-xs text-gray-500">{booking.checkInTime}</div>
                      </td>
                      <td>
                        <div className="text-sm">{booking.checkOutDate}</div>
                        <div className="text-xs text-gray-500">{booking.checkOutTime}</div>
                      </td>
                      <td className="text-center">{booking.guests}</td>
                      <td className="text-sm">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirm</option>
                          <option value="CANCELLED">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .admin-header {
          background-color: #111827;
          color: white;
          padding: 1.25rem 0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid #1f2937;
        }
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        h1 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
          letter-spacing: -0.025em;
        }
        .user-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
        }
        .btn-logout {
          background-color: transparent;
          color: #d1d5db;
          border: 1px solid #4b5563;
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-logout:hover {
          color: white;
          border-color: #9ca3af;
          background-color: rgba(255,255,255,0.1);
        }
        
        main {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        h2 {
          font-size: 1.5rem;
          color: #111827;
          margin: 0;
        }
        .btn-refresh {
          background-color: white;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .btn-refresh:hover {
          background-color: #f3f4f6;
        }
        
        .table-container {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          overflow-x: auto;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .bookings-table th {
          background-color: #f9fafb;
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
          border-bottom: 1px solid #e5e7eb;
        }
        .bookings-table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
          vertical-align: middle;
        }
        .bookings-table tr:last-child td {
          border-bottom: none;
        }
        .font-medium {
          font-weight: 500;
          color: #111827;
        }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .text-gray-500 { color: #6b7280; }
        .text-center { text-align: center; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }
        .status-confirmed {
          background-color: #d1fae5;
          color: #065f46;
        }
        .status-cancelled {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .status-select {
          padding: 0.25rem 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          background-color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .status-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
      `}</style>
    </>
  );
}
