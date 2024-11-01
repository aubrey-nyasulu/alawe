import { Button } from "@/tremorComponents/Button"
import { TextInput } from "@/ui/dashboard/components/InputComponents"
import { SelectComponent } from "@/ui/dashboard/components/SelectComponent"
import { Client } from "@/types"
import CreateInvoiceForm from "@/ui/dashboard/create/components/CreateInvoiceForm"
import { CreateUserCard } from "@/ui/dashboard/create/components/CreateUserCard"

export default function TabsCreateInvoiceContent({ Clients }: { Clients: Client[] }) {
    return (
        <CreateUserCard {...{ title: 'Invoice', subTitle: 'Create Invoice' }}>
            <CreateInvoiceForm Clients={Clients} />
        </CreateUserCard>
    )
}


