"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ParkingLot = {
  id: string;
  image: string;
  live_date: string;
  name: string;
  size: string;
  status: string;
  type: string;
  address: string;
};

export type ParkingLotsContextType = {
  goodLots: ParkingLot[];
  badLots: ParkingLot[];
  addGoodLot: (lot: ParkingLot) => void;
  addBadLot: (lot: ParkingLot) => void;
};

const ParkingLotsContext = createContext<ParkingLotsContextType | undefined>(
  undefined
);

export const ParkingLotsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [goodLots, setGoodLots] = useState<ParkingLot[]>([]);
  const [badLots, setBadLots] = useState<ParkingLot[]>([]);

  const addGoodLot = (lot: ParkingLot) => {
    setGoodLots((prevGoodLots) => {
      if (prevGoodLots.some((goodLot) => goodLot.id === lot.id)) {
        return prevGoodLots;
      }
      if (badLots.some((badLot) => badLot.id === lot.id)) {
        setBadLots((prevBadLots) =>
          prevBadLots.filter((badLot) => badLot.id !== lot.id)
        );
      }
      return [...prevGoodLots, lot];
    });
  };

  const addBadLot = (lot: ParkingLot) => {
    setBadLots((prevBadLots) => {
      if (prevBadLots.some((badLot) => badLot.id === lot.id)) {
        return prevBadLots;
      }
      if (goodLots.some((goodLot) => goodLot.id === lot.id)) {
        setGoodLots((prevGoodLots) =>
          prevGoodLots.filter((goodLot) => goodLot.id !== lot.id)
        );
      }
      return [...prevBadLots, lot];
    });
  };

  return (
    <ParkingLotsContext.Provider
      value={{ goodLots, badLots, addGoodLot, addBadLot }}
    >
      {children}
    </ParkingLotsContext.Provider>
  );
};

export const useParkingLots = (): ParkingLotsContextType => {
  const context = useContext(ParkingLotsContext);
  if (context === undefined) {
    throw new Error("useParkingLots must be used within a ParkingLotsProvider");
  }
  return context;
};
