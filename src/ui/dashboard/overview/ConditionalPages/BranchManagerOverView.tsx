
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCardData, fetchCities, fetchRevenue, fetchShopManagerAnalytics, getMonthlyRevenueByCity, someFecth } from '@/lib/data';
import { fetchBranches } from '@/lib/dbdirect';
import { AdminTrackerChart } from '../components/AdminTrackerChart';
import { OverviewBarChart } from '../components/OverviewBarChart';
import { transformData } from './CEOOverview';
import { ResetFilters, SelectCityFilter, SelectYearFilter } from '../components/OverviewFilters';
import { formatCurrency } from '@/lib/utils';

export default async function BranchManagerOverView({
    searchParams,
}: {
    searchParams?: {
        city?: string,
        year?: string
    };
}) {
    // return <p>Admin Overview</p>
    let { totalInvoices, totalSalesTransactions } = await fetchShopManagerAnalytics()

    const year = searchParams?.year || '2024'
    const city = 'Lilongwe'
    const revenue = await getMonthlyRevenueByCity({ city: "Lilongwe", year: Number(year) })
    const data = transformData(revenue)

    let data3 = await fetchCardData()
    const cardData = [
        {
            cardTitle: "Invoices Collected",
            percentValue: data3.paidPercentage,
            numalator: data3.totalPaidInvoices,
            denominator: data3.total
        },
        {
            cardTitle: "Invoices Pending",
            percentValue: data3.pendingPercentage,
            numalator: data3.totalPendingInvoices,
            denominator: data3.total,
            invert: true
        },
    ]

    let data2 = await someFecth({ year, city })
    const cardData2 = [
        {
            cardTitle: "Budget",
            denominator: formatCurrency(data2?.budget)
        },
        {
            cardTitle: "Expenditure",
            denominator: formatCurrency(data2?.expenditure)
        },
        {
            cardTitle: "Revenue",
            denominator: formatCurrency(data2?.revenue)
        },
        {
            cardTitle: "Profit Margin",
            percentValue: Number((((data2.revenue - data2.expenditure) / data2.revenue) * 100).toFixed(2)),
            fair: true
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
                <Card className="flex gap-2 md:gap-12 flex-col md:flex-row items-center justify-start p-4 px-8  sticky top-0 z-40">
                    <SelectCityFilter {...{ data: [{ label: "Lilongwe", value: 'Lilongwe' }], defaultValue: 'Lilongwe', disabled: true }} />
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
                <div className="mt-4 w-full">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData2 }} />
                    </Suspense>
                </div>
                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <Card className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50'>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <OverviewBarChart {...{ chartdata: data }} />
                    </Suspense>
                </Card>
            </div>
        </main >
    )
}


