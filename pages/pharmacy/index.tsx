import Pharmacies from "@/components/Pharmacies";
import { getPharmacies, getPharmacyDetails } from "@/lib/data";

export default function Index({ pharmacies }) {
  return <Pharmacies pharmacies={pharmacies} />;
}

export async function getStaticProps({ params }) {
  const data = await getPharmacies();
  const { pharmacies } = data;

  // get the details of each pharmacy and resolve all into an array
  const getDetails = async () => {
    return await Promise.all(
      pharmacies.map(async (pharmacy) => {
        const result = await getPharmacyDetails(pharmacy.pharmacyId);
        return result;
      })
    );
  };

  const pharmacyDetails = await getDetails();

  // merge the data from pharmacy list and pharmacy details
  const mergedPharmacyDetails = pharmacies.map((pharmacy) => {
    const details = pharmacyDetails.find(
      (details) => details.id === pharmacy.pharmacyId
    );
    return { ...pharmacy, ...details };
  });

  return {
    props: {
      pharmacies: mergedPharmacyDetails,
    },
  };
}
