import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import TinderView from "./TinderView";
import { GET_PARKING_LOTS_QUERY } from "@/graphql/queries";
import {
  ParkingLot,
  ParkingLotsProvider,
} from "../../context/ParkingLotsContext";
import { useQuery } from "@apollo/client";

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

const mocks = [
  {
    request: {
      query: GET_PARKING_LOTS_QUERY,
      variables: { limit: 5, offset: 0 },
    },
    result: {
      data: {
        getAllParkingLots: mockParkingLots.slice(0, 5),
      },
    },
  },
  {
    request: {
      query: GET_PARKING_LOTS_QUERY,
      variables: { limit: 5, offset: 5 },
    },
    result: {
      data: {
        getAllParkingLots: mockParkingLots.slice(5, 10),
      },
    },
  },
  {
    request: {
      query: GET_PARKING_LOTS_QUERY,
      variables: { limit: 5, offset: 10 },
    },
    result: {
      data: {
        getAllParkingLots: [],
      },
    },
  },
];

const renderWithProviders = (
  ui: React.ReactElement,
  mocks: MockedResponse[] = [],
  addTypename: boolean = false
): RenderResult => {
  return render(
    <ParkingLotsProvider>
      <MockedProvider mocks={mocks} addTypename={addTypename}>
        {ui}
      </MockedProvider>
    </ParkingLotsProvider>
  );
};

describe("TinderView", () => {
  it("renders loading state", () => {
    renderWithProviders(<TinderView />, [
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 0 },
        },
      },
    ]);

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("renders error state", async () => {
    renderWithProviders(<TinderView />, [
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 0 },
        },
        error: new Error("An error occurred"),
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText(/Error :\(/)).toBeInTheDocument();
    });
  });

  it("renders no results state", async () => {
    renderWithProviders(<TinderView />, [
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 0 },
        },
        result: {
          data: {
            getAllParkingLots: [],
          },
        },
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText(/No more lots to vote!/)).toBeInTheDocument();
    });
  });

  it("allows voting on a parking lot as good", async () => {
    renderWithProviders(<TinderView />, mocks);

    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Good"));
  });

  it("allows voting on a parking lot as bad", async () => {
    renderWithProviders(<TinderView />, mocks);

    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Bad"));
  });
  it("fetches the next batch of 5", async () => {
    renderWithProviders(<TinderView />, mocks);
    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));

    await waitFor(() => {
      expect(screen.getByText("Sample Lot 6")).toBeInTheDocument();
    });
  });
  it("shows no results if there are no data to fetch", async () => {
    renderWithProviders(<TinderView />, [
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 0 },
        },
        result: {
          data: {
            getAllParkingLots: mockParkingLots.slice(0, 5),
          },
        },
      },
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 5 },
        },
        result: {
          data: {
            getAllParkingLots: [],
          },
        },
      },
    ]);
    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));

    await waitFor(() => {
      expect(screen.getByText(/No more lots to vote!/)).toBeInTheDocument();
    });
  });
  it("handles error state when fetching the next batch", async () => {
    renderWithProviders(<TinderView />, [
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 0 },
        },
        result: {
          data: {
            getAllParkingLots: mockParkingLots.slice(0, 5),
          },
        },
      },
      {
        request: {
          query: GET_PARKING_LOTS_QUERY,
          variables: { limit: 5, offset: 5 },
        },
        error: new Error("An error occurred"),
      },
    ]);
    await waitFor(() => {
      expect(screen.getByText("Sample Lot 1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));
    fireEvent.click(screen.getByLabelText("Bad"));

    await waitFor(() => {
      expect(screen.getByText(/Error :\(/)).toBeInTheDocument();
    });
  });
});
