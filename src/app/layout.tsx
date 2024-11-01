import '@/styles/global.css';
import { inter } from '@/assets/fonts';
import { Metadata } from 'next';

import { Toaster } from "@/ui/dashboard/components/Toaster";

export const metadata: Metadata = {
  title: {
    template: '%s | Tilawe Dashboard',
    default: 'Tilawe Dashboard',
  },
  description: 'Database for tilawe meat merchants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-950 dark:text-gray-50 `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}