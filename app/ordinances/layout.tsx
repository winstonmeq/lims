import { PublicHeader } from '@/components/public/PublicHeader';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-muted py-8">
        <div className="container text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} LegislateNow. All rights reserved.</p>
          <p className="mt-2">Your Window into Municipal Governance.</p>
        </div>
      </footer>
    </div>
  );
}
