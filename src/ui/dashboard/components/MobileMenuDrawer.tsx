"use client"

import React, { useContext, useState } from "react"

import { Button } from "@/tremorComponents/Button"
import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/tremorComponents/Drawer"
import { useSession } from "next-auth/react"
import { User, UserRole } from "@/types"
import { PageStateContext } from "@/context/PageStateProvider"
import NavLinks from "./nav-links"
import SideNavLinks from "./SideNavLinks"



export function MobileMenuDrawer({ role, _id }: { role: UserRole, _id: string }) {

    const { data: session } = useSession()
    const user = session?.user as User

    const { showMenu, setShowMenu } = useContext(PageStateContext)

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
                                <SideNavLinks {...{ role, _id, }} />
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}