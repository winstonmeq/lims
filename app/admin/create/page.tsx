import { createBill } from "@/app/actions";

export default function CreateBillPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Draft New Legislation</h1>
      
      <form action={createBill} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bill Number</label>
            <input name="billNumber" required placeholder="e.g. HB-1024" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" className="w-full border rounded p-2">
              <option value="Introduced">Introduced</option>
              <option value="Committee">In Committee</option>
              <option value="First Reading">First Reading</option>
              <option value="Passed">Passed</option>
                <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input name="title" required placeholder="An Act to..." className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Author/Sponsor</label>
          <input name="author" required placeholder="Sen. John Doe" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea name="description" required rows={3} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Legislative Content</label>
          <textarea name="content" required rows={10} className="w-full border rounded p-2 font-mono text-sm" />
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded font-semibold hover:bg-slate-800 transition">
          Submit Bill
        </button>
      </form>
    </div>
  );
}