
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { OverviewBarChart } from '@/ui/dashboard/overview/components/OverviewBarChart';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchAdminAnalytics, fetchCardData, fetchCities, fetchProcurementManagerAnalytics, fetchShopManagerAnalytics } from '@/lib/data';
import { fetchRevenue } from '@/lib/data';
import { Revenue } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { fetchBranches } from '@/lib/dbdirect';
import { AdminTrackerChart } from '../components/AdminTrackerChart';
import SuppliersTable from '../../suppliers/components/table';
import LatestInvoicesTable from '../components/LatestInvoicesTable';
import TopSuppliersTable from '../components/TopSuppliersTable';

export default async function ProcurementManagerOverView() {
    // return <p>Admin Overview</p>
    let { totalInvoices, totalPurchaseTransactions } = await fetchProcurementManagerAnalytics()

    const cardData = [
        {
            cardTitle: "Total Purchase Transactions",
            numalator: 674,
        },
        {
            cardTitle: "Total Items Purchased",
            numalator: 2373,
        },
        {
            cardTitle: "Total Clients",
            numalator: 30,
        },
    ]

    let cities = await fetchCities()
    cities = cities.map(city => (
        {
            label: city,
            value: city
        }
    ))

    let branches: any[] = await fetchBranches()
    branches = branches.map(branch => (
        {
            label: branch.address,
            value: branch._id
        }
    ))

    return (
        <main className='container max-w-[1120px]'>
            <div className='px-4 py-4'>
                <Card className="flex gap-12 items-center justify-start p-4 px-8  sticky top-0 z-40">
                    {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Inventory</h1> */}
                    <div className="max-w-40">
                        <SelectComponent {...{ data: cities, placeholder: 'Select City' }} />
                    </div>
                    <div className="max-w-40">
                        <SelectComponent {...{ data: branches, placeholder: 'Select Branch' }} />
                    </div>
                    <div className="max-w-40">
                        <SelectComponent {...{ data: [], placeholder: 'Select Filter' }} />
                    </div>
                </Card>
                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <div className="w-full ">
                    <div className='flex gap-4 flex-col md:flex-row items-start w-full '>
                        <div className='md:flex-[3] w-full'>
                            <Suspense fallback={<CardsSkeleton />}>
                                <LatestInvoicesTable {...{ currentPage: 1, query: '', title: 'Recent Purchase Transactions' }} />
                            </Suspense>
                        </div>
                        <div className='md:flex-[2] w-full'>
                            <Suspense fallback={<CardsSkeleton />}>
                                <TopSuppliersTable {...{ title: "Top Suppliers" }} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}


