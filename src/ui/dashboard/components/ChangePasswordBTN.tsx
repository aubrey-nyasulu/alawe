"use client"

import { PageStateContext } from "@/context/PageStateProvider"
import { cx } from "@/lib/utils"
import { Button } from "@/tremorComponents/Button"
import { useContext } from "react"

export default function ChangePasswordBTN({ styles }: { styles?: string }) {
    const { editProfileModalShow, setEditProfileModalShow } = useContext(PageStateContext)
    return (
        <Button
            variant="secondary"
            onClick={() => setEditProfileModalShow(!editProfileModalShow)}
            className={cx(" text-black", styles)}>
            Change
        </Button>
    )
}
