import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='mx-auto max-w-2xl'>
          {children}
        </div>
      </body>
    </html>
  )
}
