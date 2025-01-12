'use client'

import { useState } from "react"
import { AutofillerDrawer } from "./AutofillerDrawer"
import { Button } from "@/tremorComponents/Button"

export default function Autofiller() {
    const [showModel, setShowModel] = useState(false)

    return (
        <div className="mt-4 w-full">
            <Button
                variant="secondary"
                className="w-full rounded-full p-4 "
                onClick={() => setShowModel(prevState => !prevState)}
            >
                Easy Login</Button>
            <AutofillerDrawer {...{ showModel, setShowModel }} />
        </div>
    )
}
