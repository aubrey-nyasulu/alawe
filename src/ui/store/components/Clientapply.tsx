"use client"

import { Button } from "@/tremorComponents/Button"
import { ClientApplyDrawer } from "./ClientApplyDrawer"
import { useState } from "react"

export default function ClientApply() {
    const [showModel, setShowModel] = useState(false)

    return (
        <>
            <Button
                className='px-8 py-4 w-fit h-fit mt-8'
                onClick={() => setShowModel(true)}
            >
                Become a Client
            </Button>
            <ClientApplyDrawer {...{ showModel, setShowModel }} />
        </>
    )
}
