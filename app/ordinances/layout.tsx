import { PublicHeader } from '@/components/public/PublicHeader';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <PublicHeader />
      
      {/* 
        UPDATED MAIN:
        - container: Sets a max-width based on screen size.
        - mx-auto: Centers the container horizontally.
        - px-4: Adds padding on the sides so text doesn't touch the screen edge on mobile.
        - py-8: Adds vertical spacing.
        - w-full: Ensures it takes full width available.
      */}
      <main className="flex-1 container mx-auto px-4 py-8 w-full">
        {children}
      </main>

      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} LegislateNow. All rights reserved.</p>
          <p className="mt-2">Your Window into Municipal Governance.</p>
        </div>
      </footer>
    </div>
  );
}