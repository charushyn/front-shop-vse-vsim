import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Info,
  Newspaper,
  LucideIcon,
  List,
  Table,
  MousePointer2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/uiShadcn/sheet";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/uiShadcn/sidebar";
import {
  TypographyH4,
  TypographyLarge,
  TypographyP,
} from "@/shared/uiShadcn/typography";
import { Description } from "@radix-ui/react-dialog";
import { ProductWithOffer } from "@/shared/types/ProductWithOffers";
import { Product } from "@/shared/types/Product";
import { ProductSheetType } from "@/shared/types/ProductSheet";
import { Button } from "@/shared/uiShadcn/button";
import React from "react";
import { CountBar } from "@/shared/ui";
import { addItem } from "@/shared/utils/redux/productCart/productCart";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { Property } from "@/shared/types/Offer";

export function ProductSheet({
  open,
  toggleFn,
  product,
}: {
  open: boolean;
  toggleFn: () => void;
  product: ProductSheetType;
}) {
  const [showAllDescription, setShowAllDescrition] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(1);

  const dispatch = useDispatch();
  return (
    <Sheet open={open} onOpenChange={() => toggleFn()}>
      <SheetContent className="w-full overflow-y-scroll">
        <SheetHeader className="">
          <SheetTitle>Додавання товару</SheetTitle>
          <Description className=""></Description>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <img
            src={product.thumbnail_url}
            className="w-full h-[300px] rounded-2xl object-contain"
          ></img>
          <TypographyH4 className="font-bold">{`${product.name} ${
            product.properties
              ? product.properties.map((property: Property) => {
                  return `${property.name}: ${property.value}`;
                })
              : ""
          }`}</TypographyH4>
          <TypographyP className="font-bold">{`${product.price} ₴`}</TypographyP>
          <div className="flex flex-row gap-2 items-center justify-center">
            <CountBar
              count={itemCount}
              funcAdd={() => {
                if (itemCount < product.quantity) {
                  setItemCount(itemCount + 1);
                }
              }}
              funcMinus={() => {
                if (itemCount - 1 === 0) {
                  toggleFn();
                } else {
                  setItemCount(itemCount - 1);
                }
              }}
            ></CountBar>
          </div>
          <div className="flex justify-center">
            <TypographyP>{`В наявності: ${product.quantity} шт`}</TypographyP>
          </div>

          <Button
            disabled={product.quantity > 0 ? false : true}
            variant="default"
            className="flex flex-row gap-4 items-center d-s:w-fit d-s:px-10 d-s:py-6 d-s:self-center"
            onClick={() => {
              try {
                dispatch(addItem({ item: product, quantity: itemCount }));
                toast("Услішно!", {
                  type: "success",
                  onClose: () => toggleFn(),
                  autoClose: 500,
                });
              } catch (e: any) {
                toast(e.message, { type: "warning" });
              }
            }}
          >
            Додати у кошик
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Button>
        </div>

        <div className="flex flex-col gap-2 my-4">
          <TypographyH4 className="font-bold">Опис:</TypographyH4>
          <div className="h-[1px] bg-light_gray"></div>
          <TypographyP
            className={`whitespace-pre-line break-words ${
              !showAllDescription && "line-clamp-6"
            }`}
          >
            {product.description}
          </TypographyP>
          {!showAllDescription && (
            <div onClick={() => setShowAllDescrition(true)}>
              <TypographyLarge className="underline">
                Показати увесь опис
              </TypographyLarge>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
