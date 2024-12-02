"use server";

import { getCategories } from "@/shared/utils/api/requests";
import { getProducts } from "@/shared/utils/api/requests";

import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/uiShadcn/button";
import { getUserDevice } from "@/shared/utils";
import { CategoriesMini, ProductCardMini } from "@/entities";

import { useSearchParams } from "next/navigation";

import { headers } from "next/headers";
import { Product } from "@/shared/types/Product";
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from "@/shared/uiShadcn/typography";

export default async function Products() {
  const data = await getCategories({});
  const categories = data.filter((item: any) => {
    if (typeof item.parent_id === "object") {
      return true;
    } else {
      return false;
    }
  });

  const products = await getProducts({ sort: "byQuantity" });

  const previewProducts = products.splice(0, 8);

  return (
    <div className="my-4 flex flex-col px-4">
      <TypographyH4 className="mb-4 underline">
        Популярні категорії
      </TypographyH4>
      <CategoriesMini categories={categories}></CategoriesMini>
      <TypographyH4 className="my-4 underline">Популярні товари</TypographyH4>
      <div className="grid grid-cols-2 gap-1 m-l:gap-2 t-s:grid-cols-3 t-l:grid-cols-4 t-l:gap-3 d-s:gap-4 d-s:grid-cols-5 d-m:grid-cols-6">
        {previewProducts.map((product: any) => {
          return (
            <ProductCardMini action="link" product={product}></ProductCardMini>
          );
        })}
      </div>
      <Button className="mt-4 m-l:w-[80%] m-l:mx-auto t-s:w-[60%] t-s:my-10 d-s:my-[100px] d-s:w-[40%] w-full text-center font-bold">
        <a
          href="/products"
          className="w-full h-full text-center flex items-center justify-center gap-4"
        >
          <TypographyP>Перейти до повного каталогу</TypographyP>
          <ArrowRight></ArrowRight>
        </a>
      </Button>
    </div>
  );
}
