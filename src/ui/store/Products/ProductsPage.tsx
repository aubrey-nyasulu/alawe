'use client'

import sausageImg from '@/../public/store/sausage.jpg'
import Meance from '@/../public/store/meanced meat.jpg'
import Liver from '@/../public/store/liver.jpg'
import Wings from '@/../public/store/wings.jpg'
import { Button } from "@/tremorComponents/Button";
import Link from "next/link";
import Card from '../Home/sections/Card';
import { RiFilter2Line, RiFilter3Line, RiFilterLine, RiSearch2Line, RiSettings2Line, RiSettings3Line, RiSettings4Line, RiSettings5Fill, RiSettings5Line, RiSettings6Line, RiSettingsLine } from '@remixicon/react';
import { CategoriesIcon, FilterIcon } from '@/assets/SVGComponents';
import { cx } from '@/lib/utils';
import { useState } from 'react';


export default function ProductsPage() {
    const [filtersOpen, setFiltersOpen] = useState(false)

    return (
        <main className='langingpage-container mt-8 relative px-2 md:px-0 '>
            <section className='flex gap-8 items-center justify-between bg-white p-4 rounded-xl '>
                <Button
                    variant='secondary'
                    className='rounded-full px-6 py-4 gap-2 hidden md:flex'
                    onClick={() => setFiltersOpen(prevState => !prevState)}
                >
                    <CategoriesIcon />
                    Categories
                </Button>

                <form action="" className='w-full h-fit rounded-full px-4 pl-6 md:pl-8 flex gap-2 items-center justify-between border bg-white'>
                    <input
                        type="search"
                        placeholder='Search'
                        className='w-full h-12 md:h-16 bg-transparent outline-none '
                    />
                    <button>
                        <RiSearch2Line className='text-gray-400' />
                    </button>
                </form>

                <Button variant='secondary' className='rounded-full px-6 py-4 gap-2 hidden md:flex'>
                    <FilterIcon />
                    filter
                </Button>
            </section>
            <section
                className='w-full mx-auto langingpage-container mt-6 md:mt-10 flex justify-between '
            >
                <div className={cx('p-0 w-0 overflow-hidden hidden md:block', filtersOpen && 'w-[300px] p-4')}>
                    <div className='space-y-4'>
                        <Button
                            variant='secondary'
                            className='px-8 py-4 rounded-xl w-full'
                        >
                            Beef Products
                        </Button>

                        <Button
                            variant='secondary'
                            className='px-8 py-4 rounded-xl w-full'
                        >
                            Poultry
                        </Button>

                        <Button
                            variant='secondary'
                            className='px-8 py-4 rounded-xl w-full'
                        >
                            Lamb & Goat
                        </Button>

                        <Button
                            variant='secondary'
                            className='px-8 py-4 rounded-xl w-full'
                        >
                            Processed Meat
                        </Button>
                    </div>
                </div>

                <div className='w-full flex flex-wrap gap-8 items-center md:flex-row flex-col justify-between bg-white p-4 rounded-[32px]'>
                    <Card {...{ image: sausageImg, name: 'Sausage', price: 5200 }} />
                    <Card {...{ image: Liver, name: 'Liver', price: 4000 }} />
                    <Card {...{ image: Meance, name: 'Meance', price: 7500 }} />
                    <Card {...{ image: Wings, name: 'Wings', price: 4500 }} />
                    <Card {...{ image: Wings, name: 'Wings', price: 4500 }} />
                    <Card {...{ image: Meance, name: 'Meance', price: 7500 }} />
                    <Card {...{ image: sausageImg, name: 'Sausage', price: 5200 }} />
                    <Card {...{ image: Liver, name: 'Liver', price: 4000 }} />
                </div>
            </section>
        </main>
    )
}
