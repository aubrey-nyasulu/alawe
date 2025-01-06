import Pagination from '@/ui/dashboard/invoices/components/pagination';
import Search from '@/ui/dashboard/components/search';
import Table from '@/ui/dashboard/invoices/components/table';
import { CreateInvoice } from '@/ui/dashboard/invoices/components/buttons';
import { InvoicesTableSkeleton } from '@/ui/dashboard/components/skeletons';
import { Suspense } from 'react';
import { fetchCities, fetchInvoicesPages } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';
import { ResetFilters, SelectCityFilter, SelectYearFilter } from '../../overview/components/OverviewFilters';

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
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    const { session } = await useServerSession()

    const user = session?.user as User

    const canEdit = user.role === "Supply Chain Manager"

    return (
        <div className="w-full ">
            <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8  sticky top-20 z-30">
                <div className="flex-1 max-w-[400px]">
                    <Search placeholder="Search invoices..." />
                </div>
                <div className="flex items-center gap-4">
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
                        defaultValue: searchParams?.year ?? undefined
                    }} />

                    <SelectCityFilter {...{
                        data: cities,
                        defaultValue: searchParams?.city ?? undefined
                    }} />

                    <ResetFilters />
                </div>
                {/* <CreateInvoice {...{ canCreate: canEdit }} /> */}
            </Card>
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