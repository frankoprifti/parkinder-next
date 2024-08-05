import React from "react";
import { act, render } from "@testing-library/react";
import {
  ParkingLotsProvider,
  useParkingLots,
  ParkingLot,
} from "./ParkingLotsContext";
import "@testing-library/jest-dom";

const TestComponent: React.FC = () => {
  const { goodLots, badLots, addGoodLot, addBadLot } = useParkingLots();

  const sampleLot: ParkingLot = {
    id: "1",
    image: "image_url",
    live_date: "2024-01-01",
    name: "Sample Lot",
    size: "100",
    status: "open",
    type: "public",
    address: "123 Main St",
  };

  return (
    <div>
      <button onClick={() => addGoodLot(sampleLot)}>Add to Good Lots</button>
      <button onClick={() => addBadLot(sampleLot)}>Add to Bad Lots</button>
      <div data-testid="good-lots">{JSON.stringify(goodLots)}</div>
      <div data-testid="bad-lots">{JSON.stringify(badLots)}</div>
    </div>
  );
};

describe("ParkingLotsProvider", () => {
  it("should add a lot to goodLots", () => {
    const { getByText, getByTestId } = render(
      <ParkingLotsProvider>
        <TestComponent />
      </ParkingLotsProvider>
    );

    const addToGoodButton = getByText("Add to Good Lots");
    act(() => {
      addToGoodButton.click();
    });

    expect(getByTestId("good-lots")).toHaveTextContent("Sample Lot");
    expect(getByTestId("bad-lots")).not.toHaveTextContent("Sample Lot");
  });

  it("should add a lot to badLots", () => {
    const { getByText, getByTestId } = render(
      <ParkingLotsProvider>
        <TestComponent />
      </ParkingLotsProvider>
    );

    const addToBadButton = getByText("Add to Bad Lots");
    act(() => {
      addToBadButton.click();
    });

    expect(getByTestId("bad-lots")).toHaveTextContent("Sample Lot");
    expect(getByTestId("good-lots")).not.toHaveTextContent("Sample Lot");
  });
  it("should not add the same lot to goodLots multiple times", () => {
    const { getByText, getByTestId } = render(
      <ParkingLotsProvider>
        <TestComponent />
      </ParkingLotsProvider>
    );

    const addToGoodButton = getByText("Add to Good Lots");

    act(() => {
      addToGoodButton.click();
      addToGoodButton.click();
    });

    const goodLots = JSON.parse(getByTestId("good-lots").textContent || "[]");
    expect(goodLots.length).toBe(1);
    expect(goodLots[0].name).toBe("Sample Lot");
  });
  it("should not add the same lot to badLots multiple times", () => {
    const { getByText, getByTestId } = render(
      <ParkingLotsProvider>
        <TestComponent />
      </ParkingLotsProvider>
    );

    const addToBadButton = getByText("Add to Bad Lots");

    act(() => {
      addToBadButton.click();
      addToBadButton.click();
    });

    const badLots = JSON.parse(getByTestId("bad-lots").textContent || "[]");
    expect(badLots.length).toBe(1);
    expect(badLots[0].name).toBe("Sample Lot");
  });
  it("should remove a good lot if voted as bad for second time and should remove a bad lot if voted good for a second time", () => {
    const { getByText, getByTestId } = render(
      <ParkingLotsProvider>
        <TestComponent />
      </ParkingLotsProvider>
    );

    const addToBadButton = getByText("Add to Bad Lots");
    const addToGoodButton = getByText("Add to Good Lots");

    act(() => {
      addToBadButton.click();
    });
    let badLots = JSON.parse(getByTestId("bad-lots").textContent || "[]");
    let goodLots = JSON.parse(getByTestId("good-lots").textContent || "[]");
    expect(badLots.length).toBe(1);
    act(() => {
      addToGoodButton.click();
    });
    badLots = JSON.parse(getByTestId("bad-lots").textContent || "[]");
    goodLots = JSON.parse(getByTestId("good-lots").textContent || "[]");
    expect(badLots.length).toBe(0);
    expect(goodLots.length).toBe(1);
    act(() => {
      addToBadButton.click();
    });
    badLots = JSON.parse(getByTestId("bad-lots").textContent || "[]");
    goodLots = JSON.parse(getByTestId("good-lots").textContent || "[]");
    expect(badLots.length).toBe(1);
    expect(goodLots.length).toBe(0);
  });

  it("should throw error if its outside ParkingLotsProvider", () => {
    const renderTestComponent = () => render(<TestComponent />);
    expect(renderTestComponent).toThrow(
      new Error("useParkingLots must be used within a ParkingLotsProvider")
    );
  });
});
