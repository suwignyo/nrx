"use client";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";

export default function OrderButton({ pharmacyId }) {
  const router = useRouter();
  const { orders } = useGlobalContext();
  const order = orders.find((ord) => ord.pharmacyId === pharmacyId);

  return (
    <div
      className={`${order && "tooltip tooltip-right tooltip-warning"}`}
      data-tip={`${order && "You already have an order in progress"}`}
    >
      <button
        className={`btn btn-primary ${order && "btn-disabled btn-neutral"}`}
        onClick={() => router.push(`pharmacy/${pharmacyId}/order`)}
      >
        Order
      </button>
    </div>
  );
}
