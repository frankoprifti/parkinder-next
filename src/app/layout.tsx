import GraphQlProvider from "@/context/GraphqlProvider";
import { ParkingLotsProvider } from "@/context/ParkingLotsContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parkinder",
  description: `True Wemoloians can evaluate the inner beauty of a lot from far distance.
You seem to thrive to become one, so we suggest that you create a training tool for yourself.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GraphQlProvider>
          <ParkingLotsProvider>
            <Header />
            {children}
          </ParkingLotsProvider>
        </GraphQlProvider>
      </body>
    </html>
  );
}
