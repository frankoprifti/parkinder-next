import { ParkingLot } from "@/context/ParkingLotsContext";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

export default function LotCard({ lot }: { lot: ParkingLot }) {
  if (!lot) {
    return;
  }
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardMedia
          component="img"
          alt={lot.name}
          height="140"
          image={lot.image}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {lot.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lot.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Size: {lot.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {lot.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {lot.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Live Date: {lot.live_date}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
