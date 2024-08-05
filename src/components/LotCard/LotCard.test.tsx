import React from "react";
import { render, screen } from "@testing-library/react";
import LotCard from "./LotCard";
import { ParkingLot } from "@/context/ParkingLotsContext";

// Mock data for testing
const mockParkingLot: ParkingLot = {
  id: "1",
  image: "http://example.com/image1.jpg",
  live_date: "2024-08-01",
  name: "Sample Lot 1",
  size: "15",
  status: "active",
  type: "large",
  address: "1 Sample St",
};

describe("LotCard", () => {
  it("renders the lot details correctly", () => {
    render(<LotCard lot={mockParkingLot} />);

    expect(screen.getByAltText(mockParkingLot.name)).toBeInTheDocument();
    expect(screen.getByText(mockParkingLot.name)).toBeInTheDocument();
    expect(screen.getByText(mockParkingLot.address)).toBeInTheDocument();
    expect(
      screen.getByText(`Size: ${mockParkingLot.size}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockParkingLot.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Type: ${mockParkingLot.type}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Live Date: ${mockParkingLot.live_date}`)
    ).toBeInTheDocument();
  });

  it("does not render anything if the lot prop is missing", () => {
    const { container } = render(<LotCard lot={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });
});
