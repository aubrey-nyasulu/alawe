import Pagination from '@/ui/dashboard/invoices/components/pagination';
import Search from '@/ui/dashboard/components/search';
import Table from '@/ui/dashboard/inventory/components/InventoryTable';
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons';
import { Suspense } from 'react';
import { fetchFilteredInventoryPages } from '@/lib/data';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchBranches } from '@/lib/dbdirect';
import { Card } from '@/tremorComponents/Card';
import SuppliersTable from './components/table';

export default async function SupplierPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {



    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    // const totalPages = await fetchFilteredInventoryPages(query, currentPage);
    const totalPages = 1

    return (
        <div className="w-full p-4">
            {/* <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div> */}
            <Card className="flex gap-12 items-center justify-between p-4 px-8  sticky top-0 z-40">
                {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Inventory</h1> */}
                <div className="flex-1 max-w-[400px]">
                    <Search placeholder="Search Inventory..." />
                </div>
                <div className="max-w-40">
                    {/* <SelectComponent {...{ data, placeholder: 'Select Branch' }} /> */}
                </div>
            </Card>
            <div className='w-full '>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    {/* <Table query={query} currentPage={currentPage} /> */}
                    <SuppliersTable {...{ currentPage, query }} />
                </Suspense>
                <div className="mt-6 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
