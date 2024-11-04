
import Image from 'next/image';
import heroImg from '@/../public/store/heroImg.jpg'
import { Button } from '@/tremorComponents/Button';
import Nav from '@/ui/store/components/Nav';
import StoreAi from '@/ui/store/components/StoreAi';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='langingpage-container px-4 lg:px-0 text-gray-950 dark:text-green-50'>
        <Nav />
        <section className='w-full mt-20 flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='w-full flex-1 flex flex-col gap-2'>
            <h1 className='text-3xl md:text-4xl font-extrabold'>Welcome to Alawe Meat Merchants</h1>
            <p className='text-gray-600'>At Alawe Meat Merchants, we are committed to providing the highest quality halal meat products.</p>
            {/* <div className=' flex gap-4 flex-col'> */}
            <a href="#bulk-order">
              <Button className=' px-8 py-4 w-fit h-fit mt-8'>
                Discover More
              </Button>
            </a>
            {/* </div> */}
          </div>
          <div className='w-full flex-1 p-[2px] rounded-xl overflow-hidden border-2 border-[#323232]'>
            <Image
              src={heroImg}
              alt='hero image'
              width={2000}
              height={2000}
              className='aspect-[5/4] w-full rounded-md'
            />
          </div>
        </section>
      </header>
      <main className="flex min-h-screen flex-col">
        {children}
      </main>

      <footer className="w-full py-4 pt-8 bg-gray-950 text-center mt-10">
        <div className='langingpage-container px-4 lg:px-0'>
          <div className="mt-4">
            <a href="/" className="mx-3 text-gray-300 hover:underline">Home</a>
            <a href="#about" className="mx-3 text-gray-300 hover:underline">About Us</a>
            <a href="#bulk-order" className="mx-3 text-gray-300 hover:underline">Discounts</a>
          </div>
          <div className="mt-4 text-gray-600">
            <p>&copy; 2024 Alawe Meat Processing Company. All Rights Reserved.</p>
          </div>
        </div>
        <StoreAi />
      </footer>
    </>
  )
}
