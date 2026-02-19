import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "C-ride — Beyond Delivery, It's Care",
  description: 'Fast food, grocery and gift delivery at your doorstep.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body>{children}
      <Toaster richColors position="top-right" /></body>

    </html>
  );
}
