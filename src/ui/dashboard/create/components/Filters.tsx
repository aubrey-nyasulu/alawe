'use client'

import { Button } from '@/tremorComponents/Button';
import { FilterIcon } from '@/assets/SVGComponents';
import Search from '../../components/search';
import { Card } from '@/tremorComponents/Card';
import { ResetFilters, SelectYearFilter } from '../../overview/components/OverviewFilters';
import { ReactNode, useState } from 'react';
import { cx } from '@/lib/utils';

export default function Filters({ children, searchPlaceholder, className }: { children: ReactNode, searchPlaceholder: string, className?: string }) {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <Card className={cx("flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8 sticky top-20 z-30", className)}>
            <div className="flex-1 max-w-[400px] flex items-center gap-2">
                <Search placeholder={searchPlaceholder || 'Search...'} />

                <div className='block md:hidden'>
                    <Button
                        variant='secondary'
                        onClick={() => setShowFilters(prevState => !prevState)}
                    >
                        <FilterIcon {...{ color: '#A7323F' }} />
                    </Button>
                </div>
            </div>

            <div className={cx("items-center gap-4  w-full md:w-fit hidden md:flex flex-col md:flex-row", showFilters && 'flex')}>
                {
                    children
                }
            </div>
            {/* <CreateInvoice {...{ canCreate: canEdit }} /> */}
        </Card >
    )
}
