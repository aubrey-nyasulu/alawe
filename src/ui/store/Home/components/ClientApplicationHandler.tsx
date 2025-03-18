"use client"

import { useState } from "react"

import { Button } from "@/tremorComponents/Button"
import { ClientApplicationDrawer } from "./ClientApplicationDrawer"

export default function ClientApplicationHandler() {
    const [showModel, setShowModel] = useState(false)

    return (
        <>
            <Button
                onClick={() => setShowModel(true)}
                className='mt-8 px-8 py-4 w-fit h-fit bg-primary rounded-full text-white ring ring-offset-2 ring-primary/30 hover:ring-orange-700'
            >
                Become a Client
            </Button>

            <ClientApplicationDrawer {...{ showModel, setShowModel }} />
        </>
    )
}
