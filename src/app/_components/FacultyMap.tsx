import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import Faculty from "@/types/Faculty";

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

const facultyMarker = ({
  faculty,
  map,
}: {
  faculty: Faculty;
  map: maplibregl.Map;
}) => {
  const popup = new maplibregl.Popup().setHTML(`
        <p>${faculty.name}</p>
        <p>${faculty.city} ${faculty.district}</p>
        `);
  const marker = new maplibregl.Marker()
    .setLngLat([faculty.longitude, faculty.latitude])
    .addTo(map)
    .setPopup(popup);
  marker.getElement().style.cursor = "pointer";
  return marker;
};

export const FacultyMap = ({
  faculties,
  selectedFaculty,
}: {
  faculties: Faculty[];
  selectedFaculty: Faculty | undefined;
}) => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap();
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map || faculties.length === 0) return;

    let totalLat = 0;
    let totalLng = 0;
    faculties.forEach((faculty) => {
      totalLat += faculty.latitude;
      totalLng += faculty.longitude;
    });

    map.panTo([totalLng / faculties.length, totalLat / faculties.length]);
  }, [map, faculties]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    const newMarkers: maplibregl.Marker[] = [];
    faculties.forEach((faculty) => {
      newMarkers.push(facultyMarker({ faculty, map }));
    });
    markersRef.current = newMarkers;
  }, [map, faculties]);

  useEffect(() => {
    if (!selectedFaculty || !map) return;

    map.panTo([selectedFaculty.longitude, selectedFaculty.latitude]);
    markersRef.current.forEach((marker) => {
      if (
        marker.getLngLat().lng === selectedFaculty.longitude &&
        marker.getLngLat().lat === selectedFaculty.latitude
      ) {
        if (!marker.getPopup().isOpen()) marker.togglePopup();
      } else {
        if (marker.getPopup().isOpen()) marker.togglePopup();
      }
    });
  }, [map, selectedFaculty]);

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
