"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { searchOrdinances } from "../../app/actions/ordinanceActions";
import type { Ordinance } from "@/lib/definitions";

type Props = {
  setResults: (res: Ordinance[]) => void; // setter from parent
};

export function OrdinanceSearchFiltersAdmin({ setResults }: Props) {
  const [keyword, setKeyword] = useState("");
  const [committee, setCommittee] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const found = await searchOrdinances(keyword, committee);
    setResults(found); // update parent state
    setLoading(false);
  };

  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Keyword Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Search by keyword
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g. 'zoning', 'budget', '2023-001'"
              className="pl-10"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* Committee Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Filter by committee
          </label>
          <Select value={committee} onValueChange={(v) => setCommittee(v)}>
            <SelectTrigger>
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

        {/* Search Button */}
        <div>
          <Button
            onClick={handleSearch}
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
          >
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
}
