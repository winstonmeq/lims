import { Gavel } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className, isLink = false }: { className?: string; isLink?: boolean }) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary p-2 rounded-lg">
        <Gavel className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight text-primary-dark dark:text-primary-light hidden sm:inline-block">
        LegislateNow
      </span>
    </div>
  );

  if (isLink) {
    return <Link href="/" aria-label="Home">{content}</Link>;
  }

  return content;
}
