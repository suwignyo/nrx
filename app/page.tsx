import Pharmacies from "@/components/Pharmacies";
import { getMedications, getPharmacies } from "@/lib/data";
// import Image from "next/image";

export default async function Home() {
  const pharmaciesData = getPharmacies();
  const medicationsData = getMedications();
  const [pharmacies, medications] = await Promise.all([
    pharmaciesData,
    medicationsData,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Pharmacies pharmacies={pharmacies.pharmacies} />
      </div>
    </main>
  );
}
