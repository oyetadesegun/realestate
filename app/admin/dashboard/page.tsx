import { AdminNav } from '@/components/AdminNav';
import { getProperties } from '@/app/actions/properties.actions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, Home, FileText, TrendingUp, Plus } from 'lucide-react';
import DashboardProperties from './DashboardProperties';

export const metadata = {
  title: 'Admin Dashboard - Plus S+GN',
};

export default async function AdminDashboardPage() {
  const allProperties = await getProperties();
  const adminProperties = allProperties.slice(0, 6);

  const stats = [
    {
      label: 'Total Properties',
      value: allProperties.length,
      icon: Home,
      color: 'text-primary',
    },
    {
      label: 'Active Listings',
      value: allProperties.filter((p) => p.status === 'ForSale').length,
      icon: BarChart3,
      color: 'text-accent',
    },
    {
      label: 'For Rent',
      value: allProperties.filter((p) => p.status === 'ForRent').length,
      icon: FileText,
      color: 'text-primary',
    },
    {
      label: 'Total Value',
      value: `₦${(
        allProperties.reduce((sum, p) => sum + p.price, 0) / 1_000_000_000
      ).toFixed(1)}B`,
      icon: TrendingUp,
      color: 'text-accent',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <Link href="/admin/add-property">
            <Button className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2 h-auto py-2">
              <Plus className="w-5 h-5" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Properties Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Properties</h2>
            <Link href="/admin/properties">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <DashboardProperties initialProperties={adminProperties as any} />
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/add-property">
                <Button variant="outline" className="w-full justify-start h-auto py-2">
                  + Add New Property
                </Button>
              </Link>
              <Link href="/admin/properties">
                <Button variant="outline" className="w-full justify-start h-auto py-2">
                  View All Properties
                </Button>
              </Link>
              <Link href="/admin/bookings">
                <Button variant="outline" className="w-full justify-start h-auto py-2">
                  Manage Bookings
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 bg-accent/5 border-accent/20">
            <h3 className="text-xl font-semibold text-foreground mb-4">Portfolio Summary</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-semibold text-foreground">
                    {allProperties.length > 0 ? 'Recently Updated' : 'No Data'}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: allProperties.length > 0 ? '100%' : '0%' }}></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Manage your real estate portfolio effectively from this dashboard. Track listings, status, and client inquiries.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <footer className="bg-muted py-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
