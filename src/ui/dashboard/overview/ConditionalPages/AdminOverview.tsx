
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons'

import { Suspense } from 'react'
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards'
import { Card } from '@/tremorComponents/Card'
import { fetchAdminAnalytics, fetchCities } from '@/lib/data'
import { fetchBranches } from '@/lib/dbdirect'
import { AdminBarChart } from '../components/AdminBarChart'
import { SelectYearFilter, ResetFilters } from '../components/OverviewFilters'

export default async function AdminOverview({
    searchParams,
}: {
    searchParams?: {
        quert?: '',
        branch_id?: string,
        year?: string
    }
}) {
    const year = searchParams?.year || '2024'

    let { usageAnalytics, chartdata } = await fetchAdminAnalytics({ year })

    const cardData = [
        {
            cardTitle: "Documents Read",
            numalator: Math.floor(usageAnalytics.total_documents_read / 1000) + 'k',
            denominator: '200k',
            percentValue: Number(((usageAnalytics.total_documents_read / 200000) * 100).toFixed(0)),
        },
        {
            cardTitle: "Documents Written",
            numalator: Math.floor(usageAnalytics.total_documents_written / 1000) + 'k',
            denominator: '100k',
            percentValue: Number(((usageAnalytics.total_documents_written / 100000) * 100).toFixed(0)),
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
                <Card className="flex gap-12 items-center justify-start p-4 px-8  sticky top-0 z-40">
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
                </Card>
                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <Card className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50'>Operation Cost</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <AdminBarChart {...{ chartdata: chartdata }} />
                    </Suspense>
                </Card>
            </div>
        </main >
    )
}