"use client"

import { RiMenuLine } from "@remixicon/react"
import { Dispatch, SetStateAction } from "react"

export default function LandingPageMobileMenuButton({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: Dispatch<SetStateAction<boolean>> }) {

    return (
        <button
            className=""
            onClick={() => setShowMenu(prev => !prev)}
        >
            <RiMenuLine className="size-8 text-inherit dark:text-white" />
        </button>
    )
}
