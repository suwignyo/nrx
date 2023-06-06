import { getPharmacyDetails, getPharmacyIds } from "@/lib/data";
import Link from "next/link";

export default function Pharmacy({ pharmacyData }) {
  return (
    <div>
      <Link href="/">home</Link>
      <p>{pharmacyData.name}</p>
      <p>{pharmacyData.address.streetAddress1}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getPharmacyIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pharmacyData = await getPharmacyDetails(params.id);
  return {
    props: {
      pharmacyData,
    },
  };
}
