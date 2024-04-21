import "./globals.css";
import { Menu } from "@/components/Menu";

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
        <div className="flex justify-between mx-auto max-w-3xl">
          <div className="w-4/1">
            <Menu />
          </div>
          <div className="w-3/4">{children}</div>
        </div>
      </body>
    </html>
  );
}
