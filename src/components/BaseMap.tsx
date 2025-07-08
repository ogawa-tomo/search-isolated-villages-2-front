import Map, { AttributionControl, MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import Village from "@/types/Village";
import { useEffect, useRef } from "react";
import Faculty from "@/types/Faculty";
import { mapStyle } from "@/lib/mapStyle";

const googleMapLink = (point: Village | Faculty) => {
  return `https://www.google.com/maps/@?api=1&map_action=map&center=${point.latitude}%2C${point.longitude}&zoom=15&basemap=satellite`;
};

const markerContent = (point: Village | Faculty) => {
  switch (point.type) {
    case "village":
      return `
        <p class="text-lg font-bold">${point.pref} ${point.city} ${point.district}</p>
        <p>人口：${point.population}人</p>
        <a href="${googleMapLink(point)}" target="_blank" class="text-blue-500">Google Map</a>
      `;
    case "faculty":
      return `
        <p class="text-lg font-bold">${point.name}</p>
        <p>${point.pref} ${point.city} ${point.district}</p>
        <a href="${googleMapLink(point)}" target="_blank" class="text-blue-500">Google Map</a>
      `;
  }
};

const pointMarker = ({
  point,
  map,
}: {
  point: Village | Faculty;
  map: maplibregl.Map;
}) => {
  const popup = new maplibregl.Popup().setHTML(markerContent(point));
  const marker = new maplibregl.Marker()
    .setLngLat([point.longitude, point.latitude])
    .addTo(map)
    .setPopup(popup);
  marker.getElement().style.cursor = "pointer";
  return marker;
};

type Props = {
  points: Village[] | Faculty[];
  selectedPoint: Village | Faculty | undefined;
};

export const BaseMap = ({ points, selectedPoint }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const streetViewPluginRef = useRef<any>(null);

  useEffect(() => {
    if (!map || points.length === 0) return;

    let totalLat = 0;
    let totalLng = 0;
    points.forEach((point) => {
      totalLat += point.latitude;
      totalLng += point.longitude;
    });

    map.panTo([totalLng / points.length, totalLat / points.length]);
  }, [map, points]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    const newMarkers: maplibregl.Marker[] = [];
    points.forEach((point) => {
      newMarkers.push(pointMarker({ point, map }));
    });
    markersRef.current = newMarkers;
  }, [map, points]);

  useEffect(() => {
    if (!selectedPoint || !map) return;

    map.panTo([selectedPoint.longitude, selectedPoint.latitude]);
    markersRef.current.forEach((marker) => {
      if (
        marker.getLngLat().lng === selectedPoint.longitude &&
        marker.getLngLat().lat === selectedPoint.latitude
      ) {
        if (!marker.getPopup().isOpen()) marker.togglePopup();
      } else {
        if (marker.getPopup().isOpen()) marker.togglePopup();
      }
    });
  }, [map, selectedPoint]);

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
          longitude: 139.752778,
          latitude: 35.6825,
          zoom: 8,
        }}
        mapStyle={mapStyle}
        attributionControl={false}
      >
        <AttributionControl position="top-left" customAttribution="MapLibre" />
      </Map>
    </>
  );
};
