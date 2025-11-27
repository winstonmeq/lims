import { OrdinanceSearchFilters } from "@/components/public/OrdinanceSearchFilters";
import { OrdinanceCard } from "@/components/shared/OrdinanceCard";
import { getAllOrdinances } from "../actions/ordinanceActions";



export default async function OrdinancesPage() {


        const GetAllOrdinance = await getAllOrdinances();

  const publishedOrdinances = GetAllOrdinance.filter(o => o.status === 'Introduced');



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

      <OrdinanceSearchFilters />

      {publishedOrdinances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedOrdinances.map(ordinances => (
            <OrdinanceCard
              key={ordinances.id}
             ordinance={{
                ...ordinances,
                createdAt: new Date(ordinances.createdAt),
                updatedAt: new Date(ordinances.updatedAt),
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
