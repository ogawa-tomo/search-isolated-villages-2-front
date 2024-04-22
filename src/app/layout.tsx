import "./globals.css";
import { HeaderMenu } from "@/components/HeaderMenu";
import { SideMenu } from "@/components/SideMenu";

export const metadata = {
  title: '秘境集落探索ツール',
  description: '秘境集落を探索し、秘境度を人口分布データをもとに評価して地域別にランキングで出力します。'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="corporate">
      <body>
        <div className="mx-auto max-w-3xl">
          <header>
            <div className="flex items-center justify-between">
              <div>ロゴ</div>
              <HeaderMenu />
            </div>
          </header>
          <div className="flex justify-center">
            <div className="relative hidden md:block">
              <SideMenu />
            </div>
            <div className="p-4 w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
