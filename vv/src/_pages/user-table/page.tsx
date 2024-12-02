"use client";

import { getProducts } from "@/shared/utils/api/requests";

import { H1, H2, P } from "@/shared/ui";

import React from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/uiShadcn/table";
import { Product } from "@/shared/types/Product";
import {
  TypographyH4,
  TypographyLarge,
  TypographyP,
} from "@/shared/uiShadcn/typography";
import { Button } from "@/shared/uiShadcn/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/uiShadcn/sheet";
import { Description } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@/shared/uiShadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/shared/uiShadcn/carousel";

export default function UserTablePage() {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [attachments_data, setAttachments_data] = React.useState<Array<string>>(
    []
  );
  const [data, setData] = React.useState(
    Array<{
      name: string;
      thumbnail_url: string;
      attachments_data: Array<string>;
      sku?: string;
      info: {
        id: 4;
        uuid: "CT_1001";
        name: "ТАБЛИЦЯ_ОПТ";
        type: "textarea";
        value: string;
      };
    }>
  );

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

  React.useEffect(() => {
    const res = async () => {
      const response = await getProducts({ customFields: true, limit: 45 });
      const filteredData: Array<any> = [];
      response.map((item: Product) => {
        let index = item.custom_fields?.findIndex(
          (field: any) => field.uuid === "CT_1001"
        );

        if (index === -1 || index == undefined) {
          return;
        } else {
          filteredData.push({
            name: item.name,
            thumbnail_url: item.thumbnail_url,
            attachments_data: item.attachments_data,
            sku: item.sku ? item.sku : "",
            info: item.custom_fields?.[index],
          });
        }
      });
      setData(filteredData);
    };

    res();
  }, []);
  return (
    <div className="flex flex-col px-4 mt-10">
      <Sheet
        open={attachments_data?.length === 0 ? false : true}
        onOpenChange={() => setAttachments_data([])}
      >
        <SheetContent className="">
          <SheetHeader className="mb-6">
            <SheetTitle>Все Всім</SheetTitle>
            <Description className="">Перегляд фото</Description>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {attachments_data.map((img: string) => {
                  return (
                    <CarouselItem key={img}>
                      <Card>
                        <CardContent className="p-0">
                          <img
                            src={img}
                            className="w-full h-[150px] m-l:h-[170px] t-s:h-[230px] t-m:h-[290px] t-l:h-[320px] d-s:h-[390px]  rounded-2xl object-contain"
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
              {attachments_data.map((img: string, index: number) => {
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
          </div>
        </SheetContent>
      </Sheet>
      <Button
        onClick={() => {
          router.push("/");
        }}
        className="flex flex-row items-center gap-4 w-fit"
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <TypographyP>Повернутись на головну</TypographyP>
      </Button>
      <div className="w-fit h-fit p-4 flex flex-col border border-black mt-4 gap-4 rounded-lg">
        <TypographyLarge>Контакти:</TypographyLarge>
        <div className="flex flex-row gap-2 items-center relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K6iHlN79UOl9U5uImTPZr-0KQiqNWq5_Zw&s"
            className="w-6 h-6"
          ></img>
          <TypographyP>Телеграм: +380 67 326 7750</TypographyP>
        </div>
        <div className="flex flex-row gap-2 items-center relative">
          <img
            src="https://img.icons8.com/?size=160&id=bV3syodg1hrI&format=png"
            className="w-6 h-6"
          ></img>
          <TypographyP>Вайбер: +380 67 326 7750</TypographyP>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-2">
        <TypographyH4 className="font-bold">
          Пересувайте таблицю та переглядайте товари на ОПТ
        </TypographyH4>
        <TypographyH4 className="font-[400]">
          Для того, щоб переглянути більше фотографій товару - натисніть на фото
        </TypographyH4>
      </div>
      <div className="flex justify-center">
        <Table className="">
          <TableHeader className="text-center">
            <TableRow className="grid grid-cols-[200px_200px_400px] t-s:grid-cols-3">
              <TableCell className="">Фото</TableCell>
              <TableCell className="">Назва</TableCell>
              <TableCell className="">Інформація</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <TableRow className="text-center items-center grid grid-cols-[200px_200px_400px] t-s:grid-cols-3">
                    <TableCell className="flex items-center justify-center">
                      <img
                        src={item.thumbnail_url}
                        className="w-[200px] h-[150px] object-contain"
                        onClick={() => {
                          setAttachments_data(item.attachments_data);
                        }}
                      ></img>
                    </TableCell>
                    <TableCell className="tracking-wider whitespace-pre-line break-words">
                      {item.name}
                    </TableCell>
                    <TableCell className="tracking-wider whitespace-pre-line break-words">
                      {item.info.value}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
