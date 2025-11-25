import { getBillById } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function BillDetail({ params }: { params: { id: string } }) {
  const bill = await getBillById(params.id);

  if (!bill) return notFound();

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{bill.title}</h1>
          <p className="text-slate-500 mt-1">Bill No: {bill.billNumber}</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
            {bill.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <span className="font-semibold text-slate-700">Author:</span> {bill.author}
        </div>
        <div>
          <span className="font-semibold text-slate-700">Date Introduced:</span> {new Date(bill.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="mb-6 text-slate-700 bg-slate-50 p-4 rounded">{bill.description}</p>
        
        <h3 className="text-lg font-semibold mb-2">Full Text</h3>
        <div className="whitespace-pre-wrap text-slate-800 font-serif leading-relaxed">
          {bill.content}
        </div>
      </div>
    </div>
  );
}