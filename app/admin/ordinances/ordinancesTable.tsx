'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Ordinance } from "@/lib/definitions";
import { committees } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrdinanceSearchFilters } from "@/components/public/OrdinanceSearchFilters";

// Ordinances Table Component
import React, { useState } from "react";

export function OrdinancesTable({ ordinances }: { ordinances: Ordinance[] }) {
    const [filteredOrdinances, setFilteredOrdinances] = useState<Ordinance[]>(ordinances);

    return (
        <div>
            <div>
                <OrdinanceSearchFilters setResults={setFilteredOrdinances} />
            </div>
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
                {filteredOrdinances.map(ordinance => {
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
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/ordinances/${ordinance.id}/edit`}>
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
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
                </div>

    )
}
