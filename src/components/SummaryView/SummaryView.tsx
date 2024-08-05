"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { ParkingLot, useParkingLots } from "@/context/ParkingLotsContext";
import LotCard from "../LotCard/LotCard";

const SummaryView: React.FC = () => {
  const { goodLots, badLots } = useParkingLots();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<"name" | "size" | "status">("name");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (
    event: SelectChangeEvent<"name" | "size" | "status">
  ) => {
    setSort(event.target.value as "name" | "size" | "status");
  };

  const applyFilter = (lots: ParkingLot[]) =>
    lots.filter((lot) => lot.name.toLowerCase().includes(filter.toLowerCase()));

  const applySort = (lots: ParkingLot[]) =>
    [...lots].sort((a, b) => {
      if (sort === "size") {
        return Number(a[sort]) - Number(b[sort]);
      }
      return a[sort]?.localeCompare(b[sort]);
    });

  const renderLots = (lots: ParkingLot[], title: string) => (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {applySort(applyFilter(lots)).map((lot) => (
          <LotCard key={lot.id} lot={lot} />
        ))}
      </Grid>
    </>
  );

  const hasVotesYet = goodLots.length > 0 || badLots.length > 0;

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {hasVotesYet ? "Parking Lots Overview" : "No votes yet"}
      </Typography>
      {hasVotesYet && (
        <>
          <Box width={"100%"} flexDirection={"row"} gap={1} display={"flex"}>
            <FormControl margin="normal">
              <TextField
                label="Filter by Name"
                variant="outlined"
                value={filter}
                onChange={handleFilterChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                onChange={handleSortChange}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="size">Size</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {renderLots(goodLots, "Good Lots")}
          {renderLots(badLots, "Bad Lots")}
        </>
      )}
    </Container>
  );
};

export default SummaryView;
