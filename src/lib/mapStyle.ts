import maplibregl from "maplibre-gl";

export const mapStyle: maplibregl.StyleSpecification = JSON.parse(`{
  "version": 8,
  "id": "hybrid",
  "name": "Satellite Hybrid",
  "sources": {
    "maptiler_planet": {
      "url": "https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}",
      "type": "vector"
    },
    "satellite": {
      "url": "https://api.maptiler.com/tiles/satellite-v2/tiles.json?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}",
      "type": "raster"
    }
  },
  "layers": [
    {
      "id": "Satellite",
      "type": "raster",
      "source": "satellite",
      "minzoom": 0,
      "layout": { "visibility": "visible" },
      "paint": { "raster-opacity": 1 },
      "filter": ["all"]
    },
    {
      "id": "Tunnel",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "transportation",
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 100%, 0.2)",
        "line-dasharray": [0.28, 0.14],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          6,
          0.5,
          20,
          30
        ]
      },
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["in", "class", "motorway", "primary", "secondary", "tertiary", "trunk"]
      ]
    },
    {
      "id": "Path minor",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "transportation",
      "layout": {
        "line-cap": "square",
        "line-join": "bevel",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 97%, 0.33)",
        "line-dasharray": [1, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          14,
          0.5,
          20,
          4
        ]
      },
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path_pedestrian"]
      ]
    },
    {
      "id": "Path",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "transportation",
      "layout": {
        "line-cap": "square",
        "line-join": "bevel",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 97%, 0.33)",
        "line-dasharray": [1, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          14,
          0.5,
          20,
          4
        ]
      },
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path", "track"]
      ]
    },
    {
      "id": "Road",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "transportation",
      "minzoom": 6,
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": {
          "stops": [
            [8, "hsla(0, 0%, 100%, 0.2)"],
            [14, "hsla(0, 0%, 100%, 0.4)"],
            [18, "hsla(0, 0%, 100%, 0.5)"]
          ]
        },
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          ["match", ["get", "class"], ["motorway", "motorway_link"], 1, 0],
          7,
          [
            "match",
            ["get", "class"],
            ["motorway", "motorway_link", "trunk"],
            1.4,
            0
          ],
          8,
          [
            "match",
            ["get", "class"],
            ["motorway", "motorway_link", "primary", "trunk"],
            0.75,
            0
          ],
          9,
          ["match", ["get", "class"], ["secondary", "tertiary"], 0.7, 1],
          10,
          ["match", ["get", "class"], ["motorway", "motorway_link"], 1.3, 1.3],
          14,
          ["match", ["get", "class"], ["minor", "service"], 0.5, 2.4]
        ]
      },
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "class", "rail", "ferry", "path", "track"],
        ["!=", "brunnel", "tunnel"]
      ]
    },
    {
      "id": "Railway",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "transportation",
      "minzoom": 11,
      "layout": { "visibility": "visible" },
      "paint": {
        "line-color": "hsla(34, 12%, 66%, 0.2)",
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 11, 0.5, 16, 1.3]
      },
      "filter": ["==", "class", "rail"]
    },
    {
      "id": "Other border",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "boundary",
      "minzoom": 3,
      "layout": { "visibility": "visible" },
      "paint": {
        "line-color": "hsla(0, 0%, 76%, 0.5)",
        "line-dasharray": [2, 1]
      },
      "filter": [
        "all",
        ["in", "admin_level", 3, 4, 5, 6, 7, 8],
        ["==", "maritime", 0],
        ["==", "disputed", 0]
      ]
    },
    {
      "id": "Country dark border",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "boundary",
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 0%, 0.51)",
        "line-offset": 1,
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          3,
          0.5,
          9,
          1.5,
          22,
          32
        ]
      },
      "filter": [
        "all",
        ["==", "admin_level", 2],
        ["==", "maritime", 0],
        ["==", "disputed", 0]
      ]
    },
    {
      "id": "Disputed border",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "boundary",
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 94%)",
        "line-dasharray": [2, 4],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          3,
          0.5,
          9,
          1.5,
          22,
          32
        ]
      },
      "filter": [
        "all",
        ["<=", "admin_level", 2],
        ["==", "maritime", 0],
        ["==", "disputed", 1]
      ]
    },
    {
      "id": "Country border",
      "type": "line",
      "source": "maptiler_planet",
      "source-layer": "boundary",
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 94%)",
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          3,
          0.5,
          9,
          1.5,
          22,
          32
        ]
      },
      "filter": [
        "all",
        ["==", "admin_level", 2],
        ["==", "maritime", 0],
        ["==", "disputed", 0]
      ]
    },
    {
      "id": "Road labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "transportation_name",
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": ["step", ["zoom"], 250, 21, 900],
        "text-field": ["coalesce", ["get", "name:ja"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-letter-spacing": 0.1,
        "text-rotation-alignment": "map",
        "text-size": [
          "interpolate",
          ["linear", 0.75, 1, 0.75, 1],
          ["zoom"],
          10,
          8,
          16,
          10,
          24,
          14
        ],
        "text-transform": "none",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-color": "hsl(0, 0%, 17%)",
        "text-halo-width": 1
      },
      "filter": ["all", ["==", "$type", "LineString"], ["!=", "class", "ferry"]]
    },
    {
      "id": "Place labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 16,
      "layout": {
        "symbol-sort-key": ["to-number", ["get", "rank"]],
        "text-field": [
          "match",
          ["get", "class"],
          "city",
          ["get", "name:ja"],
          ["get", "name"]
        ],
        "text-font": ["Noto Sans Regular"],
        "text-max-width": 10,
        "text-size": [
          "interpolate",
          ["linear", 0.5, 1, 0.5, 1],
          ["zoom"],
          3,
          9,
          6,
          10,
          8,
          12,
          10,
          14
        ],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "city", "country", "province", "state", "place"]
      ]
    },
    {
      "id": "City labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 16,
      "layout": {
        "symbol-sort-key": ["to-number", ["get", "rank"]],
        "text-field": "{name:ja}",
        "text-font": ["Noto Sans Regular"],
        "text-max-width": 10,
        "text-size": [
          "interpolate",
          ["linear", 0.5, 1, 0.5, 1],
          ["zoom"],
          4,
          11,
          6,
          13,
          8,
          16,
          12,
          18,
          16,
          20
        ],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "city"],
        ["!=", "capital", 2]
      ]
    },
    {
      "id": "State labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 8,
      "layout": {
        "symbol-sort-key": ["to-number", ["get", "rank"]],
        "text-field": ["coalesce", ["get", "name:ja"], ["get", "name"]],
        "text-font": ["Noto Sans Italic"],
        "text-letter-spacing": 0.05,
        "text-max-width": 10,
        "text-size": [
          "interpolate",
          ["linear", 0.75, 1],
          ["zoom"],
          3,
          ["step", ["get", "rank"], 12, 1, 11, 2, 11],
          6,
          ["step", ["get", "rank"], 13, 1, 12, 2, 12],
          9,
          ["step", ["get", "rank"], 22, 1, 14, 2, 14]
        ],
        "text-transform": "none",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 90%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1,
        "text-opacity": [
          "step",
          ["zoom"],
          0,
          3,
          ["case", ["<=", ["get", "rank"], 3], 1, 0],
          7,
          ["case", ["<=", ["get", "rank"], 3], 0, 1]
        ]
      },
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["in", "class", "state", "province"],
        ["<=", "rank", 6]
      ]
    },
    {
      "id": "Capital city labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 16,
      "layout": {
        "symbol-sort-key": ["to-number", ["get", "rank"]],
        "text-anchor": "center",
        "text-field": "{name:ja}",
        "text-font": ["Noto Sans Bold"],
        "text-max-width": 8,
        "text-offset": [0.4, 0],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4,
          12,
          6,
          14,
          8,
          16,
          12,
          22
        ],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1
      },
      "filter": ["all", ["==", "capital", 2], ["==", "class", "city"]]
    },
    {
      "id": "Country labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 1,
      "maxzoom": 12,
      "layout": {
        "symbol-sort-key": ["to-number", ["get", "rank"]],
        "text-field": "{name:ja}",
        "text-font": ["Noto Sans Bold"],
        "text-max-width": 10,
        "text-size": [
          "interpolate",
          ["linear", 0.75, 1, 0.75, 1],
          ["zoom"],
          1,
          ["step", ["get", "rank"], 13, 1, 12, 2, 12],
          4,
          ["step", ["get", "rank"], 15, 1, 14, 2, 14],
          6,
          ["step", ["get", "rank"], 23, 1, 18, 2, 18],
          9,
          ["step", ["get", "rank"], 27, 1, 22, 2, 22]
        ],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["in", "class", "country"],
        ["!=", "iso_a2", "VA"]
      ]
    },
    {
      "id": "Continent labels",
      "type": "symbol",
      "source": "maptiler_planet",
      "source-layer": "place",
      "minzoom": 0,
      "maxzoom": 1,
      "layout": {
        "text-field": "{name:ja}",
        "text-font": ["Noto Sans Bold"],
        "text-justify": "center",
        "text-size": {
          "stops": [
            [0, 12],
            [2, 13]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsl(0, 0%, 0%)",
        "text-halo-width": 1
      },
      "metadata": {},
      "filter": ["all", ["==", "class", "continent"]]
    }
  ],
  "metadata": {
    "maptiler:copyright": "You are licensed to use the style or its derivate for serving map tiles exclusively with MapTiler Server or MapTiler Cloud and in accordance with their licenses and terms. If you plan to use the style in a different way, contact us at sales@maptiler.com."
  },
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}",
  "sprite": "https://api.maptiler.com/maps/hybrid/sprite",
  "bearing": 0,
  "pitch": 0,
  "center": [0, 0],
  "zoom": 1
}
`);
