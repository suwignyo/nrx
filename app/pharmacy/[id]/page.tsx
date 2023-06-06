import { getPharmacyDetails } from "@/lib/data";
import Link from "next/link";

export default async function Page({ params }) {
  const pharmacyData = await getPharmacyDetails(params.id);

  return (
    <div>
      <p>{pharmacyData.name}</p>
      <p>
        {pharmacyData.address.streetAddress1}, {pharmacyData.address.city},{" "}
        {pharmacyData.address.postalCode}, {pharmacyData.address.usTerritory}
      </p>
      <p>{pharmacyData.primaryPhoneNumber}</p>
      <p>{pharmacyData.pharmacyHours}</p>

      <Link href={`pharmacy/${params.id}/order`}>
        <button>Order</button>
      </Link>
    </div>
  );
}
