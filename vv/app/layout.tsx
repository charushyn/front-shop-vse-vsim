import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/utils/index";

import { ReduxProvider } from "@/build/providers";

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {headers} from "next/headers"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Все Всім",
  description: "Інтернет-магазин Все Всім",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headerList = headers()
  

  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
