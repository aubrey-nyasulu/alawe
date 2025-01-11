'use client'

import StoreContext from "@/context/StoreStateProvider"
import { cx } from "@/lib/utils"
import { Button } from "@/tremorComponents/Button"
import { useContext } from "react"

export default function Filters({ currentPage, query }: { currentPage: number, query: string }) {
    const { categories, currentCategory, setCurrentCategory, filtersOpen, updateStoreState } = useContext(StoreContext)

    return (
        <div className={cx('p-0 w-0 overflow-hidden hidden md:block', filtersOpen && 'w-[300px] p-4')}>
            <div className='space-y-4'>
                <Button
                    variant='secondary'
                    className={cx('px-8 py-4 rounded-full w-full', currentCategory === '' && 'text-primary border-primary')}
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
                            className={cx('px-8 py-4 rounded-full w-full', currentCategory === category && 'text-primary border-primary')}
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
    )
}
