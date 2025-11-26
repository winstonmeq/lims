import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Gavel, Search } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo isLink />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile menu and logo */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <Logo isLink />
                <nav className="mt-8 flex flex-col gap-4">
                  <Link href="/ordinances" className="flex items-center gap-2 font-semibold">
                    <Gavel className="h-4 w-4" />
                    Ordinances
                  </Link>
                  <Link href="/search" className="flex items-center gap-2 font-semibold">
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="md:hidden flex-1">
                <Link href="/" aria-label="Home" className="flex items-center space-x-2">
                     <Logo />
                </Link>
            </div>
          </div>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link
              href="/ordinances"
              className="font-semibold text-foreground/80 transition-colors hover:text-foreground"
            >
              Ordinances & Resolutions
            </Link>
          </nav>
          <Button asChild>
            <Link href="/login">Admin Portal</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
