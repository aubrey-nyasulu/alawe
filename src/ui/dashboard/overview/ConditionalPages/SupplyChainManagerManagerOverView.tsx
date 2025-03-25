
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons'

import { Suspense } from 'react'

import { Card } from '@/tremorComponents/Card'

import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards'
import { fetchCities, fetchOrdersAnalytics, fetchSupplyChainManagerAnalytics } from '@/lib/data'
import { fetchBranches } from '@/lib/dbdirect'
import { ResetFilters, SelectYearFilter } from '../components/OverviewFilters'
import { decimalToRatio, formatCurrency } from '@/lib/utils'
import { StackedBarChart } from '../components/StackedBarChart'

export default async function SupplyChainManagerManagerOverView({
    searchParams,
}: {
    searchParams?: {
        quert?: '',
        branch_id?: string,
        year?: string
    }
}) {
    const year = searchParams?.year || '2024'

    const { const_of_goods_sold, avg_inventory } = await fetchSupplyChainManagerAnalytics({ year })

    const { ordersFullfilmentRates } = await fetchOrdersAnalytics({ year })

    const cardData = [
        {
            cardTitle: "Cost of Goods Sold",
            denominator: formatCurrency(const_of_goods_sold),
        },
        {
            cardTitle: "Average Inventory",
            denominator: formatCurrency(avg_inventory),
        },
        {
            cardTitle: "Inventory Turnover",
            denominator: decimalToRatio((const_of_goods_sold / avg_inventory)),
            percentValue: Number((const_of_goods_sold * 100 / avg_inventory).toFixed(0))
        }
    ]

    let cities = await fetchCities()
    cities = cities.map(city => (
        {
            label: city,
            value: city
        }
    ))

    let branches: any[] = await fetchBranches()

    branches = branches.map(branch => {
        if (branch.city === 'Lilongwe') {
            return {
                label: branch.address,
                value: branch._id
            }
        }
    })

    return (
        <main className='container max-w-[1120px]'>
            <div className='px-2 md:px-4 py-4'>
                <Card className="flex gap-2 md:gap-12  items-center justify-start p-4 px-8  sticky top-0 z-40">
                    <SelectYearFilter {...{
                        data: Array.from({ length: 5 }, (_, i) => i)
                            .map(i => (
                                {
                                    label: 2020 + i + '',
                                    value: 2020 + i + ''
                                }
                            )),
                        defaultValue: searchParams?.year || "2024"
                    }} />

                    <ResetFilters />
                </Card>

                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>

                <Card className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50 pb-12'>
                        Orders Fullfilment Rates
                    </p>

                    <Suspense fallback={<CardsSkeleton />}>
                        <StackedBarChart {...{ ordersFullfilmentRates }} />
                    </Suspense>
                </Card>
            </div>
        </main >
    )
}