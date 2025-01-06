
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { OverviewBarChart } from '@/ui/dashboard/overview/components/OverviewBarChart';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCardData, fetchCities, getMonthlyRevenueByCity, getTotalRevenueByCity, MonthlyRevenuByMonth, someFecth } from '@/lib/data';
import { fetchRevenue } from '@/lib/data';
import { Revenue } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { fetchBranches } from '@/lib/dbdirect';
import { ResetFilters, SelectCityFilter, SelectYearFilter } from '../components/OverviewFilters';


export default async function CEOOverview({
    searchParams,
}: {
    searchParams?: {
        city?: string,
        branch_id?: string,
        year?: string
    };
}) {
    const query = searchParams?.city || '';
    const city = searchParams?.city || ''
    const year = searchParams?.year || '2024'

    let data = await fetchCardData()
    let data2 = await someFecth({ year, city })

    const cardData = [
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

    // const revenue = await fetchRevenue(query)
    // const revenue = await getTotalRevenueByCity({ city, year: Number(year) })
    const revenue = await getMonthlyRevenueByCity({ city, year: Number(year) })
    const chartdata = transformData(revenue)

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
                    <SelectCityFilter {...{ data: cities, defaultValue: query ?? undefined }} />
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
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <Card className='mt-4'>
                    <p className='text-gray-900 dark:text-gray-50'>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <OverviewBarChart {...{ chartdata }} />
                    </Suspense>
                </Card>
                {/* </div> */}
            </div>
        </main >
    )
}

const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const transformData = (data: MonthlyRevenuByMonth[]): { date: string, Lilongwe?: number, Blantyre?: number, Mzuzu?: number }[] => {
    const transformedData = []

    const orderedData = data.sort((reva, revb) => reva.month > revb.month ? 1 : 0)

    let numberOfCities: any[] | any = data.map(rev => rev.city)
    numberOfCities = new Set(numberOfCities)
    numberOfCities = numberOfCities.size

    for (let month of months) {
        let index = orderedData.findIndex(rev => rev.month === month)
        while (index >= 0) {
            const [city1Data, city2Data, city3Data] = orderedData.splice(index, numberOfCities)
            let revenue: any = { date: "", }
            if (city1Data) {
                revenue.date = city1Data.month
                revenue[city1Data.city] = city1Data.totalRevenue
            }
            if (city2Data) {
                revenue.date = city2Data.month
                revenue[city2Data.city] = city2Data.totalRevenue
            }
            if (city3Data) {
                revenue.date = city3Data.month
                revenue[city3Data.city] = city3Data.totalRevenue
            }

            transformedData.push(revenue)
            index = orderedData.findIndex(rev => rev.month === month)
        }
    }

    // if (numberOfCities) {
    //     let i = 0
    //     while (data.length) {
    //         if (i >= 50) return []

    //         let revenue: any = { date: "", }

    //         if (numberOfCities === 3) {
    //             const [LilongweData, BlantyreData, MzuzuData] = data.splice(0, numberOfCities)

    //             revenue.date = LilongweData.month
    //             revenue.Lilongwe = LilongweData.totalRevenue
    //             revenue.Blantyre = BlantyreData.totalRevenue
    //             revenue.Mzuzu = MzuzuData.totalRevenue
    //         }

    //         if (numberOfCities === 1) {
    //             const [city] = data.splice(0, numberOfCities)
    //             revenue.date = city.month
    //             revenue[city.city] = city.totalRevenue
    //         }

    //         transformedData.push(revenue)

    //         i++
    //     }
    // }


    // return []
    return transformedData
}