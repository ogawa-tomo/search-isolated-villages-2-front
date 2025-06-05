import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import Village from "@/types/Village";
import { useEffect, useMemo, useRef, useState } from "react";
import { FetchedVillages } from "./VillageView";

const mapOptions: maplibregl.MapOptions = {
  container: "map",
  style: {
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
    center: [135, 35],
    zoom: 8,
  },
};

export const VillageMapOld = ({
  villages,
  selectedVillage,
}: {
  villages: FetchedVillages;
  selectedVillage: Village | undefined;
}) => {
  const [map, setMap] = useState<maplibregl.Map | undefined>(undefined);
  // const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const existsVillages =
    villages !== "error" &&
    villages !== "beforeSearch" &&
    villages !== "searching" &&
    villages.length > 0;

  useEffect(() => {
    const map = new maplibregl.Map(mapOptions);
    setMap(map);
  }, []);

  useEffect(() => {
    if (!map || !existsVillages) return;

    markersRef.current.forEach((marker) => marker.remove());

    const newMarkers: maplibregl.Marker[] = [];
    villages.forEach((village) => {
      const popup = new maplibregl.Popup().setHTML(`
        <p>${village.city} ${village.district}</p>
        <p>人口：${village.population}人</p>
        `);
      const marker = new maplibregl.Marker()
        .setLngLat([village.longitude, village.latitude])
        .addTo(map)
        .setPopup(popup);
      marker.getElement().style.cursor = "pointer";
      newMarkers.push(marker);
    });
    markersRef.current = newMarkers;
  }, [existsVillages, map, villages]);

  useEffect(() => {
    if (!existsVillages || !map) return;

    let totalLat = 0;
    let totalLng = 0;
    villages.forEach((village) => {
      totalLat += village.latitude;
      totalLng += village.longitude;
    });

    map.panTo([totalLng / villages.length, totalLat / villages.length]);
  }, [map, villages, existsVillages]);

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
      <div id="map" className="size-full"></div>
      {/* <Map
        initialViewState={{
          longitude: existsVillages ? villages[0]?.longitude : 135,
          latitude: existsVillages ? villages[0]?.latitude : 35,
          zoom: 8,
        }}
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
        {existsVillages &&
          villages.map((village) => (
            <Marker
              key={`${village.longitude}-${village.latitude}`}
              longitude={village.longitude}
              latitude={village.latitude}
              anchor="bottom"
              className="cursor-pointer"
              onClick={() => setSelectedVillage(village)}
            />
          ))}
        {selectedVillage && (
          <Popup
            longitude={selectedVillage.longitude}
            latitude={selectedVillage.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedVillage(undefined)}
            anchor="bottom"
          >
            <div>
              <p>{`${selectedVillage.city} ${selectedVillage.district}`}</p>
              <p>人口: {selectedVillage.population}人</p>
            </div>
          </Popup>
        )}
      </Map> */}
    </>
  );
};
