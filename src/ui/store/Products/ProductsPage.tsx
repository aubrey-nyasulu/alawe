import { Button } from "@/tremorComponents/Button";
import { RiSearch2Line } from '@remixicon/react';
import { FilterIcon } from '@/assets/SVGComponents';

import Search from '@/ui/dashboard/components/search';
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
        <main className='langingpage-container mt-8 relative px-2 md:px-0 '>
            <section className='flex gap-8 items-center justify-between bg-white p-4 rounded-xl '>
                <CategoriesButton />

                <form action="" className='w-full h-16 rounded-full px-4 flex gap-2 items-center justify-between border bg-white'>
                    <Search {...{ placeholder: 'Search Products', className: 'border-0 outline-0' }} />
                    <button>
                        <RiSearch2Line className='text-gray-400' />
                    </button>
                </form>

                <Button variant='secondary' className='rounded-full px-6 py-4 gap-2 hidden md:flex'>
                    <FilterIcon />
                    filters
                </Button>
            </section>

            <section
                className='w-full mx-auto langingpage-container mt-6 md:mt-10 flex justify-between '
            >
                <Filters  {...{ currentPage, query }} />

                <Products {...{ currentPage, query }} />
            </section>

        </main>
    )
}