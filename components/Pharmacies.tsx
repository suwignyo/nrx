"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";

type IPharmacy = {
  name: string;
  pharmacyId: string;
  address: {
    latitude: string;
    longitude: string;
  };
  distance: number;
};

interface IPharmacies {
  pharmacies: IPharmacy[];
}

const from = point([-122.22652739630438, 37.48771670017411]);
const options = { units: "miles" };
export default function Pharmacies({ pharmacies }: IPharmacies) {
  const { orders } = useGlobalContext();
  const [sortedPharmacies, setSortedPharmacies] = useState<IPharmacy[]>([]);
  const router = useRouter();
  useEffect(() => {
    const pharmaciesWithDistance = pharmacies.map((pharmacy) => {
      const to = point([
        +pharmacy.address.longitude,
        +pharmacy.address.latitude,
      ]);
      const distanceInMiles = distance(from, to, options);
      return { ...pharmacy, distance: distanceInMiles };
    });
    setSortedPharmacies(
      pharmaciesWithDistance.sort((a, b) => a.distance - b.distance)
    );
  }, [pharmacies]);

  const onOrderNearest = () => {
    router.push(`/pharmacy/${sortedPharmacies[0].pharmacyId}`);
  };
  return (
    <>
      <div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => onOrderNearest()}
        >
          Order from nearest pharmacy
        </button>
      </div>
      {sortedPharmacies.length > 0 &&
        sortedPharmacies.map((pharmacy) => {
          const order = orders.find(
            (order) => order.pharmacyId === pharmacy.pharmacyId
          );
          return (
            <div
              className="card w-96 bg-base-100 shadow-xl mt-2"
              key={pharmacy.pharmacyId}
              data-tip={`${!!order && "You have an order in progress"}`}
            >
              <Link href={`/pharmacy/${pharmacy.pharmacyId}`}>
                <div className="card-body">
                  <h2 className="card-title"> {pharmacy.name}</h2>
                  <div className="self-start">
                    {pharmacy.distance.toFixed(2)} miles
                  </div>

                  {!!order && (
                    <div className="card-actions justify-end">
                      <div className="badge badge-warning">in progress</div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
}
