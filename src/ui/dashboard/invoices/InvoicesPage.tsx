import Pagination from '@/ui/dashboard/invoices/components/pagination';
import Search from '@/ui/dashboard/components/search';
import Table from '@/ui/dashboard/invoices/components/table';
import { CreateInvoice } from '@/ui/dashboard/invoices/components/buttons';
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';


// import CreateTabs from './sections/CreateTabs';
import { fetchClients } from '@/lib/data';
import { fetchBranches, fetchImployees, fetchSalaries } from '@/lib/dbdirect';
import BranchManagerInvoiceTabs from '../create/sections/BranchManagerInvoiceTabs';
import BraanchManagerInvoicesTabContent from '../create/components/BraanchManagerInvoicesTabContent';

export default async function InvoicesPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        year?: string,
        city?: string,
        page?: string,
    };
}) {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;

    // const totalPages = await fetchInvoicesPages(query);

    const { session } = await useServerSession()

    const user = session?.user as User

    const canEdit = user.role === "Branch Manager"

    const Clients = await fetchClients();
    const Branches = await fetchBranches();
    const Salaries = await fetchSalaries();
    const Employees = await fetchImployees()

    return (
        <div className="w-full">
            <BranchManagerInvoiceTabs {...{ Clients, Branches, Salaries, Employees }} >
                <BraanchManagerInvoicesTabContent {...{ searchParams }} />
            </BranchManagerInvoiceTabs>
        </div>
        // <div className="w-full  p-4">
        //     {/* <div className="flex w-full items-center justify-between">
        //     <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        //     </div> */}
        //     <Card className="flex gap-12 items-center justify-between p-4 px-8  sticky top-0 z-40">
        //         {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Invoices</h1> */}
        //         <div className="flex-1 max-w-[400px]">
        //             <Search placeholder="Search invoices..." />
        //         </div>
        //         <CreateInvoice {...{ canCreate: canEdit }} />
        //     </Card>
        //     <div className='w-full '>
        //         <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        //             <Table {...{ query, currentPage, canEdit }} />
        //         </Suspense>
        //         <div className="my-5 flex w-full justify-center">
        //             <Pagination totalPages={totalPages} />
        //         </div>
        //     </div>
        // </div>
    );
}
