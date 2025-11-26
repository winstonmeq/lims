import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
// import { ordinances } from "@/lib/data";
import { Activity, ArrowUpRight, FileText, Gavel, CheckCircle, Clock } from "lucide-react";
import Link from 'next/link';
import { getBills } from "../actions";

export default async function AdminDashboard() {

    const ordinances = await getBills();
    


    const stats = {
        drafts: ordinances.filter(o => o.status === 'Introduced').length,
        inReview: ordinances.filter(o => o.status === 'In Committee').length,
        approved: ordinances.filter(o => o.status === 'First Reading').length,
        published: ordinances.filter(o => o.status === 'Passed').length,
        rejected: ordinances.filter(o => o.status === 'Rejected').length,

    };

    const recentOrdinances = [...ordinances].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of legislative activity.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Draft</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <p className="text-xs text-muted-foreground">items being drafted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inReview}</div>
             <p className="text-xs text-muted-foreground">items pending committee review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
             <p className="text-xs text-muted-foreground">items awaiting publication</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
             <p className="text-xs text-muted-foreground">total published items</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                 <div className="grid gap-2">
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Recently updated ordinances and resolutions.</CardDescription>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/ordinances">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="text-right">Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrdinances.map(ord => (
                            <TableRow key={ord._id}>
                                <TableCell>
                                    <div className="font-medium">{ord.title}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {ord.billNumber}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <StatusBadge status={ord.status as any} />
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {new Date(ord.updatedAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
