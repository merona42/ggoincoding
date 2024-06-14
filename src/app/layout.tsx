import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { MSWComponent } from "./_component/MSWComponent";
import RQProvider from "./_component/RQProvider";
import CoinProvider from "./_component/CoinProvider";
import DateProvider from "./_component/DateProvider";

const inter = Inter({ subsets: ["latin"] });

type Probs = {
  children: ReactNode,
}
export default function RootLayout({children}:Probs){
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent/>
        <RQProvider>
          <DateProvider>
            <CoinProvider>
              {children}
            </CoinProvider>
          </DateProvider>
          
        
        </RQProvider>
      </body>
    </html>
  );
}
