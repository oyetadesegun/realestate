'use client';

import { useState } from 'react';
import { ScheduleTourModal } from './ScheduleTourModal';
import { WhatsAppInquiry } from './WhatsAppInquiry';
import { Button } from './ui/button';
import { Phone, Mail } from 'lucide-react';
import type { Property } from './PropertyCard';

interface PropertyDetailsClientProps {
  property: Property;
}

export function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsTourModalOpen(true)}
        className="w-full bg-primary hover:bg-accent text-primary-foreground mb-3 h-auto py-2"
      >
        Schedule a Tour
      </Button>
      <div className="mb-6">
        <WhatsAppInquiry propertyTitle={property.title} propertyId={property.id} />
      </div>

      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm text-foreground">+234 906 846 5685</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm text-foreground">davisbeen@gmail.com</span>
        </div>
      </div>

      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyPrice={property.price}
      />
    </>
  );
}
