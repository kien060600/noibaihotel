import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/bookings');
  }, [router]);

  return <div style={{ padding: '2rem', textAlign: 'center' }}>Redirecting to dashboard...</div>;
}
