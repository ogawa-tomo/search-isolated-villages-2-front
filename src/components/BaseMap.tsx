import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import Village from "@/types/Village";
import { useEffect, useRef } from "react";
import Faculty from "@/types/Faculty";
import { mapStyle } from "@/lib/mapStyle";

const googleMapLink = (object: Village | Faculty) => {
  return `https://www.google.com/maps/@?api=1&map_action=map&center=${object.latitude}%2C${object.longitude}&zoom=15&basemap=satellite`;
};

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

type Props = {
  objects: Village[] | Faculty[];
  selectedObject: Village | Faculty | undefined;
};

export const BaseMap = ({ objects, selectedObject }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const streetViewPluginRef = useRef<any>(null);

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

  useEffect(() => {
    if (!map) return;

    // maplibre-google-streetviewがnpm経由でインストールできないため、CDN経由で読み込んでいる
    // https://github.com/rezw4n/maplibre-google-streetview/issues/1
    const streetViewPlugin = new window.MaplibreGoogleStreetView({
      map,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
    streetViewPluginRef.current = streetViewPlugin;

    return () => {
      streetViewPluginRef.current?.remove();
    };
  }, [map]);

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
