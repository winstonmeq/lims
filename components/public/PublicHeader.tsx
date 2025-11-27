import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Gavel, Search } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 
         CHANGES MADE:
         1. mx-auto: Centers the container horizontally.
         2. px-4: Adds breathing room on the sides.
      */}
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        
        {/* Desktop Logo */}
        <div className="mr-4 hidden md:flex">
          <Logo isLink />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          
          {/* Mobile Menu & Logo Section */}
          <div className="flex items-center w-full md:w-auto md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <div className="mb-6">
                   <Logo isLink />
                </div>
                <nav className="flex flex-col gap-4">
                  <Link href="/ordinances" className="flex items-center gap-2 font-semibold text-sm hover:text-primary">
                    <Gavel className="h-4 w-4" />
                    Ordinances
                  </Link>
                  <Link href="/search" className="flex items-center gap-2 font-semibold text-sm hover:text-primary">
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="flex-1">
                <Link href="/" aria-label="Home" className="flex items-center">
                     <Logo />
                </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="/ordinances"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Ordinances & Resolutions
            </Link>
          </nav>

          {/* Action Button */}
          <Button asChild size="sm" className="ml-4">
            <Link href="/login">Admin Portal</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}