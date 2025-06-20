import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import Village from "@/types/Village";
import { useEffect, useRef } from "react";
import { type FetchedVillages } from "./VillageList";

const mapStyle: maplibregl.StyleSpecification = {
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
};

const villageMarker = ({
  village,
  map,
}: {
  village: Village;
  map: maplibregl.Map;
}) => {
  const popup = new maplibregl.Popup().setHTML(`
        <p>${village.city} ${village.district}</p>
        <p>人口：${village.population}人</p>
        `);
  const marker = new maplibregl.Marker()
    .setLngLat([village.longitude, village.latitude])
    .addTo(map)
    .setPopup(popup);
  marker.getElement().style.cursor = "pointer";
  return marker;
};

export const VillageMap = ({
  villages,
  selectedVillage,
}: {
  villages: Village[];
  selectedVillage: Village | undefined;
}) => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap();
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map || villages.length === 0) return;

    let totalLat = 0;
    let totalLng = 0;
    villages.forEach((village) => {
      totalLat += village.latitude;
      totalLng += village.longitude;
    });

    map.panTo([totalLng / villages.length, totalLat / villages.length]);
  }, [map, villages]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    const newMarkers: maplibregl.Marker[] = [];
    villages.forEach((village) => {
      newMarkers.push(villageMarker({ village, map }));
    });
    markersRef.current = newMarkers;
  }, [map, villages]);

  useEffect(() => {
    if (!selectedVillage || !map) return;

    map.panTo([selectedVillage.longitude, selectedVillage.latitude]);
    markersRef.current.forEach((marker) => {
      if (
        marker.getLngLat().lng === selectedVillage.longitude &&
        marker.getLngLat().lat === selectedVillage.latitude
      ) {
        if (!marker.getPopup().isOpen()) marker.togglePopup();
      } else {
        if (marker.getPopup().isOpen()) marker.togglePopup();
      }
    });
  }, [map, selectedVillage]);

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 135,
          latitude: 35,
          zoom: 8,
        }}
        mapStyle={mapStyle}
      />
    </>
  );
};
