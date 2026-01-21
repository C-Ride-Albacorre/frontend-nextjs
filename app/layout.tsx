import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'C-ride — Food, Grocery & Gift Delivery',
  description: 'Fast food, grocery and gift delivery at your doorstep.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
