'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { deleteProperty } from '@/app/actions/properties.actions';
import { Role } from '@prisma/client';
import { toast } from 'sonner';

interface Property {
  id: number;
  title: string;
  location: string;
  propertyType: string;
  status: string;
  price: number;
}

interface AdminPropertiesClientProps {
  initialProperties: Property[];
}

export default function AdminPropertiesClient({ initialProperties }: AdminPropertiesClientProps) {
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary border-b border-border">
          <tr>
            <th className="text-left px-6 py-4 font-semibold text-foreground">Property Name</th>
            <th className="text-left px-6 py-4 font-semibold text-foreground">Location</th>
            <th className="text-left px-6 py-4 font-semibold text-foreground">Type</th>
            <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
            <th className="text-right px-6 py-4 font-semibold text-foreground">Price</th>
            <th className="text-right px-6 py-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-secondary/50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-medium text-foreground">{property.title}</p>
              </td>
              <td className="px-6 py-4 text-foreground">{property.location}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {property.propertyType}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === 'ForSale'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {property.status === 'ForRent' ? 'For Rent' : 'For Sale'}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-semibold text-foreground">
                ₦{(property.price / 1_000_000).toFixed(1)}M
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/properties/${property.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-auto p-2"
                      title="View property"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/edit-property/${property.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-auto p-2"
                      title="Edit property"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-auto p-2"
                    title="Delete property"
                    onClick={() => handleDelete(property.id)}
                    disabled={isDeleting === property.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-muted-foreground mt-4 px-6">
        Total properties: <span className="font-semibold">{properties.length}</span>
      </p>
    </div>
  );
}
