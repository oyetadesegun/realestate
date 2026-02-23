import { AdminNav } from '@/components/AdminNav';
import { getBookings } from '@/app/actions/booking.actions';
import BookingsClient from './BookingsClient';

export const metadata = {
  title: 'Manage Bookings - Admin Portal',
};

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <main className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Booking Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage tour requests and inquiries from potential clients.
          </p>
        </div>

        <BookingsClient initialBookings={bookings as any} />
      </div>

      <footer className="bg-muted py-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
