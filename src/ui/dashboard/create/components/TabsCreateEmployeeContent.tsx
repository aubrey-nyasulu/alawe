
import { Branch, Employee } from "@/types"
import { CreateUserCard } from "@/ui/dashboard/create/components/CreateUserCard"
import AddEmployeeForm from "./AddEmployeeForm"
import { FetchSalariesReturnType } from "@/lib/dbdirect"

export default function TabsCreateEmployeeContent({ Branches, Salaries, Users }: {
    Branches: Branch[], Salaries: FetchSalariesReturnType[], Users: {
        _id: string
        username: string
        role: string
    }[]
}) {
    return (
        <CreateUserCard {...{ title: 'Employee', subTitle: 'Create Employee' }}>
            <AddEmployeeForm {...{ Branches, Salaries, Users }} />
        </CreateUserCard>
    )
}


