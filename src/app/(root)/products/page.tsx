import ProductsPage from "@/ui/store/Products/ProductsPage";


export default function Products({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
    };
}) {
    return (
        <ProductsPage {...{ searchParams }} />
    )
}
