"use client";

import { H2, P, A } from "@/shared/ui/index";
import Link from "next/link";

import { useSelector } from "react-redux";

import logo from "@/../public/static-img/logo-shop.png";

import React from "react";

import useScrollDirection from "../hooks/useScrollDirection";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/uiShadcn/button";
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/shared/uiShadcn/typography";
import { SidebarTrigger, useSidebar } from "@/shared/uiShadcn/sidebar";

import { Table } from "lucide-react";

import { AppSheet } from "@/entities/AppSheet/ui/app-sheet";

export default function Header() {
  const [activeNav, setActiveNav] = React.useState(false);

  const scrollDirection = useScrollDirection();

  const cart = useSelector((state: any) => state.cartReducer.cart);

  const router = useRouter();
  return (
    <header className="border-b border-light_gray">
      <div
        className="bg-main h-fit py-1 px-4 flex flex-row items-center justify-center gap-2 text-white cursor-pointer"
        onClick={() => {
          router.push("/table");
        }}
      >
        <Table className="min-h-6 min-w-6"></Table>
        <TypographyP className="underline">
          Маємо пропозиції для дропшипперів та ОПТовиків!
        </TypographyP>
      </div>
      <div className="flex m-s:flex-col p-4 m-s:gap-2 t-s:px-8">
        <AppSheet
          open={activeNav}
          toggleFn={() => setActiveNav(!activeNav)}
        ></AppSheet>
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2 flex-col t-s:flex-row t-s:gap-4">
            <img
              src={logo.src}
              className="w-[50px] h-[50px] t-s:w-[60px] t-s:h-[60px]"
              onClick={() => router.push("/")}
            ></img>
            {/* Logo */}
            <div className="flex flex-col">
              <TypographyP className="text-main font-bold">
                +38 (067) 326-77-50
              </TypographyP>
              <TypographyP>Пн-Сб: 8:00-17:00</TypographyP>
            </div>
          </div>
          <div className="flex flex-col-reverse t-s:flex-row gap-6 items-end t-s:gap-4">
            {/* phone number */}
            <Link
              href={"/cart"}
              className="relative w-8 h-8 t-s:mt-2 t-s:w-9 t-s:h-9 t-m:w-10 t-m:h-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {cart.length > 0 && (
                <div className="m-s:w-5 m-s:h-5 bg-red-500 absolute flex justify-center items-center rounded-full right-[-4px] bottom-[-4px] t-m:w-6 t-m:h-6 t-m:right-[-5px] t-m:bottom-[-5px]">
                  <P className="text-white">{cart.length}</P>
                </div>
              )}
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setActiveNav(true);
              }}
            >
              Розділи
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 t-s:w-7 t-s:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
