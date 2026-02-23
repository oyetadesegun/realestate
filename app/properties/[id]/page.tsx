import { getPropertyById, getProperties } from '@/app/actions/properties.actions';
import { MapPin, Phone, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import { PropertyDetailsClient } from '@/components/PropertyDetailsClient';
import { MainNav } from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { PropertyGallery } from '@/components/PropertyGallery';
import { Card } from '@/components/ui/card';
import { PropertyFeatures } from '@/components/PropertyFeatures';
import { PropertyCard } from '@/components/PropertyCard';

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PropertyDetailsPageProps) {
  const { id } = await params;
  const property = await getPropertyById(parseInt(id));

  return {
    title: property ? `${property.title} - Plus S+GN` : 'Property Details',
    description: property?.location || 'View property details',
  };
}

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  const property = await getPropertyById(id);

  if (!property) {
    return (
      <main>
        <MainNav />
        <div className="max-w-7xl auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground">Property not found</h1>
          <Link href="/properties">
            <Button className="mt-6 bg-primary hover:bg-accent">Back to Properties</Button>
          </Link>
        </div>
      </main>
    );
  }

  const allProperties = await getProperties();
  const relatedProperties = allProperties
    .filter((p) => p.id !== id && p.location === property.location)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <MainNav />

      {/* Property Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/properties">
            <Button variant="outline">← Back to Properties</Button>
          </Link>
          <Button variant="outline" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Basic Info */}
            <Card className="p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg">
                  <span className="text-primary font-semibold">
                    {property.status === 'ForRent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">
                ₦{(property.price / 1_000_000).toFixed(1)}M
              </p>
            </Card>

            {/* Description */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">About this Property</h2>
              <p className="text-lg text-foreground leading-relaxed">{property.description}</p>
            </Card>

            {/* Features */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Property Features</h2>
              <PropertyFeatures
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                type={property.propertyType as any}
              />
            </Card>

            {/* Location Map Placeholder */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Location</h2>
              <div className="bg-secondary h-80 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">{property.location}, Lagos</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-8">
            {/* Contact Card */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Get In Touch</h3>
              <PropertyDetailsClient property={property as any} />

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">+234 906 846 5685</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">davisbeen@gmail.com</span>
                </div>
              </div>
            </Card>

            {/* Quick Facts */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Type</span>
                  <span className="font-semibold text-foreground">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold text-foreground">
                    {property.status === 'ForRent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
            </Card>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Similar Properties in {property.location}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard key={relatedProperty.id} property={relatedProperty as any} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border mt-16 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/plussign_realestateltd" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Instagram: @plussign_realestateltd
            </a>
          </div>
          <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
