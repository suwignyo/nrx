"use client";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IMedications {
  medications: string[];
  pharmacyId: string;
}
const Medications = ({ medications, pharmacyId }: IMedications) => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const router = useRouter();
  const onOptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedMedications([...selectedMedications, event.target.value]);
  };

  const { setOrders, orders } = useGlobalContext();

  return (
    <div className="">
      <div className="">
        <select
          onChange={(e) => onOptionChangeHandler(e)}
          className="select w-full max-w-xs"
        >
          <option disabled selected>
            Select your medication
          </option>
          {medications.map((med: string) => {
            return <option key={med}>{med}</option>;
          })}
        </select>
      </div>
      <div className="overflow-x-auto h-96">
        <table className="table table-pin-rows">
          <tbody>
            {selectedMedications.map((medication) => (
              <tr key={medication}>
                <td>{medication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          setOrders((prevState) => [
            ...prevState,
            { medications: selectedMedications, pharmacyId: pharmacyId },
          ]);
          router.push("/");
        }}
      >
        Order
      </button>
    </div>
  );
};

export default Medications;
