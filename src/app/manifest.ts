import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "秘境集落探索ツール",
    short_name: "秘境集落探索ツール",
    description:
      "秘境集落を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    lang: "ja",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/icon512_rounded.png",
        type: "image/png",
      },
    ],
  };
}
