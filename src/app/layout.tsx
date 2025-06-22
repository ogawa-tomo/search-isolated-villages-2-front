import "./globals.css";
import { HeaderMenu } from "@/app/_components/HeaderMenu";
import { SideMenu } from "@/app/_components/SideMenu";
import Image from "next/image";
import headerLogo from "@/public/header_logo.png";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "秘境集落探索ツール",
  description:
    "秘境集落を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="corporate" className={`${notoSansJP.variable}`}>
      <head>
        {/* maplibre-google-streetviewがnpm経由でインストールできないため、CDN経由で読み込むために設定している */}
        {/* https://github.com/rezw4n/maplibre-google-streetview/issues/1 */}
        <link
          href="https://cdn.jsdelivr.net/npm/@rezw4n/maplibre-google-streetview@latest/dist/maplibre-google-streetview.css"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.jsdelivr.net/npm/@rezw4n/maplibre-google-streetview@latest/dist/maplibre-google-streetview.js"></script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
