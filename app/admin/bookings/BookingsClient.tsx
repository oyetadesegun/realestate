'use client';

import { useState } from 'react';
import { deleteBooking } from '@/app/actions/booking.actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Mail, Phone, Calendar, Clock, Building } from 'lucide-react';

interface Booking {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  time: string;
  propertyTitle: string;
}

interface BookingsClientProps {
  initialBookings: Booking[];
}

export default function BookingsClient({ initialBookings }: BookingsClientProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    setIsDeleting(id);
    try {
      const res = await deleteBooking(id);
      if (res.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        toast.success('Booking deleted successfully');
      } else {
        toast.error(res.error || 'Failed to delete booking');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {bookings.length > 0 ? (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      {booking.propertyTitle}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(booking.preferredDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground font-medium">
                    Requested by: <span className="text-primary">{booking.fullName}</span>
                  </p>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(booking.id)}
                  disabled={isDeleting === booking.id}
                  className="shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-secondary border-dashed">
          <p className="text-lg text-muted-foreground">No booking requests found.</p>
        </Card>
      )}
    </div>
  );
}
