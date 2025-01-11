"use client"

import { Button } from "@/tremorComponents/Button"
import { ClientApplyDrawer } from "./ClientApplyDrawer"
import { useState } from "react"

export default function ClientApply() {
    const [showModel, setShowModel] = useState(false)

    return (
        <>
            <Button
                className='md:px-8 md:py-4 w-fit h-fit bg-primary rounded-full text-white mt-8 ring ring-offset-2 ring-primary/50 hover:ring-orange-600'
                onClick={() => setShowModel(true)}
            >
                Become a Client
            </Button>
            <ClientApplyDrawer {...{ showModel, setShowModel }} />
        </>
    )
}
