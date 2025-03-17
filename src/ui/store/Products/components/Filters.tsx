'use client'

import { useContext, useEffect, useRef, useState } from "react"

import { Button } from "@/tremorComponents/Button"

import StoreContext from "@/context/StoreStateProvider"
import { cx } from "@/lib/utils"

export default function Filters({ currentPage, query }: { currentPage: number, query: string }) {
    const { categories, currentCategory, setCurrentCategory, filtersOpen, updateStoreState } = useContext(StoreContext)

    return (
        <div className={cx("w-screen h-fit md:w-fit overflow-x-auto md:overflow-x-hidden z-30 mb-4 sticky top-32 ")}>
            <div
                className={
                    cx(
                        'p-0 w-fit md:w-0 h-0 md:h-full overflow-hidden flex ', filtersOpen && 'md:w-[300px] h-fit p-4'
                    )
                }
            >
                <div className='w-fit flex flex-row md:flex-col gap-4'>
                    <Button
                        variant='secondary'
                        className={
                            cx(
                                'px-8 py-4 rounded-full w-fit md:w-full text-stone-500 hover:text-black',
                                currentCategory === '' && 'text-black border-stone-500'
                            )
                        }
                        onClick={() => {
                            setCurrentCategory('')
                            updateStoreState({ category: '', currentPage: Number(currentPage) || 1, query })
                        }}
                    >
                        all
                    </Button>

                    {
                        categories.map(({ category }) => (
                            <Button
                                key={category}
                                variant='secondary'
                                onClick={() => {
                                    setCurrentCategory(category)
                                    updateStoreState({ category, currentPage: Number(currentPage) || 1, query })
                                }}
                                className={
                                    cx(
                                        'px-8 py-4 rounded-full w-fit md:w-full text-stone-500 hover:text-black   ', currentCategory === category && 'text-black border-stone-500'
                                    )
                                }
                            >
                                {category}
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
