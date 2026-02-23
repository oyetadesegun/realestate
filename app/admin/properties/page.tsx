import { AdminNav } from '@/components/AdminNav';
import { getProperties } from '@/app/actions/properties.actions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import AdminPropertiesClient from './AdminPropertiesClient';

export const metadata = {
  title: 'Manage Properties - Admin Portal',
};

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">My Properties</h1>
          <Link href="/admin/add-property">
            <Button className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2 h-auto py-2">
              <Plus className="w-5 h-5" />
              Add Property
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <AdminPropertiesClient initialProperties={properties as any} />
        </Card>
      </div>

      <footer className="bg-muted py-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
