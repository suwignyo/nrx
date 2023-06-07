"use client";
import { useGlobalContext } from "@/context/store";

export default function CurrentOrder({ pharmacyId }) {
  const { orders } = useGlobalContext();
  const order = orders.find((ord) => ord.pharmacyId === pharmacyId);

  if (!order) return;
  return (
    <>
      <h3 className="mt-4">Current order</h3>
      <div className="overflow-x-auto h-96">
        <table className="table table-pin-rows">
          <tbody>
            {order.medications.map((med) => {
              return (
                <tr key={med}>
                  <td>{med}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
