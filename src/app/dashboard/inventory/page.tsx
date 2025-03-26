import InventoryPage from '@/ui/dashboard/inventory/InventoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Inventory',
}

export default async function Inventory({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        branch_id?: string,
        page?: string,
    }
}) {
    return (
        <InventoryPage {...{ searchParams }} />
    )
}