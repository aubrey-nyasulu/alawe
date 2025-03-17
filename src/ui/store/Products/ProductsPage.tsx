import { RiSearch2Line } from '@remixicon/react';
import Search from '@/ui/components/search';
import Filters from './components/Filters';
import Products from './components/Products';
import CategoriesButton from './components/CategoriesButton';

export default function ProductsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
    };
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    return (
        <main className='langingpage-container mt-8 px-2 md:px-0 '>
            <section className='flex flex-col-reverse md:flex-row gap-4 md:gap-8 items-center justify-between bg-white p-4 rounded-xl z-40 sticky top-2 '>
                <CategoriesButton />

                <form action="" className='w-full h-16 rounded-full px-4 flex gap-2 items-center justify-between border bg-white'>
                    <Search
                        {...{
                            placeholder: 'Search Products',
                            className: 'border-0 outline-0'
                        }}
                    />

                    <button>
                        <RiSearch2Line className='text-gray-400' />
                    </button>
                </form>
            </section>

            <section
                className='w-full mx-auto langingpage-container mt-4 flex flex-col md:flex-row justify-between '
            >

                <Filters  {...{ currentPage, query }} />

                <Products {...{ currentPage, query }} />
            </section>
        </main>
    )
}