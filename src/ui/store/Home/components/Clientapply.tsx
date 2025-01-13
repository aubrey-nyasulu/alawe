"use client"

import { Button } from "@/tremorComponents/Button"
import { ClientApplyDrawer } from "./ClientApplyDrawer"
import { useState } from "react"

export default function ClientApply() {
    const [showModel, setShowModel] = useState(false)

    return (
        <>
            <Button
                className='mt-8 px-8 py-4 w-fit h-fit bg-primary rounded-full text-white ring ring-offset-2 ring-primary/30 hover:ring-orange-700'
                onClick={() => setShowModel(true)}
            >
                Become a Client
            </Button>
            <ClientApplyDrawer {...{ showModel, setShowModel }} />
        </>
    )
}
