import { gql } from "@apollo/client";

export const GET_PARKING_LOTS_QUERY = gql(`query GetAllParkingLots($limit: Int, $offset: Int) {
  getAllParkingLots(limit: $limit, offset: $offset) {
    address
    id
    image
    live_date
    name
    size
    status
    type
  }
}`);