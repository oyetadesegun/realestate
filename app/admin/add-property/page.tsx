'use client';

import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { PropertyForm } from '@/components/PropertyForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { addProperty } from '@/app/actions/properties.actions';
import { Role } from '@/lib/generated/prisma/client';
import { toast } from 'sonner';

export default function AddPropertyPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await addProperty(data, Role.ADMIN);
      toast.success('Property added successfully');
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add property');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline">← Back</Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Add New Property</h1>
            <p className="text-muted-foreground">Fill in the details to list a new property</p>
          </div>
        </div>

        <PropertyForm onSubmit={handleSubmit} />
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
