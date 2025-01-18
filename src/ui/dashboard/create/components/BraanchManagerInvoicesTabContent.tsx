import Pagination from '@/ui/dashboard/invoices/components/pagination'
import Table from '@/ui/dashboard/invoices/components/table'
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons'
import { Suspense } from 'react'
import { fetchCities, fetchInvoicesPages } from '@/lib/data'
import useServerSession from '@/customHooks/useServerSession'
import { User } from '@/types'
import { ResetFilters, SelectYearFilter } from '../../overview/components/OverviewFilters'
import Filters from './Filters'

export default async function BraanchManagerInvoicesTabContent({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        year?: string,
        city?: string,
        page?: string,
    };
}) {

    let cities = await fetchCities()
    cities = cities.map(city => (
        {
            label: city,
            value: city
        }
    ))

    const query = searchParams?.query || searchParams?.year || searchParams?.city || '';
    const year = searchParams?.year
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    const { session } = await useServerSession()

    const user = session?.user as User

    const canEdit = user.role === "Supply Chain Manager"

    return (
        <div className="w-full ">
            <Filters {...{ searchPlaceholder: 'Search Invoices...' }} >
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
                    defaultValue: year
                }} />

                <ResetFilters />
            </Filters>

            <div className='w-full '>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table {...{ query, currentPage, canEdit }} />
                </Suspense>
                <div className="my-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}