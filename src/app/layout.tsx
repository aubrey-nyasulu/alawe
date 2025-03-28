import { inter } from '@/assets/fonts'
import { Metadata } from 'next'

import '@/styles/global.css'
import { Toaster } from "@/ui/dashboard/components/Toaster"
import { StoreContextProvider } from '@/context/StoreStateProvider'
import { PopUp } from '@/ui/dashboard/components/PopUp'

export const metadata: Metadata = {
  title: {
    template: '%s | Alawe',
    default: 'Alawe',
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
      <body className={`${inter.className} antialiased text-gray-950 dark:text-gray-50 relative `}>
        <StoreContextProvider>
          {children}
        </StoreContextProvider>
        <Toaster />
        <PopUp />
      </body>
    </html>
  )
}