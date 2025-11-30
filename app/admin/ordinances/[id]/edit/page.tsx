export const dynamic = "force-dynamic";


import { getOrdinance } from "@/app/actions/ordinanceActions";
import EditOrdinanceForm from "./EditOrdinanceForm";
import { notFound } from "next/navigation";

export default async function EditOrdinancePage({ params }: {params: Promise<{ id: string }>}) {

    const { id } = await params;

  const result = await getOrdinance(id);


  if (!result.success || !result.ordinance) {
    notFound();
  }

  const ordinance = JSON.parse(JSON.stringify(result.ordinance));

  console.log('ordinance result', ordinance)

//   const ordinance = result.ordinance;

  if (!ordinance) {
    return <div className="p-4">Ordinance not found.</div>;
  }

  return <EditOrdinanceForm ordinance={ordinance} />;
}