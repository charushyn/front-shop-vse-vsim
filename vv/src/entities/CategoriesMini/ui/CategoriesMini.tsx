"use client";

import { P } from "@/shared/ui";
import { getUserDevice } from "@/shared/utils";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/shared/uiShadcn/button";

import { useSearchParams } from "next/navigation";
import { TypographyP } from "@/shared/uiShadcn/typography";

export default function CategoriesMini({
  categories,
}: {
  categories: Array<any>;
}) {
  const [userScreen, setUserScreen] = React.useState("");
  const [activeMoreCategories, setActiveMoreCategories] = React.useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const router = useRouter();

  React.useEffect(() => {
    setUserScreen(getUserDevice(screen.width));
  }, []);

  return (
    <div className="">
      <div className="flex flex-row overflow-x-auto flex-wrap gap-4 mb-4">
        {categories.map((item: any) => {
          return (
            <Button
              variant="outline"
              className="w-fit"
              onClick={() => {
                if (typeof params.get("category") === "object") {
                  window.location.href = `/products/?categories=${item.id}`;
                } else {
                  window.location.href = `/products/?categories=${params.get(
                    "categories"
                  )},${item.id}`;
                }
              }}
              key={item.name}
            >
              <TypographyP className="break-words hyphens-manual">
                {item.name}
              </TypographyP>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
