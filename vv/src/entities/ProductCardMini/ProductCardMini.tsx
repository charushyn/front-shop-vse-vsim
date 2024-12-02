"use client";

import { getOffers, getProductByID } from "@/shared/utils/api/requests";

import { Button } from "@/shared/uiShadcn/button";
import { Product } from "@/shared/types/Product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/uiShadcn/popover";

import { ShoppingBasket } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/shared/uiShadcn/card";
import { TypographyLarge, TypographyP } from "@/shared/uiShadcn/typography";

export default function ProductCardMini({
  product,
  action,
}: {
  product: Product;
  action: "link" | "button";
}) {
  const router = useRouter();

  const [properties, setProperties] = React.useState(Array<object>);

  React.useEffect(() => {
    const req = async () => {
      if (product.has_offers) {
        const offersRes = await getOffers({ product_id: product.id });
        var array: Array<any> = [];
        offersRes.data.map((offer: any, offerIndex: number) => {
          offer.properties.map((property: any, propertyIndex: number) => {
            if (!array[propertyIndex]) {
              array.push({ name: property.name, values: [property.value] });
              return;
            }
            if (
              array[propertyIndex].values.some((value: any) => {
                value === property.value;
              })
            ) {
              return;
            } else {
              array[propertyIndex].values.push(property.value);
            }
          });
        });
        setProperties(array);
      }
    };

    req();
  }, []);

  return (
    <Card
      className={
        product.quantity - product.in_reserve !== 0
          ? properties.length !== 0
            ? `flex flex-col justify-between gap-2 rounded-3xl group relative hover:shadow-2xl h-fit hover:rounded-b-none`
            : "flex flex-col justify-between gap-2 rounded-3xl group relative hover:shadow-2xl h-fit"
          : "flex flex-col justify-between gap-2 rounded-3xl"
      }
    >
      <CardContent className="p-2 d-s:p-5">
        <div>
          <img
            src={product.thumbnail_url}
            className="w-full object-fill object-center rounded-2xl h-[120px] m-m:h-[150px] m-l:h-[170px] t-s:h-[190px] t-m:h-[200px]  d-s:h-[180px]"
            onClick={() => {
              router.push(`/products/${product.id}`);
            }}
          ></img>

          <TypographyP
            className={
              product.quantity - product.in_reserve === 0
                ? " text-gray text-opacity-40 break-words line-clamp-2 pt-2 min-h-[2lh]"
                : "break-words line-clamp-2 pt-2 min-h-[2lh]"
            }
          >
            {product.name}
          </TypographyP>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between mt-4 mb-2 items-center">
            <TypographyP className="font-bold">
              {product.min_price !== product.max_price
                ? `від ${product.min_price}.00 грн`
                : `${product.min_price} ₴`}
            </TypographyP>
            {/* <TypographyP className={product.quantity === 0 ? ' text-gray text-opacity-40' : 'text-green-700'}>{product.quantity === 0 ? 'Закінчився' : 'В наявності'}</TypographyP> */}
            <Button
              disabled={product.quantity === 0}
              className=" self-center"
              variant="default"
              onClick={() => {
                router.push(`/products/${product.id}`);
              }}
            >
              <ShoppingBasket></ShoppingBasket>
            </Button>
          </div>
        </div>
      </CardContent>
      {properties.length !== 0 && (
        <div className="absolute top-full h-fit z-[1] w-full border hidden group-hover:block group-hover:shadow-2xl rounded-b-2xl p-5 bg-white">
          {properties.map((item: any) => {
            return (
              <div className="break-words">
                <TypographyP>{`${item.name}:`}</TypographyP>
                {item.values.map((value: any, index: number) => {
                  return (
                    <TypographyP className="px-[2px] ">{`${value}${
                      index === item.values.length - 1 ? "." : ","
                    }`}</TypographyP>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
