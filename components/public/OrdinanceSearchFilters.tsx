'use client';

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function OrdinanceSearchFilters() {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">
            Search by keyword
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="e.g. 'zoning', 'budget', '2023-001'" className="pl-10" />
          </div>
        </div>
        <div>
          <label htmlFor="committee" className="block text-sm font-medium text-muted-foreground mb-1">
            Filter by committee
          </label>
          <Select>
            <SelectTrigger id="committee">
              <SelectValue placeholder="All Committees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Committees</SelectItem>
              <SelectItem value="com1">Finance and Budget</SelectItem>
              <SelectItem value="com2">Public Safety</SelectItem>
              <SelectItem value="com3">Zoning and Planning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button className="w-full bg-accent hover:bg-accent/90">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
