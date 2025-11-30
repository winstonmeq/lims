export const dynamic = "force-dynamic";



import { councilors, committees } from '@/lib/data';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Gavel, User, CheckCircle, XCircle, MinusCircle, UserX } from 'lucide-react';
import type { VoteValue } from '@/lib/definitions';
import { getOrdinance } from '@/app/actions/ordinanceActions';
import { Textarea } from '@/components/ui/textarea';



type VoteIconMap = Record<VoteValue, React.ReactNode>;

const voteIcons: VoteIconMap = {
    'Aye': <CheckCircle className="h-5 w-5 text-green-600" />,
    'Nay': <XCircle className="h-5 w-5 text-red-600" />,
    'Abstain': <MinusCircle className="h-5 w-5 text-gray-500" />,
    'Absent': <UserX className="h-5 w-5 text-gray-400" />
};

export default async function OrdinanceDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const result = await getOrdinance(id);

   

    if (!result.success || !result.ordinance) {
      notFound();
    }

    const ordinance = result.ordinance;



  if (!ordinance) {
    notFound();
  }

  const author = councilors.find(c => c.id === ordinance.authorId);
  const committee = committees.find(c => c.id === ordinance.committeeId);
 

  return (
    <div className="container py-10">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-primary">{ordinance.ordinanceNumber}</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-headline">{ordinance.title}</h1>
          </div>
          <StatusBadge status={ordinance.status} className="text-base px-4 py-1.5 md:mt-2" />
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w">{ordinance.summary}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 mt-1 text-green-700 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Author</h4>
                  <p className="text-muted-foreground">{author?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gavel className="h-4 w-4 mt-1 text-green-700 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Committee</h4>
                  <p className="text-muted-foreground">{committee?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-green-800 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Published Date</h4>
                  <p className="text-muted-foreground">
                    {ordinance.publishedAt ? new Date(ordinance.publishedAt).toLocaleDateString() : 'Not Published'}
                  </p>
                </div>
              </div>
               {/* <Button className="w-full mt-4" disabled={!ordinance.versions.at(-1)?.url}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button> */}
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3">
          <Tabs defaultValue="full-text">
            <TabsList>
              <TabsTrigger value="full-text">Full Text</TabsTrigger>
              <TabsTrigger value="votes">Voting Record</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>
            <TabsContent value="full-text" className="mt-4">
              <Card>
                <CardContent className="p-6 prose dark:prose-invert max-w-none">
                 <p className="whitespace-pre-line">
                  {ordinance.fullText}
                </p>
               
                </CardContent>
              </Card>
            </TabsContent>
          
          </Tabs>
        </div>
      </div>
    </div>
  );
}
