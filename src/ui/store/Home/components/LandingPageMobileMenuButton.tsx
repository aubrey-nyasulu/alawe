"use client"

import { Dispatch, SetStateAction } from "react"

import { RiMenuLine } from "@remixicon/react"

export default function LandingPageMobileMenuButton(
    { setShowMenu }: { setShowMenu: Dispatch<SetStateAction<boolean>> }
) {
    return (
        <button
            className=""
            onClick={() => setShowMenu(prev => !prev)}
        >
            <RiMenuLine className="size-8 text-inherit dark:text-white" />
        </button>
    )
}
