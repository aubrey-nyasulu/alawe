'use client'

import StoreContext from "@/context/StoreStateProvider"
import { cx } from "@/lib/utils"
import { Button } from "@/tremorComponents/Button"
import { useContext, useEffect, useRef, useState } from "react"

export default function Filters({ currentPage, query }: { currentPage: number, query: string }) {
    const { categories, currentCategory, setCurrentCategory, filtersOpen, updateStoreState } = useContext(StoreContext)

    // const [fixed, setFixed] = useState(false)

    const filteresRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     if (!window) return


    //     window.addEventListener('scroll', checkTop)

    //     function checkTop() {
    //         if (filteresRef.current) {
    //             const { top } = filteresRef.current.getBoundingClientRect()


    //             if (top <= 20 && filtersOpen) {
    //                 filteresRef.current.style.position = 'fixed'
    //                 filteresRef.current.style.top = '20px'

    //                 setFixed(true)
    //             } else {
    //                 filteresRef.current.style.display = 'relative'
    //                 filteresRef.current.style.top = 'unset'

    //                 setFixed(false)
    //             }
    //         }
    //     }

    //     return () => { window.removeEventListener('scroll', checkTop) }
    // }, [filtersOpen])

    return (
        <div className={cx("w-screen md:w-fit overflow-x-auto md:overflow-x-hidden z-30 mb-4")}>
            <div
                // ref={filteresRef}
                className={cx('p-0 w-fit md:w-0 h-0 md:h-full overflow-hidden flex ', filtersOpen && 'md:w-[300px] h-fit p-4')}>
                <div className='w-fit flex flex-row md:flex-col gap-4'>
                    <Button
                        variant='secondary'
                        className={cx('px-8 py-4 rounded-full w-fit md:w-full text-stone-500 hover:text-black', currentCategory === '' && 'text-black border-stone-500')}
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
                                className={cx('px-8 py-4 rounded-full w-fit md:w-full text-stone-500 hover:text-black', currentCategory === category && 'text-black border-stone-500')}
                                onClick={() => {
                                    setCurrentCategory(category)
                                    updateStoreState({ category, currentPage: Number(currentPage) || 1, query })
                                }}
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
