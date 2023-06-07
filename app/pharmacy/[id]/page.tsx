import { getPharmacyDetails } from "@/lib/data";
import Link from "next/link";
import CurrentOrder from "./CurrentOrder";
import OrderButton from "./OrderButton";

export default async function Page({ params }) {
  const pharmacyData = await getPharmacyDetails(params.id);

  return (
    <div>
      <h3>Pharmacy Details</h3>

      <div className="mt-4 card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{pharmacyData.name}</h2>
          <p>
            {pharmacyData.address.streetAddress1}, {pharmacyData.address.city},{" "}
            {pharmacyData.address.postalCode},{" "}
            {pharmacyData.address.usTerritory}
          </p>
          <p>{pharmacyData.primaryPhoneNumber}</p>
          <p>{pharmacyData.pharmacyHours}</p>
          <div className="card-actions justify-end">
            <OrderButton pharmacyId={params.id} />
          </div>
        </div>
      </div>

      <CurrentOrder pharmacyId={params.id} />
    </div>
  );
}
