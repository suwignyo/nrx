"use client";
import { useGlobalContext } from "@/context/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import remove from "../../../../public//remove.png";
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

  const onRemoveMedication = (item: string) => {
    setSelectedMedications(
      selectedMedications.filter((medication) => medication !== item)
    );
  };

  const { setOrders } = useGlobalContext();

  return (
    <div className="">
      <div className="w-96">
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
      <div className="overflow-x-auto h-96 w-48">
        <table className="table table-pin-rows">
          <tbody>
            {selectedMedications.map((medication) => (
              <tr key={medication}>
                <td>{medication}</td>
                <td>
                  <div className="w-4 h-4 rounded">
                    <Image
                      src={remove}
                      alt="checkmark"
                      onClick={() => onRemoveMedication(medication)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`${selectedMedications.length === 0 && "tooltip"}`}
        data-tip={`${
          selectedMedications.length === 0 &&
          "Please select at least one medication"
        }`}
      >
        <button
          className="btn btn-primary"
          onClick={() => {
            if (selectedMedications.length > 0) {
              setOrders((prevState) => [
                ...prevState,
                { medications: selectedMedications, pharmacyId: pharmacyId },
              ]);
              router.push("/");
            }
          }}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Medications;
