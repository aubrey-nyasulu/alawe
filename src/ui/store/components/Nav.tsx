"use client"

import React, { useState } from 'react'
import { LandingPageMobileMenuDrawer } from './LandingPageMobileMenuDrawer'
import LandingPageMobileMenuButton from './LandingPageMobileMenuButton'
import Link from 'next/link';
import { Button } from '@/tremorComponents/Button';
import logo from '@/../public/logo.png'
import Image from 'next/image';
import { CartIcon } from '@/assets/SVGComponents';
import { RiTrophyFill } from '@remixicon/react';

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav className=' flex items-center justify-between mt-4 sticky top-4'>
            <Link
                href={"/"}
                className='text-primary font-semibold text-xl flex gap-2 items-center justify-start'
            >
                <div className='w-20 h-20 rounded-md overflow-hidden'>
                    <Image
                        src={logo}
                        alt='company logo'
                        width={1000}
                        height={1000}
                        className='w-full object-cover object-center'
                    />
                </div>
                {/* <div className='flex-1 overflow-hidden text-gray-900 dark:text-gray-50 text-wrap'>
                    <p className='font-[500] hidden md:block text-ellipsis whitespace-nowrap text-sm'>Alawe Meat Merchants</p>
                </div> */}
            </Link>

            <div className="flex gap-16 items-center">
                <ul className=' items-center gap-4 hidden md:flex '>
                    <li className=' p-2 px-3 text-primary font-semibold flex gap-2 items-center group/li '>
                        <div className='w-0 h-0 border-4 border-primary border-b-transparent border-l-transparent group-hover/li:rotate-45 group-hover/li:scale-150 '></div>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className=' p-2 px-3'>
                        <Link href={"#bulk-order"}>Products</Link>
                    </li>
                </ul>

                <div className='flex items-center gap-6'>
                    <CartIcon />

                    <Link
                        href="/login"
                    >
                        <Button variant='secondary' className='bg-transparent md:px-8 md:py-4 w-fit h-fit hover:bg-primary hover:border-white hover:text-white rounded-full  ' >
                            Log in
                        </Button>
                    </Link>
                    <div className='md:hidden flex gap-2 items-center '>
                        <div className='md:hidden  flex gap-2 items-center'>
                            <LandingPageMobileMenuButton {...{ showMenu, setShowMenu }} />
                            <LandingPageMobileMenuDrawer {...{ showMenu, setShowMenu }} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
