'use client'

import StoreContext from "@/context/StoreStateProvider"
import { useContext, useEffect } from "react"
import Card from "../../Home/sections/Card"
import { ProductsImages } from '@/lib/constants'
import img_not_available from '@/../public/store/Image_not_available.png'
import Pagination from "@/ui/dashboard/invoices/components/pagination"
import ProductsSkeleton from "./ProductsSkeleton"

export default function Products({ currentPage, query }: { currentPage: number, query: string }) {
    const { products, totalPages, currentCategory, updateStoreState } = useContext(StoreContext)

    useEffect(() => {
        updateStoreState({ category: currentCategory, currentPage, query })
    }, [currentPage, query])

    return (
        <div className='w-full flex flex-col items-center gap-8'>
            <div className='w-full flex flex-wrap gap-8 items-center md:flex-row flex-col justify-center bg-white p-4 rounded-[32px]'>
                {
                    products.length
                        ? products.map((product, i) => (
                            <Card
                                key={product + i}
                                {...{
                                    // @ts-ignore
                                    image: ProductsImages[product.name] || img_not_available,
                                    name: product.name,
                                    price: product.price / 100
                                }} />
                        ))

                        : <ProductsSkeleton />
                }
            </div>

            <Pagination {...{ totalPages }} />
        </div>
    )
}
