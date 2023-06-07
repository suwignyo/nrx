import Pharmacies from "@/components/Pharmacies";
import { getPharmacies, getPharmacyDetails } from "@/lib/data";

export type Pharmacy = {
  pharmacyId: string;
  name: string;
};

export default async function Home() {
  const data = await getPharmacies();
  const { pharmacies } = data;
  const getDetails = async () => {
    return await Promise.all(
      pharmacies.map(async (pharmacy: Pharmacy) => {
        const result = await getPharmacyDetails(pharmacy.pharmacyId);
        return result;
      })
    );
  };

  const pharmacyDetails = await getDetails();

  // merge the data from pharmacy list and pharmacy details
  const mergedPharmacyDetails = pharmacies.map((pharmacy: Pharmacy) => {
    const details = pharmacyDetails.find(
      (details) => details.id === pharmacy.pharmacyId
    );
    return { ...pharmacy, ...details };
  });

  return (
    <>
      <header>Please select a pharmacy</header>
      <Pharmacies pharmacies={mergedPharmacyDetails} />
    </>
  );
}
