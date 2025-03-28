"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { RiUser3Line } from '@remixicon/react'
import { Button } from '@/tremorComponents/Button'

import { LandingPageMobileMenuDrawer } from './LandingPageMobileMenuDrawer'
import LandingPageMobileMenuButton from './LandingPageMobileMenuButton'
import logo from '@/../public/logo.png'
import { cx } from '@/lib/utils'
import Cart from '../../components/Cart'

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false)

    const pathName = usePathname()

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
            </Link>

            <div
                className="flex gap-16 items-center md:border md:bg-white p-1 rounded-full"
            >
                <ul
                    className=' items-center gap-2 hidden md:flex border rounded-full h-full py-2 px-4 '
                >
                    <li
                        className={cx('hover:text-primary hover:font-semibold p-2 px-3 flex hover:gap-2 items-center group/li', pathName === '/' && 'text-primary font-semibold ')}
                    >
                        <div className='w-0 h-0 border-0 group-hover/li:border-4 border-primary border-b-transparent border-r-transparent group-hover/li:rotate-[120deg] group-hover/li:scale-150'></div>

                        <Link href={"/"}>Home</Link>
                    </li>

                    <li
                        className={cx('hover:text-primary hover:font-semibold p-2 px-3 flex gap-2 items-center group/li', pathName === '/products' && 'text-primary font-semibold ')}
                    >
                        <div className='w-0 h-0 border-0 group-hover/li:border-4 border-primary border-b-transparent border-r-transparent group-hover/li:rotate-[120deg] group-hover/li:scale-150'></div>

                        <Link href={"/products"}>Products</Link>
                    </li>
                </ul>

                <div className='flex items-center gap-2 md:gap-4'>
                    <Cart />

                    <a
                        href="/login"
                        className='hidden md:block'
                    >
                        <Button variant='secondary' className='bg-transparent md:p-4 w-fit h-fit hover:bg-primary hover:border-white hover:text-white rounded-full  ' >
                            <RiUser3Line />
                        </Button>
                    </a>

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
