import { CartContextProvider } from '@/context/CartStateProvider';
import { StoreContextProvider } from '@/context/StoreStateProvider';
import Hero from '@/ui/store/Home/components/Hero';
import Nav from '@/ui/store/Home/components/Nav';
import StoreAi from '@/ui/store/Home/components/StoreAi';
import { RiFacebookCircleLine, RiInstagramLine, RiYoutubeLine } from '@remixicon/react';
import Link from 'next/link';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (

    <CartContextProvider>
      <header className='langingpage-container px-4 lg:px-0 text-gray-950 dark:text-green-50'>
        <Nav />
      </header>
      <main className="flex min-h-screen flex-col">
        {children}
      </main>

      <footer className="w-full py-4 pt-8 bg-stone-950 text-center mt-24 text-gray-400 rounded-t-[64px]">
        <div className='langingpage-container px-4 lg:px-0'>
          <div className="w-full mt-4 flex gap-16 flex-col md:flex-row md:justify-between">
            <div>
              <h3 className='text-4xl font-semibold text-start'>Alawe Meat Merchants</h3>
              <div className='mt-4 flex items-center gap-4'>
                <RiInstagramLine className='size-6 cursor-pointer' />
                <RiFacebookCircleLine className='size-7 cursor-pointer' />
                <RiYoutubeLine className='size-7 cursor-pointer' />
              </div>
            </div>

            <div className='w-full flex-wrap md:w-fit flex justify-between gap-4 md:gap-20 pb-16 text-start '>
              <div>
                <h4 className='font-semibold'>Quick Links</h4>

                <ul className='space-y-2 pt-2 text-gray-600'>
                  <li><Link href={'/'}>Home</Link></li>
                  <li><Link href={'/products'}>Products</Link></li>
                  <li><Link href={'/#bulk-order'}>Bulk Orders</Link></li>
                </ul>
              </div>

              <div>
                <h4 className='font-semibold'>Information</h4>

                <ul className='space-y-2 pt-2 text-gray-600'>
                  <li><Link href={'#'}>FAQ</Link></li>
                  <li><Link href={'#'}>Blog</Link></li>
                  <li><Link href={'#'}>Support</Link></li>
                </ul>
              </div>

              <div>
                <h4 className='font-semibold'>Company</h4>

                <ul className='space-y-2 pt-2 text-gray-600'>
                  <li><Link href={'#'}>About Us</Link></li>
                  <li><Link href={'#'}>Careers</Link></li>
                  <li><Link href={'#'}>Contact Us</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-600 pt-4 border-t border-t-stone-800 flex gap-4 flex-col-reverse md:flex-row items-center justify-between">
            <p>&copy; 2025 All Rights Reserved.</p>

            <ul className='flex items-center gap-4'>
              <li>
                <Link href="#">Terms</Link>
              </li>

              <li>
                <Link href="#">Privacy</Link>
              </li>

              <li>
                <Link href="#">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
        <StoreAi />
      </footer>
    </CartContextProvider>
  )
}
