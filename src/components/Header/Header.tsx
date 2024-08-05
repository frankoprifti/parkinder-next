"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Parkinder
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href="/"
          className={pathname === "/" ? styles.activePage : ""}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/summary"
          className={pathname === "/summary" ? styles.activePage : ""}
        >
          Summary
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
