'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function AdminNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="Plus S+GN"
                fill
                className="object-cover rounded"
              />
            </div>
            <span className="font-bold text-lg">Admin</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="text-primary-foreground hover:bg-accent/20">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/add-property">
              <Button variant="ghost" className="text-primary-foreground hover:bg-accent/20">
                Add Property
              </Button>
            </Link>
            <Link href="/admin/properties">
              <Button variant="ghost" className="text-primary-foreground hover:bg-accent/20">
                My Properties
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="ghost" className="text-primary-foreground hover:bg-accent/20">
                Bookings
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                View Site
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                Logout
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-accent/20">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/add-property">
              <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-accent/20">
                Add Property
              </Button>
            </Link>
            <Link href="/admin/properties">
              <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-accent/20">
                My Properties
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-accent/20">
                Bookings
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                View Site
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" className="w-full text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                Logout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
