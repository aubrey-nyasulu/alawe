'use client'

import { Button } from '@/tremorComponents/Button';
import { FilterIcon } from '@/assets/SVGComponents';
import Search from '../../components/search';
import { Card } from '@/tremorComponents/Card';
import { ResetFilters, SelectYearFilter } from '../../overview/components/OverviewFilters';
import { useState } from 'react';
import { cx } from '@/lib/utils';

export default function Filters({ year }: { year: string | undefined }) {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8  sticky top-20 z-30">
            <div className="flex-1 max-w-[400px] flex items-center gap-2">
                <Search placeholder="Search invoices..." />

                <div className='block md:hidden'>
                    <Button
                        variant='secondary'
                        onClick={() => setShowFilters(prevState => !prevState)}
                    >
                        <FilterIcon {...{ color: '#A7323F' }} />
                    </Button>
                </div>
            </div>

            <div className={cx("items-center gap-4 hidden md:flex ", showFilters && 'flex')}>
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
            </div>
            {/* <CreateInvoice {...{ canCreate: canEdit }} /> */}
        </Card>
    )
}
