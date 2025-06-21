import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import OpacityControl from "maplibre-gl-opacity";
import maplibregl from "maplibre-gl";
import Village from "@/types/Village";
import { useEffect, useRef } from "react";
import Faculty from "@/types/Faculty";

const googleMapLink = (object: Village | Faculty) => {
  return `https://www.google.com/maps/@?api=1&map_action=map&center=${object.latitude}%2C${object.longitude}&zoom=15&basemap=satellite`;
};

const mapStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      maxzoom: 19,
      tileSize: 256,
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors",
    },
    base: {
      type: "raster",
      tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
      maxzoom: 19,
      tileSize: 256,
      attribution:
        "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a> GRUS画像（© Axelspace）",
    },
    photo: {
      type: "raster",
      tiles: [
        "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
      ],
      maxzoom: 19,
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-layer",
      source: "osm",
      type: "raster",
    },
    {
      id: "base-layer",
      source: "base",
      type: "raster",
    },
    {
      id: "photo-layer",
      source: "photo",
      type: "raster",
    },
  ],
};

const opacity = new OpacityControl({
  baseLayers: {
    "osm-layer": "OpenStreetMap",
    "base-layer": "地理院タイル 標準地図",
    "photo-layer": "地理院タイル 写真（最新）",
  },
});

const markerContent = (object: Village | Faculty) => {
  switch (object.type) {
    case "village":
      return `
        <p class="text-lg font-bold">${object.pref} ${object.city} ${object.district}</p>
        <p>人口：${object.population}人</p>
        <a href="${googleMapLink(object)}" target="_blank" class="text-blue-500">Google Map</a>
      `;
    case "faculty":
      return `
        <p class="text-lg font-bold">${object.name}</p>
        <p>${object.pref} ${object.city} ${object.district}</p>
        <a href="${googleMapLink(object)}" target="_blank" class="text-blue-500">Google Map</a>
      `;
  }
};

const objectMarker = ({
  object,
  map,
}: {
  object: Village | Faculty;
  map: maplibregl.Map;
}) => {
  const popup = new maplibregl.Popup().setHTML(markerContent(object));
  const marker = new maplibregl.Marker()
    .setLngLat([object.longitude, object.latitude])
    .addTo(map)
    .setPopup(popup);
  marker.getElement().style.cursor = "pointer";
  return marker;
};

type VillageProps = {
  objects: Village[];
  selectedObject: Village | undefined;
};
type FacultyProps = {
  objects: Faculty[];
  selectedObject: Faculty | undefined;
};

export const BaseMap = ({
  objects,
  selectedObject,
}: VillageProps | FacultyProps) => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap();
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map || objects.length === 0) return;

    let totalLat = 0;
    let totalLng = 0;
    objects.forEach((object) => {
      totalLat += object.latitude;
      totalLng += object.longitude;
    });

    map.panTo([totalLng / objects.length, totalLat / objects.length]);
  }, [map, objects]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    const newMarkers: maplibregl.Marker[] = [];
    objects.forEach((object) => {
      newMarkers.push(objectMarker({ object, map }));
    });
    markersRef.current = newMarkers;
  }, [map, objects]);

  useEffect(() => {
    if (!selectedObject || !map) return;

    map.panTo([selectedObject.longitude, selectedObject.latitude]);
    markersRef.current.forEach((marker) => {
      if (
        marker.getLngLat().lng === selectedObject.longitude &&
        marker.getLngLat().lat === selectedObject.latitude
      ) {
        if (!marker.getPopup().isOpen()) marker.togglePopup();
      } else {
        if (marker.getPopup().isOpen()) marker.togglePopup();
      }
    });
  }, [map, selectedObject]);

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
        onLoad={(map) => {
          map.target.addControl(opacity, "top-right");
        }}
      />
    </>
  );
};
