
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons'

import { Suspense } from 'react'

import { Card } from '@/tremorComponents/Card'

import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards'
import { fetchCities, fetchProcurementManagerAnalytics } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import { fetchBranches } from '@/lib/dbdirect'
import TopSuppliersTable from '../components/TopSuppliersTable'
import { ResetFilters, SelectYearFilter } from '../components/OverviewFilters'
import TopItemsTable from '../components/TopItemsTable'

export default async function ProcurementManagerOverView({
    searchParams,
}: {
    searchParams?: {
        quert?: '',
        branch_id?: string,
        year?: string
    }
}) {
    const year = searchParams?.year || '2024'

    let { expenditures, topSuppliers, topItems } = await fetchProcurementManagerAnalytics({ year })

    const total_expenditure = expenditures.reduce((acc, expenditures) => acc + expenditures.total_spent, 0)

    const cardData = expenditures.map(expenditure => {
        return {
            cardTitle: expenditure._id,
            numalator: formatCurrency(expenditure.total_spent),
            denominator: formatCurrency(total_expenditure),
            percentValue: Number((expenditure.total_spent * 100 / total_expenditure).toFixed(1)),
            invert: true
        }
    })

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
                <Card className="flex gap-2 md:gap-12 items-center justify-between md:justify-start p-4 px-4 md:px-8 sticky top-0 z-40">
                    <div className="max-w-40">
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
                    </div>

                    <ResetFilters />
                </Card>

                <p className='p-6 pb-0 font-semibold'>Expenditures</p>

                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>

                <div className="w-full ">
                    <div className='flex gap-4 flex-col md:flex-row items-start w-full '>
                        <div className='md:flex-[3] w-full'>
                            <Suspense fallback={<CardsSkeleton />}>
                                <TopItemsTable {...{ currentPage: 1, query: '', title: 'Top Items', topItems }} />
                            </Suspense>
                        </div>

                        <div className='md:flex-[2] w-full'>
                            <Suspense fallback={<CardsSkeleton />}>
                                <TopSuppliersTable {...{ title: "Top Suppliers", topSuppliers }} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}


