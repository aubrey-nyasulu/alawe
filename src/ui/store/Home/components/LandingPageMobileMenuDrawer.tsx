"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import Link from "next/link"

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,
} from "@/tremorComponents/Drawer"

import { cx } from "@/lib/utils"

export function LandingPageMobileMenuDrawer({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: Dispatch<SetStateAction<boolean>> }) {
    const [active, setActive] = useState('home')

    return (
        <>
            <div className="flex justify-center">
                <Drawer
                    open={showMenu}
                    onOpenChange={(modalOpened) => {
                        if (!modalOpened) {
                            setShowMenu(false)
                        }
                    }}
                >
                    <DrawerContent className="sm:max-w-lg">
                        <DrawerHeader>
                            <DrawerTitle>Tilawe Meat Merchants</DrawerTitle>
                            <DrawerDescription className="mt-1 text-sm hidden">
                                Drawer description
                            </DrawerDescription>
                        </DrawerHeader>

                        <DrawerBody>
                            <div
                                className="w-full h-full gap-2 grow flex flex-col justify-center "
                            >
                                <ul
                                    className=' w-full h-fit items-center gap-8 flex flex-col text-center '
                                >
                                    <Link
                                        href={"/"}
                                        onClick={() => {
                                            setActive('home')
                                            setShowMenu(false)
                                        }}
                                        className={cx('hover:text-primary w-full py-4 px-8 rounded-md', active === 'home' && 'bg-[#323232] text-white')}
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        href={"/products"}
                                        onClick={() => {
                                            setActive('about')
                                            setShowMenu(false)
                                        }}
                                        className={cx('hover:text-primary w-full py-4 px-8 rounded-md ', active === 'about' && 'bg-[#323232] text-white')}
                                    >
                                        Products
                                    </Link>

                                    <a
                                        href={"/login"}
                                        onClick={() => {
                                            setActive('bulk-order')
                                            setShowMenu(false)
                                        }}
                                        className={cx('block justify-self-end hover:text-primary w-full py-4 px-8 rounded-md', active === 'bulk-order' && 'bg-[#323232] text-white')}
                                    >
                                        Login
                                    </a>
                                </ul>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}