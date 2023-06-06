"use client";
import { useGlobalContext } from "@/context/store";
import { useState } from "react";

const Medications = ({ medications, pharmacyId }) => {
  const [selectedMedications, setSelectedMedications] = useState([]);

  const onOptionChangeHandler = (event) => {
    setSelectedMedications([...selectedMedications, event.target.value]);
  };

  const { setOrders, orders } = useGlobalContext();

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
      <button
        onClick={() =>
          setOrders([
            { medications: selectedMedications, pharmacyId: pharmacyId },
          ])
        }
      >
        Order
      </button>
    </div>
  );
};

export default Medications;
