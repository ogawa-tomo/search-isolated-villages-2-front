"use client";

// import { Map, Source, Marker, Layer } from '@vis.gl/react-maplibre';
import Map, { Source, Layer, Marker } from "react-map-gl/maplibre";
// import Map, { Source, Layer, Marker } from 'react-map-gl/mapbox';
import "maplibre-gl/dist/maplibre-gl.css";
import CircleLayer from "@vis.gl/react-maplibre";
import type { FeatureCollection } from "geojson";
import Image from "next/image";
import logo from "@/public/top_logo.png";

const layerStyle = {
  id: "point",
  type: "fill",
  paint: {
    "fill-color": "#00ffff",
    "fill-opacity": 0.7,
    "fill-outline-color": "#ff0000",
  },
};

const polygon = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    // These coordinates outline Maine.
    coordinates: [
      [
        [35.0, 135.0],
        [35.1, 135.0],
        [35.1, 135.1],
        [35.0, 135.1],
        [35.0, 135.0],
      ],
    ],
  },
};

export default function Page() {
  return (
    <Map
      initialViewState={{
        longitude: 135.0,
        latitude: 35.0,
        zoom: 8,
      }}
      style={{ width: 400, height: 600 }}
      mapStyle={{
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            maxzoom: 19,
            tileSize: 256,
            attribution: "&copy; OpenStreetMap",
          },
        },
        layers: [
          {
            id: "osm-layer",
            source: "osm",
            type: "raster",
          },
        ],
      }}
    >
      <Marker longitude={135} latitude={35} anchor="bottom" />
    </Map>
  );
}
