import "./globals.css";

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
      <body id='root'>
        <div className="mx-auto max-w-2xl">{children}</div>
      </body>
    </html>
  );
}
