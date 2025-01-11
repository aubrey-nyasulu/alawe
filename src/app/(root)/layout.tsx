import Hero from '@/ui/store/Home/components/Hero';
import Nav from '@/ui/store/Home/components/Nav';
import StoreAi from '@/ui/store/Home/components/StoreAi';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='langingpage-container px-4 lg:px-0 text-gray-950 dark:text-green-50'>
        <Nav />
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
