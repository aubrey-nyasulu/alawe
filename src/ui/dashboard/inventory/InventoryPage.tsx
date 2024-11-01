import Pagination from '@/ui/dashboard/invoices/components/pagination';
import Search from '@/ui/dashboard/components/search';
import InventoryTable from '@/ui/dashboard/inventory/components/InventoryTable';
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons';
import { Suspense } from 'react';
import { fetchFilteredInventoryPages } from '@/lib/data';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchBranches } from '@/lib/dbdirect';
import { Card } from '@/tremorComponents/Card';
import { ResetFilters, SelectBranchFilter } from '../overview/components/OverviewFilters';

export default async function InventoryPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        branch_id?: string;
        page?: string;
    };
}) {
    const selectBranchesData = await fetchBranches()

    const data = selectBranchesData.map(branch => (
        {
            value: branch._id as string,
            label: branch.address as string
        }
    ))


    const query = searchParams?.query || '';
    const branch = searchParams?.branch_id || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchFilteredInventoryPages({ query, currentPage, branch }); 1
    // const totalPages = 1

    return (
        <div className="w-full p-4">
            <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8    items-center   px-8  sticky top-0 z-40">
                <div className="flex-1 max-w-[400px]">
                    <Search placeholder="Search Inventory..." />
                </div>
                {/* <div className="max-w-40"> */}
                <div className="flex items-center gap-4">
                    <SelectBranchFilter {...{ data, placeholder: 'Select Branch' }} />
                    <ResetFilters />
                </div>
            </Card>
            <div className='w-full '>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <InventoryTable query={query} branch={branch} currentPage={currentPage} />
                </Suspense>
                <div className="mt-6 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
