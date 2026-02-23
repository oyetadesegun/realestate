'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  propertyType: 'Land' | 'House' | 'Flat';
  status: 'ForSale' | 'ForRent';
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const displayImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : '/placeholder-property.jpg';

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={displayImage}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {property.status === 'ForRent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-foreground truncate">
            {property.title}
          </h3>

          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location}</span>
          </div>

          <p className="text-primary font-bold text-lg mb-3">
            ₦{(property.price / 1_000_000).toFixed(1)}M
          </p>

          {(property.bedrooms || property.bathrooms) && (
            <div className="flex gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
