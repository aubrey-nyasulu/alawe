
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCities, fetchRevenue, fetchShopManagerAnalytics, getMonthlyRevenueByCity, supplyChainCards } from '@/lib/data';
import { fetchBranches } from '@/lib/dbdirect';
import { AdminTrackerChart } from '../components/AdminTrackerChart';
import { OverviewBarChart } from '../components/OverviewBarChart';
import { transformData } from './CEOOverview';
import { ResetFilters, SelectBranchFilter, SelectCityFilter, SelectYearFilter } from '../components/OverviewFilters';
import InventoryTable from '../../inventory/components/InventoryTable';

export default async function SupplyChainManagerManagerOverView({
    searchParams,
}: {
    searchParams?: {
        quert?: '',
        branch_id?: string,
        year?: string
    };
}) {
    // return <p>Admin Overview</p>
    let { totalInvoices, totalSalesTransactions } = await fetchShopManagerAnalytics()

    const { totalAmount, totalGroceries, totalMeatProducts } = await supplyChainCards()

    const cardData = [
        {
            cardTitle: "Total Meat Products",
            numalator: totalMeatProducts.toLocaleString(),
        },
        {
            cardTitle: "Other Products Total",
            numalator: totalGroceries.toLocaleString(),
        },
        {
            cardTitle: "Total in Value",
            numalator: totalAmount.toLocaleString(),
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
    const branch = branches.find(branch => branch._id === searchParams?.branch_id)?.address || branches[0].address
    console.log({ branch })
    branches = branches.map(branch => {
        if (branch.city === 'Lilongwe') {
            return {
                label: branch.address,
                value: branch._id
            }
        }
    }
    )


    return (
        <main className='container max-w-[1120px]'>
            <div className='px-4 py-4'>
                <Card className="flex gap-2 md:gap-12 flex-col md:flex-row items-center justify-start p-4 px-8  sticky top-0 z-40">
                    <SelectCityFilter {...{ data: [{ label: "Lilongwe", value: 'Lilongwe' }], defaultValue: 'Lilongwe', disabled: true }} />

                    <SelectBranchFilter {...{ data: branches, defaultValue: branch }} />

                    <SelectYearFilter {...{
                        data: [
                            {
                                label: '2024',
                                value: '2024'
                            },
                            {
                                label: '2023',
                                value: '2023'
                            },
                            {
                                label: '2022',
                                value: '2022'
                            },
                            {
                                label: '2021',
                                value: '2021'
                            },
                            {
                                label: '2020',
                                value: '2020'
                            },
                        ],
                        defaultValue: searchParams?.year || "2024"
                    }} />
                    <ResetFilters />
                    {/* <SelectBranchFilter {...{ data: branches }} /> */}
                </Card>
                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <div className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50'>Inventory</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        {/* <OverviewBarChart {...{ chartdata: data }} /> */}
                        <InventoryTable {...{ query: '', branch: '', currentPage: 1, canEdit: false }} />
                    </Suspense>
                </div>
            </div>
        </main >
    )
}