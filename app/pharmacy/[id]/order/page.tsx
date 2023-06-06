import { getMedications } from "@/lib/data";
import Medications from "./Medications";

export default async function Page({ params }) {
  const data = await getMedications();
  const { pharmacies: medications } = data;

  return <Medications medications={medications} pharmacyId={params.id} />;
}
