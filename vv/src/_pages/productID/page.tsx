"use client";

import { Product } from "@/shared/types/Product";
import { H1, P, H2, CountBar } from "@/shared/ui";
import { getOffers, getProductByID } from "@/shared/utils/api/requests";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/shared/uiShadcn/button";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/shared/utils/redux/productCart/productCart";
import { toast } from "react-toastify";

import { Wallet } from "lucide-react";

import FadeLoader from "react-spinners/FadeLoader";

import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/shared/uiShadcn/carousel";
import { Heart, RotateCw } from "lucide-react";

import {
  TypographyH4,
  TypographyLarge,
  TypographyP,
} from "@/shared/uiShadcn/typography";

import Autoplay from "embla-carousel-autoplay";

import { RotateCcwIcon, Truck } from "lucide-react";

import { Card, CardContent } from "@/shared/uiShadcn/card";
import { ProductSheet } from "@/entities";
import { Offer, Property } from "@/shared/types/Offer";
import { ProductSheetType } from "@/shared/types/ProductSheet";

export default function ProductPage() {
  const [product, setProduct] = React.useState<Product>(Object);
  const [availableOffers, setAvailableOffers] = React.useState(Array<Offer>);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [activeNav, setActiveNav] = React.useState(false);
  const [modalProduct, setModalProduct] =
    React.useState<ProductSheetType>(Object);

  const [itemCount, setItemCount] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(true);

  const [showAllDescription, setShowAllDescrition] = React.useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const cart = useSelector((state: any) => state.cartReducer.cart);

  const params = useParams();

  React.useEffect(() => {
    const productIndexInCart = cart.findIndex(
      (cartItem: { item: Product; quantity: number }) =>
        product.id === cartItem.item.id
    );

    if (productIndexInCart === -1) {
      return;
    } else {
      setItemCount(cart[productIndexInCart].quantity);
    }
  }, []);

  React.useEffect(() => {
    const req = async () => {
      const item = await getProductByID({ productID: +params.productID });

      if (item.has_offers) {
        const offers: Array<any> = (await getOffers({ product_id: item.id }))
          .data;
        setAvailableOffers(offers);
      }

      setProduct(item);
      setIsLoading(false);
    };

    req();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="px-4 d-s:px-8 flex flex-col">
      <ProductSheet
        open={activeNav}
        toggleFn={() => setActiveNav(!activeNav)}
        product={modalProduct}
      ></ProductSheet>
      <div
        className="flex flex-row gap-2 items-center mt-4 mb-2 cursor-pointer w-fit"
        onClick={() => {
          window.history.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        <H2>Назад</H2>
      </div>
      <Button className="relative py-4 items-center my-4 t-m:w-fit px-10 gap-4">
        <a href="/products" className="absolute w-full h-full flex-row"></a>
        <TypographyP>Каталог товарів</TypographyP>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Button>
      {isLoading ? (
        <FadeLoader></FadeLoader>
      ) : (
        <div className="flex flex-col t-m:grid t-m:grid-cols-2 t-m:grid-rows-2 gap-4">
          {product.attachments_data.length > 0 && (
            <div className=" col-start-1 col-end-2 row-start-1 row-end-3">
              <Carousel setApi={setApi} className="relative">
                <CarouselContent>
                  {product.attachments_data.map((img: string) => {
                    return (
                      <CarouselItem key={img}>
                        <Card>
                          <CardContent className="p-0">
                            <img
                              src={img}
                              className="w-full h-[300px] t-l:h-[370px] d-s:h-[450px] d-m:h-[520px] rounded-2xl object-contain"
                            ></img>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
              </Carousel>
              <div className="flex flex-row gap-2 items-center justify-center mt-4">
                {product.attachments_data.map((img: string, index: number) => {
                  if (current - 1 === index) {
                    return (
                      <div className="bg-main bg-opacity-50 h-3 w-3 rounded-full"></div>
                    );
                  } else {
                    return (
                      <div className="bg-black bg-opacity-50 h-2 w-2 rounded-full"></div>
                    );
                  }
                })}
              </div>
              {/* desc for t-m:+ */}
              <div className="flex-col gap-2 my-4 hidden t-m:flex t-m:col-start-1 t-m:col-end-2 t-m:row-start-2 t-m:row-end-4">
                <TypographyH4 className="font-bold">Опис:</TypographyH4>
                <div className="h-[1px] bg-light_gray"></div>
                <TypographyP
                  className={`whitespace-pre-line break-words ${
                    !showAllDescription && "line-clamp-6"
                  } h-fit`}
                >
                  {product.description}
                </TypographyP>
                {!showAllDescription && (
                  <div onClick={() => setShowAllDescrition(true)}>
                    <H2 className="underline">Показати увесь опис</H2>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 t-m:col-start-2 t-m:col-end-3 t-m:row-start-1 t-m:row-end-3">
            <TypographyH4 className="font-bold">{product.name}</TypographyH4>
            {product.has_offers &&
              product.quantity - product.in_reserve !== 0 && (
                <div className="border border-light_gray rounded-2xl flex flex-col gap-2 p-2 max-h-[200px] t-l:max-h-[250px] overflow-y-scroll t-l:p-4">
                  <TypographyLarge className="">
                    Варіанти товару:
                  </TypographyLarge>
                  {availableOffers.map((item: Offer) => {
                    if (item.quantity === 0) {
                      return;
                    }
                    return (
                      <div
                        className="flex flex-row gap-2 border border-light_gray rounded-2xl items-center cursor-pointer"
                        onClick={() => {
                          setActiveNav(true);
                          setModalProduct({
                            name: product.name,
                            description: product.description,
                            ...item,
                          });
                        }}
                      >
                        <img
                          src={item.thumbnail_url}
                          className="w-[60px] h-[60px] t-l:w-[100px] t-l:h-[100px]"
                        ></img>
                        {item.properties.map(
                          (property: Property, indexProperty: number) => {
                            return (
                              <TypographyP>{`${property.name}: ${
                                property.value
                              }${
                                indexProperty === item.properties.length - 1
                                  ? "."
                                  : ", "
                              }`}</TypographyP>
                            );
                          }
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            <div className="border border-light_gray rounded-2xl flex flex-col t-l:flex-row gap-2 p-2 t-l:items-center t-l:p-4 t-l:gap-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <TypographyP
                    className={
                      product.quantity - product.in_reserve !== 0
                        ? product.quantity - product.in_reserve <= 10
                          ? "text-red-700 font-light"
                          : "text-green-700 font-light"
                        : "text-black text-opacity-50 font-light"
                    }
                  >
                    {product.quantity - product.in_reserve !== 0
                      ? product.quantity - product.in_reserve <= 10
                        ? "Закінчується"
                        : "В наявності"
                      : "Немає в наявності"}
                  </TypographyP>
                  <TypographyLarge className="font-bold">
                    {product.has_offers
                      ? `${
                          product.min_price === product.max_price
                            ? product.min_price
                            : `від ${product.min_price} ₴ до ${product.max_price}`
                        } ₴`
                      : `${product.price} ₴`}
                  </TypographyLarge>
                </div>
                <Heart className="cursor-pointer hover:text-red-700 t-l:hidden"></Heart>
              </div>

              <Button
                disabled={
                  product.quantity - product.in_reserve !== 0 ? false : true
                }
                variant="default"
                className="flex flex-row gap-4 items-center t-l:w-fit d-s:px-10 d-s:py-6 d-s:self-center"
                onClick={() => {
                  if (product.has_offers) {
                    toast("Оберіть варіант товару", { type: "warning" });
                  } else {
                    setModalProduct(product);
                    setActiveNav(true);
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
              <Heart className="hidden cursor-pointer hover:text-red-700 t-l:block"></Heart>
            </div>
            <div className="border border-light_gray rounded-2xl">
              <div className="border-b-light_gray border-b flex flex-row gap-4 p-2 items-center t-l:p-4">
                <Truck className="min-w-6 min-h-6"></Truck>
                <div className=" break-words">
                  <TypographyP className="font-semibold inline mr-1">
                    Доставка:
                  </TypographyP>
                  <TypographyP className="inline">
                    Нова Пошта у відділення
                  </TypographyP>
                </div>
              </div>
              <div className="border-b-light_gray border-b flex flex-row gap-4 p-2 items-center t-l:p-4">
                <RotateCw className="min-w-6 min-h-6"></RotateCw>
                <div className=" break-words">
                  <TypographyP className="font-semibold inline mr-1">
                    Повернення:
                  </TypographyP>
                  <TypographyP className="inline">
                    Протягом 14 днів після отримання
                  </TypographyP>
                </div>
              </div>
              <div className="border-b-light_gray border-b flex flex-row gap-4 p-2 items-center t-l:p-4">
                <Wallet className="min-w-6 min-h-6"></Wallet>
                <div className=" break-words">
                  <TypographyP className="font-semibold inline mr-1">
                    Оплата:
                  </TypographyP>
                  <TypographyP className="inline">
                    Оплата при отриманні, Банківською картою
                  </TypographyP>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 my-4 t-m:hidden">
        <TypographyH4 className="font-bold">Опис:</TypographyH4>
        <div className="h-[1px] bg-light_gray"></div>
        <TypographyP
          className={`whitespace-pre-line break-words t-m:hidden ${
            !showAllDescription && "line-clamp-6"
          }`}
        >
          {product.description}
        </TypographyP>
        {!showAllDescription && (
          <div onClick={() => setShowAllDescrition(true)}>
            <H2 className="underline">Показати увесь опис</H2>
          </div>
        )}
      </div>
    </div>
  );
}
