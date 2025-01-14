"use client"

import React, { Dispatch, SetStateAction, useState } from "react"

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/tremorComponents/Drawer"
import Link from "next/link"
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

                        </DrawerHeader>
                        <DrawerBody>
                            <div className="w-full h-full gap-2 grow flex-col flex">
                                <ul className='pt-32 w-full h-full items-center gap-8 flex flex-col text-center '>
                                    <Link
                                        href={"/"}
                                        className={cx('hover:text-primary w-full py-4 px-8 rounded-full', active === 'home' && 'bg-[#323232] text-white')}
                                        onClick={() => {
                                            setActive('home')
                                            setShowMenu(false)
                                        }}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href={"/products"}
                                        className={cx('hover:text-primary w-full py-4 px-8 rounded-full ', active === 'about' && 'bg-[#323232] text-white')}
                                        onClick={() => {
                                            setActive('about')
                                            setShowMenu(false)
                                        }}
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        href={"/login"}
                                        className={cx('block justify-self-end hover:text-primary w-full py-4 px-8 rounded-full', active === 'bulk-order' && 'bg-[#323232] text-white')}
                                        onClick={() => {
                                            setActive('bulk-order')
                                            setShowMenu(false)
                                        }}
                                    >
                                        Login
                                    </Link>
                                </ul>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}