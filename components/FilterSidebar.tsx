'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    type?: string[];
    status?: string[];
    location?: string;
    priceMin?: number;
    priceMax?: number;
  }) => void;
}

const locations = [
  'Victoria Island',
  'Lekki',
  'Ikoyi',
  'Gbagada',
  'Ikeja',
  'Ajah',
  'Surulere',
];

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleTypeChange = (type: string) => {
    const newTypes = types.includes(type)
      ? types.filter((t) => t !== type)
      : [...types, type];
    setTypes(newTypes);
    onFiltersChange({
      type: newTypes.length > 0 ? newTypes : undefined,
      status: statuses.length > 0 ? statuses : undefined,
      location: location || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
    });
  };

  const handleStatusChange = (status: string) => {
    const newStatuses = statuses.includes(status)
      ? statuses.filter((s) => s !== status)
      : [...statuses, status];
    setStatuses(newStatuses);
    onFiltersChange({
      type: types.length > 0 ? types : undefined,
      status: newStatuses.length > 0 ? newStatuses : undefined,
      location: location || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
    });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onFiltersChange({
      type: types.length > 0 ? types : undefined,
      status: statuses.length > 0 ? statuses : undefined,
      location: value || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-foreground">Property Type</h3>
        <div className="space-y-2">
          {['Land', 'House', 'Flat'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={types.includes(type)}
                onCheckedChange={() => handleTypeChange(type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-foreground">Status</h3>
        <div className="space-y-2">
          {['ForSale', 'ForRent'].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={statuses.includes(status)}
                onCheckedChange={() => handleStatusChange(status)}
              />
              <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                {status === 'ForRent' ? 'For Rent' : 'For Sale'}
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-foreground">Location</h3>
        <select
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-foreground">Price Range (NGN)</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Min Price</label>
            <Input
              type="number"
              placeholder="Minimum"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max Price</label>
            <Input
              type="number"
              placeholder="Maximum"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
      </Card>

      <Button
        onClick={() => {
          setTypes([]);
          setStatuses([]);
          setLocation('');
          setPriceMin('');
          setPriceMax('');
          onFiltersChange({});
        }}
        variant="outline"
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
}
