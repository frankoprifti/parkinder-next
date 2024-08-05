import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SummaryView from "./SummaryView";
import { ParkingLot, useParkingLots } from "@/context/ParkingLotsContext";

// Mock data for testing
const mockParkingLots: ParkingLot[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `${index + 1}`,
    image: `http://example.com/image${index + 1}.jpg`,
    live_date: `2024-08-${index + 1}`,
    name: `Sample Lot ${index + 1}`,
    size: `${10 + index * 5}`,
    status: index % 2 === 0 ? "active" : "inactive",
    type: index % 2 === 0 ? "large" : "medium",
    address: `${index + 1} Sample St`,
  })
);

jest.mock("@/context/ParkingLotsContext", () => ({
  ...jest.requireActual("@/context/ParkingLotsContext"),
  useParkingLots: jest.fn(),
}));

describe("SummaryView", () => {
  it("renders the component with no votes yet", () => {
    (useParkingLots as jest.Mock).mockReturnValue({
      goodLots: [],
      badLots: [],
      addGoodLot: jest.fn(),
      addBadLot: jest.fn(),
    });

    render(<SummaryView />);

    expect(screen.getByText("No votes yet")).toBeInTheDocument();
  });

  it("renders good and bad lots with filter and sort", async () => {
    (useParkingLots as jest.Mock).mockReturnValue({
      goodLots: mockParkingLots.filter((_, index) => index % 2 === 0),
      badLots: mockParkingLots.filter((_, index) => index % 2 !== 0),
      addGoodLot: jest.fn(),
      addBadLot: jest.fn(),
    });

    render(<SummaryView />);

    await waitFor(() => {
      expect(screen.getByText("Parking Lots Overview")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Filter by Name"), {
      target: { value: "Sample Lot 1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
      expect(screen.queryByText("Sample Lot 2")).toBeNull();
    });

    fireEvent.change(screen.getByLabelText("Filter by Name"), {
      target: { value: "" },
    });

    fireEvent.mouseDown(screen.getByLabelText("Sort By"));
    const sortOption = screen.getByRole("option", { name: /Size/ });
    fireEvent.click(sortOption);

    const sortedLots = mockParkingLots.sort(
      (a, b) => Number(a.size) - Number(b.size)
    );

    await waitFor(() => {
      expect(screen.getByText(sortedLots[0].name)).toBeInTheDocument();
      expect(screen.getByText(sortedLots[1].name)).toBeInTheDocument();
    });
  });

  it("renders no lots when there are no lots", async () => {
    (useParkingLots as jest.Mock).mockReturnValue({
      goodLots: [],
      badLots: [],
      addGoodLot: jest.fn(),
      addBadLot: jest.fn(),
    });

    render(<SummaryView />);

    await waitFor(() => {
      expect(screen.getByText("No votes yet")).toBeInTheDocument();
    });
  });

  it("applies filter correctly", async () => {
    (useParkingLots as jest.Mock).mockReturnValue({
      goodLots: mockParkingLots,
      badLots: [],
      addGoodLot: jest.fn(),
      addBadLot: jest.fn(),
    });

    render(<SummaryView />);

    fireEvent.change(screen.getByLabelText("Filter by Name"), {
      target: { value: "Sample Lot 1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
      expect(screen.queryByText("Sample Lot 2")).toBeNull();
    });
  });

  it("applies sort correctly", async () => {
    (useParkingLots as jest.Mock).mockReturnValue({
      goodLots: mockParkingLots,
      badLots: [],
      addGoodLot: jest.fn(),
      addBadLot: jest.fn(),
    });

    render(<SummaryView />);

    fireEvent.mouseDown(screen.getByLabelText("Sort By"));
    const sortOption = screen.getByText("Size");
    fireEvent.click(sortOption);

    const sortedLots = mockParkingLots.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    await waitFor(() => {
      expect(screen.getByText(sortedLots[0].name)).toBeInTheDocument();
      expect(screen.getByText(sortedLots[1].name)).toBeInTheDocument();
    });
  });
});
