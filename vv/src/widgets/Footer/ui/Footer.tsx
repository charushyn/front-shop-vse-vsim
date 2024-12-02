"use client";

import { H1, H2, P } from "@/shared/ui";

import React from "react";

import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () => import("@/features/LeafletMap/ui/LeafletMap"),
  {
    ssr: false,
  }
);

export default function Footer() {
  const titles = ["Ми у соцмережах", "Контакти", "Розділи"];
  const [active, setActive] = React.useState("");

  return (
    <footer className=" bg-light_gray px-4 flex flex-col" id="footer">
      <div className="pt-4 flex justify-center">
        <DynamicMap
          coordination={[50.75893466951527, 25.353737736632112]}
        ></DynamicMap>
      </div>
    </footer>
  );
}
