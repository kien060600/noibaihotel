import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { 
      guestName, 
      phone, 
      roomSlug, 
      checkInDate, 
      checkInTime, 
      checkOutDate, 
      checkOutTime, 
      guests 
    } = req.body;

    if (!guestName || !phone || !roomSlug || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        guestName,
        phone,
        roomSlug,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        guests: parseInt(guests, 10) || 1,
        status: 'PENDING',
      },
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: 'Internal server error while creating booking' });
  }
}
