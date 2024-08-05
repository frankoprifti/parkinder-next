import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import styles from "./Header.module.css";

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const theme = createTheme();

const renderWithProviders = (ui: React.ReactElement, pathname: string) => {
  (usePathname as jest.Mock).mockReturnValue(pathname);

  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
};

describe("Header", () => {
  it("renders the Header component and highlights the Home link when on the home page", () => {
    renderWithProviders(<Header />, "/");

    expect(screen.getByText("Parkinder")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveClass(styles.activePage);
    expect(screen.getByText("Summary")).toBeInTheDocument();
  });

  it("renders the Header component and highlights the Summary link when on the summary page", () => {
    renderWithProviders(<Header />, "/summary");

    expect(screen.getByText("Parkinder")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Summary")).toHaveClass(styles.activePage);
  });
});
