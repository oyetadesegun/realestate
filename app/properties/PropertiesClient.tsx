'use client';

import { useState, useMemo } from 'react';
import { PropertyCard, Property } from '@/components/PropertyCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PropertiesClientProps {
  initialProperties: Property[];
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    type?: string[];
    status?: string[];
    location?: string;
    priceMin?: number;
    priceMax?: number;
  }>({});

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // Search term filter
      if (
        searchTerm &&
        !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (filters.type && !filters.type.includes(property.propertyType)) {
        return false;
      }

      // Status filter
      if (filters.status && !filters.status.includes(property.status)) {
        return false;
      }

      // Location filter
      if (filters.location && property.location !== filters.location) {
        return false;
      }

      // Price filter
      if (filters.priceMin && property.price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax && property.price > filters.priceMax) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filters, initialProperties]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-secondary p-8 rounded-lg border border-border mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">Our Properties</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by property name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <FilterSidebar onFiltersChange={setFilters} />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          {filteredProperties.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground mb-2">No properties found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
