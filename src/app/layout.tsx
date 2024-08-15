import "./globals.css";
import { HeaderMenu } from "@/components/HeaderMenu";
import { SideMenu } from "@/components/SideMenu";
import Image from "next/image";
import headerLogo from "@/public/header_logo.png";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";

export const metadata = {
  title: '秘境集落探索ツール',
  description: '秘境集落を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。'
}

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="corporate">
      <body className={notoSansJP.className}>
        <div className="mx-auto max-w-5xl">
          <header>
            <div className="flex items-center justify-between h-12">
              <Link href='/'><Image src={headerLogo} alt="ヘッダ" height="32" className="ml-4" /></Link>
              <HeaderMenu />
            </div>
          </header>
          <div className="flex">
            <div className="hidden md:block">
              <SideMenu />
            </div>
            <div className="p-4 grow">{children}</div>
            <div className="lg:w-60 shrink-0"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
