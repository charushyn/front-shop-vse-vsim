"use client";

import { Property } from "@/shared/types/Offer";
import { Product } from "@/shared/types/Product";
import { ProductWithOffer } from "@/shared/types/ProductWithOffers";
import { CountBar, H2, P } from "@/shared/ui";
import { TypographyP } from "@/shared/uiShadcn/typography";
import { useRouter } from "next/navigation";

export default function CartItem({
  product,
  funcAdd,
  funcMinus,
  funcRemove,
}: {
  product: { item: Product; quantity: number };
  funcAdd: () => void;
  funcMinus: () => void;
  funcRemove: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col border-b pb-4 gap-4 mb-4">
      <div className="flex flex-row gap-4">
        <img
          src={product.item.thumbnail_url}
          className="w-[100px] h-[100px] t-s:w-[150px] t-s:h-[150px] object-contain t-l:h-[175px] t-l:w-fit"
        ></img>
        <TypographyP className=" text-center my-2 font-bold">
          {`${product.item.name}${
            product.item.properties
              ? product.item.properties.map((property: Property) => {
                  return `, ${property.name}: ${property.value}`;
                })
              : ""
          }`}
        </TypographyP>
      </div>
      <div className="flex flex-row mt-4 justify-between t-s:gap-8 d-m:gap-[100px] t-s:justify-end">
        <div className="flex flex-col items-center gap-2">
          <CountBar
            count={product.quantity}
            funcAdd={funcAdd}
            funcMinus={funcMinus}
          ></CountBar>
          <TypographyP className="font-[400]">{`${product.item.quantity} шт. на складі`}</TypographyP>
        </div>
        <TypographyP className="font-[500]">{`${
          product.quantity * product.item.price
        } ₴`}</TypographyP>
      </div>
    </div>
  );
}
