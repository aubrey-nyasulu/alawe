'use client'

import { CategoriesIcon } from "@/assets/SVGComponents";
import StoreContext from "@/context/StoreStateProvider";
import { Button } from "@/tremorComponents/Button";
import { useContext } from "react";

export default function CategoriesButton() {
    const { setFiltersOpen } = useContext(StoreContext)

    return (
        <Button
            variant='secondary'
            className='rounded-full px-6 py-4 gap-2 w-full md:w-fit md:flex'
            onClick={() => setFiltersOpen(prevState => !prevState)}
        >
            <CategoriesIcon />
            Categories
        </Button>
    )
}
