import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Favorite, Close } from "@mui/icons-material";
import { ParkingLot, useParkingLots } from "../../context/ParkingLotsContext";
import { GET_PARKING_LOTS_QUERY } from "@/graphql/queries";
import styles from "./TinderView.module.css";
import { startCase } from "@/utils/startCase";

const TinderView: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { addGoodLot, addBadLot } = useParkingLots();

  const { loading, refetch } = useQuery(GET_PARKING_LOTS_QUERY, {
    variables: { limit: 5, offset: 0 },
    onCompleted: (data: {
      getAllParkingLots: React.SetStateAction<ParkingLot[]>;
    }) => {
      if (data.getAllParkingLots.length === 0) {
        return;
      }
      setParkingLots(data.getAllParkingLots);
    },
    onError: () => {
      setError(true);
    },
  });

  useEffect(() => {
    if (parkingLots.length > 0 && parkingLots.length - 1 === current) {
      const newOffset = offset + 5;
      refetch({ limit: 5, offset: newOffset })
        .then(({ data }) => {
          if (data.getAllParkingLots.length === 0) {
            return;
          }
          setParkingLots((prevLots) => [
            ...prevLots,
            ...data.getAllParkingLots,
          ]);
          setOffset(newOffset);
        })
        .catch(() => setError(true));
    }
  }, [current, offset, parkingLots.length, refetch]);

  if (error)
    return (
      <Container className={styles.container}>
        <p>Error :(</p>
      </Container>
    );
  if (current > parkingLots.length - 1 && !loading)
    return (
      <Container className={styles.container}>
        <p>No more lots to vote!</p>
      </Container>
    );
  if (loading || parkingLots.length === 0)
    return (
      <Container className={styles.container}>
        <p>Loading...</p>
      </Container>
    );

  const parkingLot: ParkingLot = parkingLots[current];

  const handleGood = () => {
    addGoodLot(parkingLot);
    setCurrent((prev) => prev + 1);
  };

  const handleBad = () => {
    addBadLot(parkingLot);
    setCurrent((prev) => prev + 1);
  };

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <CardMedia
          component="img"
          alt={parkingLot.name}
          height={400}
          width={250}
          image={parkingLot.image}
        />
        <CardContent>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography gutterBottom variant="h5" component="div">
              {parkingLot.name}
            </Typography>
            <Typography color="textSecondary">
              {startCase(parkingLot.type)}
            </Typography>
          </Box>

          <Typography color="textSecondary">{parkingLot.address}</Typography>

          <Typography color="textSecondary">{parkingLot.live_date}</Typography>
          <Typography color="textSecondary">
            Spots: {parkingLot.size}
          </Typography>
        </CardContent>
      </Card>
      <div className={styles.buttonContainer}>
        <IconButton
          onClick={handleGood}
          aria-label="Good"
          className={styles.iconButtonGood}
        >
          <Favorite />
        </IconButton>
        <IconButton
          onClick={handleBad}
          aria-label="Bad"
          className={styles.iconButtonBad}
        >
          <Close />
        </IconButton>
      </div>
    </Container>
  );
};

export default TinderView;
