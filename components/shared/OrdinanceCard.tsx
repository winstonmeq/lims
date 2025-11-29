import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FileText, Gavel } from 'lucide-react';
import type { Ordinance } from '@/lib/definitions';
import { committees } from '@/lib/data';

type OrdinanceCardProps = {
  ordinance: Ordinance;
};

export function OrdinanceCard({ ordinance }: OrdinanceCardProps) {
  const committee = committees.find(c => c.id === ordinance.committeeId);
  const formattedDate = new Date(ordinance.createdAt || ordinance.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">
            <Link href={`/ordinances/${ordinance.id}`} className="hover:text-primary transition-colors">
              {ordinance.title}
            </Link>
          </CardTitle>
          <StatusBadge status={ordinance.status} />
        </div>
        <CardDescription className="font-semibold text-primary">{ordinance.ordinanceNumber}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{ordinance.fullText}</p>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Gavel className="h-4 w-4 text-green-600" />
            <span>{committee?.name || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-700" />
            <span>{ordinance.status === 'Passed' ? 'Rejected' : 'Updated'}: {formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <Link href={`/ordinances/${ordinance.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
