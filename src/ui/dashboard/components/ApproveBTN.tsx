"use client"

import { Button } from "@/tremorComponents/Button"

export default function ApproveBTN() {
    const handleSubmit = async () => {
        const res = await fetch('http://localhost:3000/api/admin')

        console.log({ res })
    }
    return (
        <Button
            onClick={handleSubmit}
            className={"font-semibold text-[#fff] bg-green-500"}>
            approve
        </Button>
    )
}
