"use client";

import { useEffect, useState } from "react";
import { OrdinanceSearchFilters } from "@/components/public/OrdinanceSearchFilters";
import { OrdinanceCard } from "@/components/shared/OrdinanceCard";
import { getAllOrdinances, searchOrdinances } from "../actions/ordinanceActions";
import type { Ordinance } from "@/lib/definitions";

export default function OrdinancesPage() {
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all ordinances on first render
  useEffect(() => {
    async function fetchAll() {
      const all = await getAllOrdinances();
      const published = all.filter(o => o.status === 'Passed' || o.status === 'In Committee');
      setOrdinances(published);
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="container py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
          Ordinances & Resolutions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the official legislative records of our municipality. Search, filter, and view all published ordinances and resolutions.
        </p>
      </section>

      {/* Pass the state setter to your search component */}
      <OrdinanceSearchFilters setResults={setOrdinances} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : ordinances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordinances.map(o => (
            <OrdinanceCard
              key={o.id}
              ordinance={{
                ...o,
                createdAt: new Date(o.createdAt),
                updatedAt: new Date(o.updatedAt),
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">No Published Items</h2>
          <p className="mt-2 text-muted-foreground">There are currently no published ordinances or resolutions to display.</p>
        </div>
      )}
    </div>
  );
}
