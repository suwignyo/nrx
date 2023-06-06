"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type PharmacyOrder = {
  pharmacyId: string;
  medications: string[];
};
interface Meds {
  pharmacyOrder: PharmacyOrder;
}

interface ContextProps {
  orders: Meds[];
  setOrders: Dispatch<SetStateAction<Meds[]>>;
}

const GlobalContext = createContext<ContextProps>({
  orders: [],
  setOrders: (): Meds[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [orders, setOrders] = useState<[] | Meds[]>([]);

  console.log("orders", orders);
  return (
    <GlobalContext.Provider value={{ orders, setOrders }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
