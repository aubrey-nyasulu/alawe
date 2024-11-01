import CreateTabs from './sections/CreateTabs';
import { fetchClients } from '@/lib/data';
import { fetchBranches, fetchImployees, fetchSalaries } from '@/lib/dbdirect';

export default async function CreatePage() {

    const Clients = await fetchClients();
    const Branches = await fetchBranches();
    const Salaries = await fetchSalaries();
    const Employees = await fetchImployees()

    return (
        <div className="w-full">
            <div className="">
                <CreateTabs {...{ Clients, Branches, Salaries, Employees }} />
            </div>
        </div>
    )
}
