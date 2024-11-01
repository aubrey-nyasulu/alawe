"use client"

import React, { useState } from 'react'
import { LandingPageMobileMenuDrawer } from './LandingPageMobileMenuDrawer'
import LandingPageMobileMenuButton from './LandingPageMobileMenuButton'
import Link from 'next/link';
import { Button } from '@/tremorComponents/Button';
import logo from '@/../public/logo.png'
import Image from 'next/image';

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav className=' flex items-center justify-between mt-8 sticky top-4'>
            <Link
                href={"/"}
                className='text-primary font-semibold text-xl flex gap-2 items-center justify-start'
            >
                <div className='w-12 h-12 rounded-md bg-primary overflow-hidden'>
                    <Image
                        src={logo}
                        alt='company logo'
                        width={1000}
                        height={1000}
                        className='w-full object-cover object-center'
                    />
                </div>
                <div className='flex-1 overflow-hidden text-gray-900 dark:text-gray-50 text-wrap'>
                    <p className='font-[500] hidden md:block text-ellipsis whitespace-nowrap text-sm'>Tilawe Meat Merchants</p>
                </div>
            </Link>

            <ul className=' items-center gap-4 hidden md:flex border-2 border-[#323232] p-[2px] rounded-full'>
                <li className='hover:text-primary bg-[#323232] text-white p-2 px-3 rounded-full '>
                    <Link href={"/"}>Home</Link>
                </li>
                <li className='hover:text-primary p-2 px-3'>
                    <Link href={"#about"}>About Us</Link>
                </li>
                <li className='hover:text-primary p-2 px-3'>
                    <Link href={"#bulk-order"}>Discounts</Link>
                </li>
            </ul>

            <div className='flex items-center gap-2'>
                <Link
                    href="/login"
                >
                    <Button variant='secondary' className='bg-transparent md:px-8 md:py-4 w-fit h-fit hover:bg-primary hover:text-white  ' >
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
        </nav>
    )
}
