import { getMedications, getPharmacyIds } from "@/lib/data";
import { useState } from "react";

export default function Index({ medications }) {
  const [selectedMedications, setSelectedMedications] = useState([]);

  const onOptionChangeHandler = (event) => {
    setSelectedMedications([...selectedMedications, event.target.value]);
  };
  return (
    <div>
      {selectedMedications.map((medication) => (
        <li key={medication}>{medication}</li>
      ))}
      <select onChange={onOptionChangeHandler}>
        {medications.map((med: string) => {
          return <option key={med}>{med}</option>;
        })}
      </select>
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
  const data = await getMedications();
  const { pharmacies } = data;

  return {
    props: {
      medications: pharmacies,
    },
  };
}
