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
import { FilterIcon } from '@/assets/SVGComponents';
import { Button } from '@/tremorComponents/Button';
import FilterButton from './Filters';
import Filters from './Filters';

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
            <Filters year={searchParams?.year ?? undefined} />

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