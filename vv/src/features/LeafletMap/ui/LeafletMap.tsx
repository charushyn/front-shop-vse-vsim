"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";

import iconUrl from "@/../public/static-img/2849827_pointer_map_location_place_multimedia_icon.svg";

import L, { LatLngExpression } from "leaflet";
import { H1, H2, P } from "@/shared/ui";
import Link from "next/link";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-09-512.png",
  iconSize: [32, 32],
});

// var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
// 	minZoom: 0,
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// });

const Map = ({ coordination }: { coordination: LatLngExpression }) => {
  if (typeof window !== "undefined") {
    return (
      <div className="flex flex-col t-s">
        <div className="flex flex-col gap-4">
          <MapContainer
            key={new Date().getTime()}
            style={{
              height: "50svh",
              width: "90svw",
              zIndex: 0,
            }}
            center={coordination}
            zoom={16}
            scrollWheelZoom={false}
          >
            <TileLayer
              noWrap={true}
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />
            <Marker icon={customIcon} position={coordination}>
              <Popup className="flex flex-col gap-0">
                <p>Варшавський ринок</p>
                <p>Для візиту просимо про контакт:</p>
                <p>Володимир, 067 326 77 50</p>
              </Popup>
            </Marker>
          </MapContainer>
          <div className="flex flex-col t-s:grid t-s:grid-cols-3">
            <div className="flex flex-col">
              <H2 className="mb-2">Варшавський ринок</H2>
              <P>Для візиту просимо про контакт:</P>
              <P>Володимир, 067 326 77 50</P>
              <div
                className="flex flex-row gap-2 items-center"
                onClick={() =>
                  window.open(
                    "https://www.google.pl/maps/place/%D0%97%D0%B0%D0%B2%D0%BE%D0%BA%D0%B7%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%80%D1%8B%D0%BD%D0%BE%D0%BA/@50.7587891,25.3535003,20.14z/data=!4m15!1m8!3m7!1s0x472599eba185965d:0xd25274a2228db86c!2z0JvRg9GG0LosINCS0L7Qu9GL0L3RgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KPQutGA0LDQuNC90LA!3b1!8m2!3d50.7518548!4d25.3299205!16zL20vMDJqejNx!3m5!1s0x4725975403b1731f:0x5b944de733e67600!8m2!3d50.7589243!4d25.3537378!16s%2Fg%2F1td4hwq5?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D",
                    "_blank"
                  )
                }
              >
                <P className="underline">Переглянути на мапі</P>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col mt-2 gap-1">
              <H1>Графік:</H1>
              <P>Пн: Зачинено</P>
              <P>Вт-Нд: 9:00 - 16:00</P>
            </div>
            <div className="flex flex-col gap-2 overflow-hidden mt-2">
              <div className="flex flex-row gap-2 items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K6iHlN79UOl9U5uImTPZr-0KQiqNWq5_Zw&s"
                  className="w-6 h-6"
                ></img>
                <H2>Телеграм: +380 67 326 7750</H2>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <img
                  src="https://img.icons8.com/?size=160&id=bV3syodg1hrI&format=png"
                  className="w-6 h-6"
                ></img>
                <H2>Вайбер: +380 67 326 7750</H2>
              </div>
              <a
                href="https://www.instagram.com/vse.vsim.shop/"
                target="_blank"
                className="flex flex-row  gap-2 overflow-hidden items-center"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRca2QB2rdMxLqU9HydJjD5Tywl4LLS_h1vKQ&s"
                  className="w-6 h-6"
                ></img>
                <H2>
                  Інстраграм: <span className="underline">vse.vsim.shop</span>
                </H2>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <H1 className="font-bold">Рекомендуємо ознайомитись:</H1>
            <div className="flex flex-col gap-1">
              <Link className="underline" href="/privacypolicy">
                Політика конфіденційності
              </Link>
            </div>
          </div>
          <div className=" text-center pt-10 pb-4">
            site was made by:{" "}
            <a
              className=" underline"
              target="_blank"
              href="https://t.me/charushyn"
            >
              charushyn
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Map;
