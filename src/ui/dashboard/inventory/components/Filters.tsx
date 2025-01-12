'use client'

import { Button } from '@/tremorComponents/Button';
import { FilterIcon } from '@/assets/SVGComponents';
import Search from '../../components/search';
import { Card } from '@/tremorComponents/Card';
import { ResetFilters, SelectBranchFilter, SelectYearFilter } from '../../overview/components/OverviewFilters';
import { useState } from 'react';
import { cx } from '@/lib/utils';

export default function Filters({ data }: {
    data: {
        value: string;
        label: string;
    }[]
}) {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8  sticky top-0 z-30">
            <div className="flex-1 max-w-[400px] flex items-center gap-2">
                <Search placeholder="Search Inventory..." />

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
                <SelectBranchFilter {...{ data, placeholder: 'Select Branch' }} />
                <ResetFilters />
            </div>
        </Card>
    )
}
