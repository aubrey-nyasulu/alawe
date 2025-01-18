import Pagination from '@/ui/dashboard/invoices/components/pagination'
import InventoryTable from '@/ui/dashboard/inventory/components/InventoryTable'
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons'
import { Suspense } from 'react'
import { fetchFilteredInventoryPages } from '@/lib/data'
import { fetchBranches } from '@/lib/dbdirect'
import Filters from '../create/components/Filters'
import { SelectBranchFilter, ResetFilters } from '../overview/components/OverviewFilters'

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

    const totalPages = await fetchFilteredInventoryPages({ query, currentPage, branch })
    // const totalPages = 1

    return (
        <div className="w-full px-2 py-4 md:p-4 ">
            <Filters {...{ searchPlaceholder: 'Search Inventory...', className: 'top-0' }}>
                <SelectBranchFilter {...{ data, placeholder: 'Select Branch' }} />

                <ResetFilters />
            </Filters>

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
