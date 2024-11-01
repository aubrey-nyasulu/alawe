"use client"

import { PageStateContext } from "@/context/PageStateProvider"
import { RiMenu2Line, RiMenuLine } from "@remixicon/react"
import { useContext } from "react"

export default function MobileMenuButton() {
    const { setShowMenu } = useContext(PageStateContext)

    return (
        <button
            className=""
            onClick={() => setShowMenu(prev => !prev)}
        >
            <RiMenuLine className="size-8 text-inherit dark:text-white" />
        </button>
    )
}
