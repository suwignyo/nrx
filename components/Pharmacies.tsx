"use client";

import Link from "next/link";

interface IPharmacies {
  pharmacies: {
    name: string;
    pharmacyId: string;
  }[];
}
export default function Pharmacies({ pharmacies }: IPharmacies) {
  return (
    <div>
      {pharmacies.length > 0 &&
        pharmacies.map((pharmacy) => {
          return (
            <div key={pharmacy.pharmacyId}>
              <Link href={`/pharmacy/${pharmacy.pharmacyId}`}>
                {pharmacy.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
