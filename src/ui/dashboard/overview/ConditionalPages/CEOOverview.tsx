import { Suspense } from 'react'

import { Card } from '@/tremorComponents/Card'

import { CardsSkeleton } from '@/ui/dashboard/components/skeletons'
import { OverviewBarChart } from '@/ui/dashboard/overview/components/OverviewBarChart'
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards'
import { fetchCardData, fetchCities, getMonthlyRevenueByCity, MonthlyRevenueByCity } from '@/lib/data'
import { formatCurrency, months } from '@/lib/utils'
import { ResetFilters, SelectCityFilter, SelectYearFilter } from '../components/OverviewFilters'

export default async function CEOOverview({
    searchParams,
}: {
    searchParams?: {
        city?: string,
        branch_id?: string,
        year?: string
    }
}) {
    const query = searchParams?.city || ''
    const city = searchParams?.city || ''
    const year = searchParams?.year || '2024'

    const [fetchedCardData, monthlyRevenueByCity, cities] = await Promise.all([
        fetchCardData({ year, city }),
        getMonthlyRevenueByCity({ city, year: Number(year) }),
        fetchCities()
    ])

    const { budget, expenditure, revenue } = fetchedCardData

    const cardData = generateCardData({ budget, expenditure, revenue })

    const chartdata = generateChartData(monthlyRevenueByCity)

    const cityFilterData = cities.map(city => (
        {
            label: city,
            value: city
        }
    ))

    return (
        <main className='w-full container max-w-[1120px]'>
            <div className='w-full px-2 md:px-4 py-4'>
                <Card className="flex gap-2 md:gap-12  items-center justify-between md:justify-start p-4 px-1 md:px-8  sticky top-0 z-40">
                    <SelectCityFilter {...{
                        data: cityFilterData,
                        defaultValue: query ?? undefined
                    }} />

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
            </div>
        </main >
    )
}

function generateCardData(data: {
    budget: number;
    expenditure: number;
    revenue: number;
}) {
    return [
        {
            cardTitle: "Budget",
            denominator: formatCurrency(data?.budget)
        },
        {
            cardTitle: "Expenditure",
            denominator: formatCurrency(data?.expenditure)
        },
        {
            cardTitle: "Revenue",
            denominator: formatCurrency(data?.revenue)
        },
        {
            cardTitle: "Profit Margin",
            percentValue: Number((((data.revenue - data.expenditure) / data.revenue) * 100).toFixed(1)),
            fair: true
        },
    ]
}

export const generateChartData = (monthlyRevenuByCity: MonthlyRevenueByCity[]): { date: string, Lilongwe?: number, Blantyre?: number, Mzuzu?: number }[] => {
    const transformedMonthlyRevenuByCity = []

    const orderedMonthlyRevenuByCity = monthlyRevenuByCity.sort((a, b) => a.month > b.month ? 1 : 0)

    let numberOfCities: any[] | any = monthlyRevenuByCity.map(rev => rev.city)
    numberOfCities = new Set(numberOfCities)
    numberOfCities = numberOfCities.size

    for (let month of months) {
        let index = orderedMonthlyRevenuByCity.findIndex(rev => rev.month === month)
        while (index >= 0) {
            const [city1Data, city2Data, city3Data] = orderedMonthlyRevenuByCity.splice(index, numberOfCities)
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

            transformedMonthlyRevenuByCity.push(revenue)
            index = orderedMonthlyRevenuByCity.findIndex(rev => rev.month === month)
        }
    }

    return transformedMonthlyRevenuByCity
}