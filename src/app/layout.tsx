'use client'

import "./globals.css";
import { Providers } from '../store/Providers';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
