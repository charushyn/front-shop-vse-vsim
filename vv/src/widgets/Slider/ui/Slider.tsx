"use client";

import React from "react";
import { imgs, slideImg } from "../data/test-img";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/uiShadcn/carousel";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/shared/uiShadcn/card";

export default function Slider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="px-4 mt-4">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {imgs.map((img: string) => {
            return (
              <CarouselItem key={img}>
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={img}
                      className="w-full h-[150px] m-l:h-[170px] t-s:h-[230px] t-m:h-[290px] t-l:h-[320px] d-s:h-[390px]  rounded-2xl object-cover"
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
    </div>
  );
}
