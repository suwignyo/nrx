import Link from "next/link";
import { useEffect, useState } from "react";
import { point } from "@turf/helpers";
import distance from "@turf/distance";

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
  const [sortedPharmacies, setSortedPharmacies] = useState<IPharmacy[]>([]);

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

  return (
    <div>
      {sortedPharmacies.length > 0 &&
        sortedPharmacies.map((pharmacy) => {
          return (
            <div key={pharmacy.pharmacyId}>
              <div>
                <Link href={`/pharmacy/${pharmacy.pharmacyId}`}>
                  {pharmacy.name}
                </Link>
              </div>
              <div>{pharmacy.distance.toFixed(2)} miles</div>
            </div>
          );
        })}
    </div>
  );
}
