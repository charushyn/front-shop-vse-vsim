"use client";

import { H1, CustomLink, H2 } from "@/shared/ui";
import { getCategories, getProducts } from "@/shared/utils/api/requests";
import { useParams, useSearchParams } from "next/navigation";

import { Button } from "@/shared/uiShadcn/button";

import FadeLoader from "react-spinners/FadeLoader";

import { Suspense } from "react";

import Link from "next/link";

import { ProductCardMini } from "@/entities";

import React from "react";
import { useEffect } from "react";

import { P } from "@/shared/ui";

import { CategoriesMini } from "@/entities";
import { Product } from "@/shared/types/Product";

import { getUserDevice } from "@/shared/utils";

import { useRouter } from "next/navigation";
import { TypographyLarge } from "@/shared/uiShadcn/typography";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoriesParams = searchParams.get("categories");

  const [categories, setCategories] = React.useState(Array<any>);
  const [products, setProducts] = React.useState(Array<Product>);
  const [pagination, setPagination] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(true);

  const [extraProducts, setExtraProducts] = React.useState(Array<Product>);

  const router = useRouter();

  React.useEffect(() => {
    const req = async () => {
      var deepestCategory = "";
      if (
        typeof categoriesParams === "string" &&
        categoriesParams.includes(",")
      ) {
        let array = categoriesParams.split(",");
        deepestCategory = array[array.length - 1];
      } else if (typeof categoriesParams === "string") {
        var deepestCategory = categoriesParams;
      } else {
        var deepestCategory = "";
      }

      // if(deepestCategory.length === 0){
      //   setProducts(await getProducts({sort: "byQuantity"}))
      //   setCategories(await getCategories({}))
      // } else {
      //   const childrenCategories = await getCategories({parentID: [+deepestCategory]})
      //   setCategories(childrenCategories)

      //   const products = await getProducts({categoriesID: [+deepestCategory]})

      //   if(products.length > 0){
      //     setProducts(products)
      //   } else if(childrenCategories.length === 0){
      //     setProducts([])
      //   } else {
      //     setProducts(await getProducts({categoriesID: [childrenCategories.map((i:any) => {return i.id})]}))
      //     const extraProducts = await getProducts({})
      //     setExtraProducts(extraProducts)
      //   }
      // }

      if (deepestCategory.length === 0) {
        const filteredArray: Array<Product> = [];
        const res = await getProducts({ sort: "byQuantity", limit: 50 });
        res.map((item: Product) => {
          // item.quantity !== 0 ? filteredArray.push(item) : ''
          filteredArray.push(item);
        });
        setProducts(filteredArray);
        const categoriesData = await getCategories({});
        const categories = categoriesData.filter((item: any) => {
          if (typeof item.parent_id === "object") {
            return true;
          } else {
            return false;
          }
        });
        setCategories(categories);
      } else {
        const childrenCategories = await getCategories({
          parentID: [+deepestCategory],
        });
        setCategories(childrenCategories);

        const products = await getProducts({
          categoriesID: [+deepestCategory],
          sort: "byQuantity",
        });
        const extraProducts = await getProducts({
          sort: "byQuantity",
          limit: getUserDevice(window.innerWidth) === "m" ? 4 : 45,
        });

        setExtraProducts(extraProducts);

        if (products.length > 0) {
          setProducts(products);
        } else if (childrenCategories.length === 0 && products.length === 0) {
          setProducts([]);
        } else if (childrenCategories !== 0 && products.length === 0) {
          setProducts(
            await getProducts({
              categoriesID: [
                childrenCategories.map((i: any) => {
                  return i.id;
                }),
              ],
            })
          );
        }
      }

      setIsLoading(false);
    };

    req();
  }, []);

  return (
    <div className="flex flex-col gap-2 px-4 min-h-svh d-s:px-8">
      <div
        className="flex flex-row gap-2 items-center mt-4 mb-2 cursor-pointer w-fit"
        onClick={() => {
          if (typeof categoriesParams === "object") {
            window.location.href = "/";
          } else {
            window.location.href = "/products";
          }
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
      {categories.length > 0 && (
        <>
          <H1 className="mt-4 mb-2">Оберіть наступну категорію:</H1>
          <CategoriesMini categories={categories}></CategoriesMini>
        </>
      )}
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <FadeLoader />
        </div>
      ) : (
        <div
          className={`${
            products.length !== 0
              ? "grid grid-cols-2 gap-1 m-l:gap-2 t-s:grid-cols-3 t-l:grid-cols-4 t-l:gap-3 d-s:gap-4 d-s:grid-cols-5 d-m:grid-cols-6"
              : "min-h-fit"
          }`}
        >
          {products.length !== 0 ? (
            products.slice(0, 12 * pagination).map((product: Product) => {
              return (
                <ProductCardMini
                  product={product}
                  action="button"
                ></ProductCardMini>
              );
            })
          ) : (
            <div className="text-center">
              <H2>Нажаль, ми не маємо пропозицій поки що у цій категорії...</H2>
            </div>
          )}
        </div>
      )}
      {products.length !== 0 && (
        <TypographyLarge className="mx-auto my-5">{`Сторінка ${pagination}/${Math.ceil(
          products.length / 12
        )}`}</TypographyLarge>
      )}
      {products.length > pagination * 12 && (
        <Button
          className="mx-auto mb-10"
          onClick={() => setPagination(pagination + 1)}
        >
          Завантажити ще
        </Button>
      )}

      {extraProducts.length !== 0 && (
        <div className="mb-10">
          <div className="w-full h-[1px] bg-gray bg-opacity-30 mt-10"></div>
          <H1 className="mt-4 mb-2 font-medium">Переглядайте також:</H1>
          <div className="grid grid-cols-2 gap-1 m-l:gap-2 t-s:grid-cols-3 t-l:grid-cols-4 t-l:gap-3 d-s:gap-4 d-s:grid-cols-5 d-m:grid-cols-6">
            {extraProducts.map((product: Product) => {
              if (product.quantity > 0) {
                return (
                  <ProductCardMini
                    product={product}
                    action="button"
                  ></ProductCardMini>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
