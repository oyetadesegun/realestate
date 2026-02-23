'use client';

import { Bed, Bath, Maximize2, Calendar, Home, Zap, Waves, Lock, Trees, Wifi } from 'lucide-react';

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  type: 'Land' | 'House' | 'Flat';
}

export function PropertyFeatures({
  bedrooms,
  bathrooms,
  type,
}: PropertyFeaturesProps) {
  return (
    <div className="space-y-6">
      {/* Main specifications */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Bed className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Bedrooms</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{bedrooms}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Bath className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Bathrooms</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{bathrooms}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Type</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{type}</p>
        </div>
      </div>
    </div>
  );
}
