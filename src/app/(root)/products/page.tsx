import { Metadata } from "next"

import ProductsPage from "@/ui/store/Products/ProductsPage"

export const metadata: Metadata = {
    title: 'Products',
}

export default function Products({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
    }
}) {
    return (
        <ProductsPage {...{ searchParams }} />
    )
}
