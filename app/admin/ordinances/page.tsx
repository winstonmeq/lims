import Link from "next/link";
import {
  File,
  PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Ordinance, OrdinanceStatus } from "@/lib/definitions";
import { committees } from "@/lib/data";

import { getAllOrdinances } from "@/app/actions/ordinanceActions";

async function OrdinancesTable({ ordinances }: { ordinances: Ordinance[] }) {

    const allOrdinance = await getAllOrdinances();

      console.log(allOrdinance)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Committee</TableHead>
                <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ordinances.map(ordinance => {
                    const committee = committees.find(c => c.id === ordinance.committeeId);
                    return (
                        <TableRow key={ordinance.id}>
                            <TableCell className="font-medium">{ordinance.ordinanceNumber}</TableCell>
                            <TableCell>{ordinance.title}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                <StatusBadge status={ordinance.status} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{committee?.name || "N/A"}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {new Date(ordinance.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Publish</DropdownMenuItem>
                                    <DropdownMenuItem>View Public Page</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}

export default async function OrdinancesAdminPage() {

    const allOrdinance = await getAllOrdinances();

    const tabs: { name: OrdinanceStatus | 'All'; count: number }[] = [
        { name: 'All', count: allOrdinance.length },
        { name: 'Introduced', count: allOrdinance.filter(o => o.status === 'Introduced').length },
        { name: 'In Committee', count: allOrdinance.filter(o => o.status === 'In Committee').length },
        { name: 'First Reading', count: allOrdinance.filter(o => o.status === 'First Reading').length },
        { name: 'Passed', count: allOrdinance.filter(o => o.status === 'Passed').length },
    ];

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Ordinances</h1>
                <p className="text-muted-foreground">Manage all legislative items for the municipality.</p>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" asChild>
                    <Link href="/admin/ordinances/create">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Ordinance
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Legislation List</CardTitle>
                <CardDescription>
                An overview of all ordinances, both past and present.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="All">
                    <TabsList>
                        {tabs.map(tab => (
                            <TabsTrigger key={tab.name} value={tab.name}>
                                {tab.name}
                                <span className="ml-2 bg-muted-foreground/10 text-muted-foreground rounded-full px-2 py-0.5 text-xs">{tab.count}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="All">
                        <OrdinancesTable ordinances={allOrdinance} />
                    </TabsContent>
                    {(tabs.filter(t => t.name !== 'All') as { name: OrdinanceStatus; count: number }[]).map(tab => (
                        <TabsContent key={tab.name} value={tab.name}>
                            <OrdinancesTable ordinances={allOrdinance.filter(o => o.status === tab.name)} />
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
