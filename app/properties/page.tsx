import { MainNav } from '@/components/MainNav';
import { getProperties } from '@/app/actions/properties.actions';
import PropertiesClient from './PropertiesClient';

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-background">
      <MainNav />
      <PropertiesClient initialProperties={properties as any} />
      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
