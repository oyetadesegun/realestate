'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt="Plus S+GN"
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <div className="font-bold text-lg text-primary">Plus S+GN</div>
              <div className="text-xs text-muted-foreground">Real Estate</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/properties" className="text-foreground hover:text-primary transition-colors">
              Properties
            </Link>
            <Link href="/#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-accent text-primary-foreground">
                Sign Up
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
            <Link href="/#about">
              <button className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md">
                About
              </button>
            </Link>
            <Link href="/properties">
              <button className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md">
                Properties
              </button>
            </Link>
            <Link href="/#contact">
              <button className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md">
                Contact
              </button>
            </Link>
            <Link href="/login">
              <button className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <Button className="w-full bg-primary hover:bg-accent text-primary-foreground mt-2">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
