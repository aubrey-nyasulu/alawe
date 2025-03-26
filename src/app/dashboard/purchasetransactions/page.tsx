import { Metadata } from "next"

import PurchaseTransactionsPage from "@/ui/dashboard/purchasetransactions/PurchaseTransactionsPage"

export const metadata: Metadata = {
    title: 'Purchase Transactions',
}

export default function PurchaseTransactions() {
    return <PurchaseTransactionsPage />
}
