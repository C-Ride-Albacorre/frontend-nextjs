import { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import ReactQueryProvider from '@/components/providers/react-query-provider';

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
      <body>
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
