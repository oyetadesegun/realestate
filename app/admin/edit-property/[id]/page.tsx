import { AdminNav } from '@/components/AdminNav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPropertyById } from '@/app/actions/properties.actions';
import EditPropertyClient from './EditPropertyClient';

export const metadata = {
  title: 'Edit Property - Admin Portal',
};

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const propertyId = parseInt(params.id);
  const property = await getPropertyById(propertyId);

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground">Property not found</h1>
          <p className="text-muted-foreground mt-2">The property you are looking for does not exist or has been removed.</p>
          <Link href="/admin/properties">
            <Button className="mt-6 bg-primary hover:bg-accent text-primary-foreground">
              Back to Properties
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminNav />
      <EditPropertyClient property={property as any} />
      
      <footer className="bg-muted py-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
