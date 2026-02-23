'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { PropertyForm } from '@/components/PropertyForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { updateProperty, deleteProperty } from '@/app/actions/properties.actions';
import { Role } from '@/lib/generated/prisma/client';
import { toast } from 'sonner';
import Link from 'next/link';

interface EditPropertyClientProps {
  property: {
    id: number;
    title: string;
    propertyType: 'Land' | 'House' | 'Flat';
    status: 'ForSale' | 'ForRent';
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    images: string[];
  };
}

export default function EditPropertyClient({ property }: EditPropertyClientProps) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      await updateProperty(property.id, data, Role.ADMIN);
      toast.success('Property updated successfully');
      router.push('/admin/properties');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update property');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(property.id, Role.ADMIN);
      toast.success('Property deleted successfully');
      router.push('/admin/properties');
    } catch (error: any) {
      toast.error('Failed to delete property');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/properties">
          <Button variant="outline">← Back</Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Edit Property</h1>
          <p className="text-muted-foreground">Update details for "{property.title}"</p>
        </div>
      </div>

      <PropertyForm onSubmit={handleSubmit} initialData={property} isEditing />

      {/* Delete Section */}
      <Card className="p-6 mt-8 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
        <p className="text-red-800 mb-4">
          Deleting this property will remove it permanently from the system. This action cannot be undone.
        </p>

        {!showDeleteConfirm ? (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Property
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-red-800 font-semibold">Are you sure? This cannot be undone.</p>
            <div className="flex gap-2">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Property'}
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
