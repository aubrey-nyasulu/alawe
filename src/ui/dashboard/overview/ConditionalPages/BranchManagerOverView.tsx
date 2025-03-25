
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons'

import { Suspense } from 'react'

import { Card } from '@/tremorComponents/Card'

import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards'
import { fetchBranchCardData, fetchCities, getMonthlyRevenueByCity, fetchCardData } from '@/lib/data'
import { fetchBranches } from '@/lib/dbdirect'
import { OverviewBarChart } from '../components/OverviewBarChart'
import { generateChartData } from './CEOOverview'
import { ResetFilters, SelectCityFilter, SelectYearFilter } from '../components/OverviewFilters'
import { formatCurrency } from '@/lib/utils'

export default async function BranchManagerOverView({
    searchParams,
}: {
    searchParams?: {
        city?: string,
        year?: string
    }
}) {
    const year = searchParams?.year || '2024'
    const city = 'Lilongwe'

    const revenue = await getMonthlyRevenueByCity({
        city: "Lilongwe",
        year: Number(year)
    })

    const chartdata = generateChartData(revenue)

    let cardData = await fetchCardData({ year, city })

    const progressCardData = [
        {
            cardTitle: "Budget",
            denominator: formatCurrency(cardData?.budget)
        },
        {
            cardTitle: "Expenditure",
            denominator: formatCurrency(cardData?.expenditure)
        },
        {
            cardTitle: "Revenue",
            denominator: formatCurrency(cardData?.revenue)
        },
        {
            cardTitle: "Profit Margin",
            percentValue: Number((((cardData.revenue - cardData.expenditure) / cardData.revenue) * 100).toFixed(1)),
            fair: true
        },
    ]

    let branchCardData = await fetchBranchCardData()
    const progressCard2Data = [
        {
            cardTitle: "Invoices Collected",
            percentValue: branchCardData.paidPercentage,
            numalator: branchCardData.totalPaidInvoices,
            denominator: branchCardData.total
        },
        {
            cardTitle: "Invoices Pending",
            percentValue: branchCardData.pendingPercentage,
            numalator: branchCardData.totalPendingInvoices,
            denominator: branchCardData.total,
            invert: true
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
            <div className='px-2 md:px-4 py-4'>
                <Card className="flex gap-2 md:gap-12 items-center justify-start p-4 px-2 md:px-8 sticky top-0 z-40">
                    <SelectCityFilter {...{ data: [{ label: "Lilongwe", value: 'Lilongwe' }], defaultValue: 'Lilongwe', disabled: true }} />
                    <SelectYearFilter {...{
                        data: Array.from({ length: 5 }, (_, i) => i)
                            .map(i => (
                                {
                                    label: 2020 + i + '',
                                    value: 2020 + i + ''
                                }
                            )),
                        defaultValue: year
                    }} />

                    <ResetFilters />
                </Card>
                <div className="mt-4 w-full">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: progressCardData }} />
                    </Suspense>
                </div>

                <Card className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50'>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <OverviewBarChart {...{ chartdata }} />
                    </Suspense>
                </Card>

                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: progressCard2Data }} />
                    </Suspense>
                </div>
            </div>
        </main >
    )
}


