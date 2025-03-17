import { CartContextProvider } from '@/context/CartStateProvider'
import StoreFooter from '@/ui/store/components/StoreFooter'
import Nav from '@/ui/store/Home/components/Nav'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartContextProvider>
      <header className='langingpage-container px-4 lg:px-0 text-gray-950 dark:text-green-50'>
        <Nav />
      </header>

      <main className="flex min-h-screen flex-col">
        {children}
      </main>

      <StoreFooter />
    </CartContextProvider>
  )
}
