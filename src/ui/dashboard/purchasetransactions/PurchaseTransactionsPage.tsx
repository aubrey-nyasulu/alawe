import { Suspense } from "react"
import TabsCreatePurchaseTransactionContent from "./components/TabsCreatePurchaseTransactionContent"
import ProcurementPurchaseTransactionsTabs from "./sections/ProcurementPurchaseTransactionsTabs"
import LatestInvoicesTable from "../overview/components/LatestInvoicesTable"
import { CardsSkeleton } from "../components/skeletons"
import TopSuppliersTable from "../overview/components/TopSuppliersTable"
import { fetchItems, fetchSuppliers } from "@/lib/dbdirect"

async function PurchaseTransactionsPage() {
    const Suppliers = await fetchSuppliers()
    const items = await fetchItems()

    return (
        <ProcurementPurchaseTransactionsTabs {...{ Suppliers, items }}>
            <div className="w-full ">
                <Suspense fallback={<CardsSkeleton />}>
                    <LatestInvoicesTable />
                </Suspense>
            </div>
        </ProcurementPurchaseTransactionsTabs>
    )
}

export default PurchaseTransactionsPage