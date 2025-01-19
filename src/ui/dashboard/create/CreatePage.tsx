import CreateTabs from './sections/CreateTabs';
import { fetchClients } from '@/lib/data';
import { fetchBranches, fetchImployees, fetchSalaries, fetchUsers } from '@/lib/dbdirect';

export default async function CreatePage() {

    const Clients = await fetchClients();
    const Branches = await fetchBranches();
    const Salaries = await fetchSalaries();
    const Users = await fetchUsers()

    return (
        <div className="w-full">
            <div className="">
                <CreateTabs {...{ Clients, Branches, Salaries, Users }} />
            </div>
        </div>
    )
}
