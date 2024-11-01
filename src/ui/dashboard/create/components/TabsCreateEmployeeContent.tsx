
import { Branch, Employee } from "@/types"
import { CreateUserCard } from "@/ui/dashboard/create/components/CreateUserCard"
import AddEmployeeForm from "./AddEmployeeForm"
import { FetchSalariesReturnType } from "@/lib/dbdirect"

export default function TabsCreateEmployeeContent({ Branches, Salaries, Employees }: { Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {
    return (
        <CreateUserCard {...{ title: 'Employee', subTitle: 'Create Employee' }}>
            <AddEmployeeForm {...{ Branches, Salaries, Employees }} />
        </CreateUserCard>
    )
}


