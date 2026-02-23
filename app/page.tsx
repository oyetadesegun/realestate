import Link from 'next/link';
import Image from 'next/image';
import { MainNav } from '@/components/MainNav';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProperties } from '@/app/actions/properties.actions';
import { CheckCircle2, Building2, Wallet, Shield, MapPin, Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'Plus S+GN Real Estate - Land Ownership Made Accessible',
  description:
    'Empower individuals to own or invest in real estate through education, opportunity, and strategic execution.',
};

export default async function Home() {
  const allProperties = await getProperties();
  const featuredProperties = allProperties
    .filter((p: any) => p.featured)
    .slice(0, 3);

  // Fallback to latest properties if none are marked featured
  const displayProperties =
    featuredProperties.length > 0
      ? featuredProperties
      : allProperties.slice(0, 3);
  return (
    <main className="min-h-screen bg-background">
      <MainNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                Land Ownership <span className="text-primary">Made Accessible</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                We believe real estate should not be a luxury reserved for the few. It should be accessible to
                everyone – regardless of income level, background, or starting point.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/properties">
                  <Button className="bg-primary hover:bg-accent text-primary-foreground px-6 py-2 h-auto text-base">
                    Explore Properties
                  </Button>
                </Link>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-6 py-2 h-auto text-base">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop"
                alt="Hero"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 hidden md:block order-2">
              <Image
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop"
                alt="Mission"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="order-1">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                To empower individuals across all income brackets to own or invest in real estate, through education,
                opportunity, and strategic execution.
              </p>
              <div className="space-y-4">
                {[
                  'Land ownership should be accessible to everyone',
                  'Regardless of income level, background, or starting point',
                  'We bridge the gap between everyday Nigerians and property ownership',
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">About Plus S+GN</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <Building2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Founded on Trust</h3>
              <p className="text-foreground">
                Plus-Sign Real Estate is a Lagos-based company built on a simple belief: everyone deserves a piece of
                the land.
              </p>
            </Card>
            <Card className="p-6">
              <Wallet className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Expert Leadership</h3>
              <p className="text-foreground">
                Founded by David B Idachaba, a real estate professional with over six years of cumulative industry
                experience.
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Secure & Transparent</h3>
              <p className="text-foreground">
                Every transaction is backed by escrow-protected funds, lawyer-drafted agreements, and transparent fees.
              </p>
            </Card>
          </div>

          <div className="bg-primary/5 border-l-4 border-primary p-8 rounded">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Pathways to Ownership</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">Property Circle</h4>
                <p className="text-foreground text-sm">
                  Group ownership for first-timers and small savers looking to build their portfolio.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Co-Investment Shares</h4>
                <p className="text-foreground text-sm">
                  Fractional ownership with monthly rental income opportunities for diversified investors.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Land Financing</h4>
                <p className="text-foreground text-sm">
                  Structured loans through licensed partners to make property ownership more accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-3">Featured Properties</h2>
            <p className="text-lg text-muted-foreground">Discover our carefully curated selection of premium properties</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {displayProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties">
              <Button className="bg-primary hover:bg-accent text-primary-foreground px-8 py-2 h-auto text-base">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose Plus S+GN?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Escrow-Protected Funds',
                description: 'Your investment is protected with secure escrow accounts managed by financial institutions.',
              },
              {
                title: 'Lawyer-Drafted Agreements',
                description: 'All agreements are prepared by experienced legal professionals to protect your interests.',
              },
              {
                title: 'Transparent Fees',
                description: 'No hidden charges. We believe in clear, upfront pricing for all our services.',
              },
              {
                title: 'Licensed Partnerships',
                description: 'We partner with only licensed and verified institutional partners for financing.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-secondary rounded-lg border border-border hover:border-primary transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Real Estate Journey?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Explore our properties and take the first step towards owning your piece of Nigeria
          </p>
          <Link href="/properties">
            <Button className="bg-primary-foreground text-primary hover:bg-accent/50 px-8 py-2 h-auto text-base">
              Browse Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-foreground">Location</h3>
              <p className="text-muted-foreground">Lagos, Nigeria</p>
            </Card>
            <Card className="p-8 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-foreground">Phone</h3>
              <p className="text-muted-foreground">+234 906 846 5685</p>
            </Card>
            <Card className="p-8 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-foreground">Email</h3>
              <p className="text-muted-foreground">davisbeen@gmail.com</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8">
                  <Image src="/logo.png" alt="Plus S+GN" fill className="object-cover rounded" />
                </div>
                <span className="font-bold text-primary">Plus S+GN</span>
              </div>
              <p className="text-sm text-muted-foreground">Land should not be a luxury. It should be accessible.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/properties" className="hover:text-primary transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Investment Paths</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Property Circle</li>
                <li>Co-Investment Shares</li>
                <li>Land Financing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Socials</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://instagram.com/plussign_realestateltd" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Instagram: @plussign_realestateltd
                  </a>
                </li>
              </ul>
              <h4 className="font-semibold mt-6 mb-4 text-foreground">Admin</h4>
              <Link href="/admin/login" className="text-sm text-primary hover:text-accent transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Plus S+GN Real Estate LTD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
