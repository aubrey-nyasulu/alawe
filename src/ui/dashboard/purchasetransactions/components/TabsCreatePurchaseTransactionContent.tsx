import { Button } from "@/tremorComponents/Button"
import { TextInput } from "@/ui/dashboard/components/InputComponents"
import { SelectComponent } from "@/ui/dashboard/components/SelectComponent"
import { Client, Item, Supplier } from "@/types"
import CreateInvoiceForm from "@/ui/dashboard/create/components/CreateInvoiceForm"
import { CreateUserCard } from "@/ui/dashboard/create/components/CreateUserCard"
import CreatePurchaseTransaction from "./CreatePurchaseTransaction"

export default function TabsCreatePurchaseTransactionContent({ items, Suppliers }: { items: Item[], Suppliers: Supplier[] }) {
    return (
        <CreateUserCard {...{ title: 'Purchase Transaction', subTitle: 'Create Purchase Transaction' }}>
            <CreatePurchaseTransaction {...{ Suppliers, items }} />
        </CreateUserCard>
    )
}


