import { getBills } from "@/app/actions";
import Link from "next/link";

export default async function BillsPage() {
  const bills = await getBills();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 border-b pb-2">Current Legislation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div key={bill._id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {bill.status}
              </span>
              <span className="text-sm text-slate-500">{bill.billNumber}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{bill.title}</h2>
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{bill.description}</p>
            <div className="text-xs text-slate-400 mb-4">Authored by: {bill.author}</div>
            
            <Link href={`/bills/${bill._id}`} className="text-blue-600 text-sm font-medium hover:underline">
              Read Full Text &rarr;
            </Link>
          </div>
        ))}
      </div>
      
      {bills.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No bills found in the database.</p>
      )}
    </div>
  );
}