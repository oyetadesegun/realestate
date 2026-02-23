'use client';

import { useState } from 'react';
import { PropertyCard, Property } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteProperty } from '@/app/actions/properties.actions';
import { Role } from '@prisma/client';
import { toast } from 'sonner';

interface DashboardPropertiesProps {
  initialProperties: Property[];
}

export default function DashboardProperties({ initialProperties }: DashboardPropertiesProps) {
  const [properties, setProperties] = useState(initialProperties);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    setIsDeleting(id);
    try {
      await deleteProperty(id, Role.ADMIN);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative group">
          <PropertyCard property={property as any} />
          <div className="absolute top-2 left-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/admin/edit-property/${property.id}`} className="flex-1">
              <Button variant="secondary" className="w-full text-xs h-auto py-1 shadow-md">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="flex-1 text-xs h-auto py-1 shadow-md"
              onClick={() => handleDelete(property.id)}
              disabled={isDeleting === property.id}
            >
              {isDeleting === property.id ? '...' : 'Delete'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
