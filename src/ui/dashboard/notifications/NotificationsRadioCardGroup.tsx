'use client'

import { PageStateContext } from "@/context/PageStateProvider"
import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
} from "@/tremorComponents/RadioCardGroup"
import { NotificationType } from "@/types"
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from "react"

export const NotificationsRadioCardGroup = ({
    searchParams,
}: {
    searchParams?: {
        notifications?: string,
        page?: string,
    };
}) => {
    const { notifications } = useContext(PageStateContext)

    const pathname = usePathname()
    const { replace } = useRouter()

    // const handleSearch = useDebouncedCallback((term) => {
    const handleSearch = (term: NotificationType | 'all') => {
        const params = new URLSearchParams(searchParams!);
        params.set('page', '1');

        if (term) {
            params.set('notifications', term);
        } else {
            params.delete('notifications');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const [filterValue, setFilterValue] = useState<string>('all')

    useEffect(() => {
        setFilterValue(searchParams?.notifications || 'all')
    }, [searchParams])

    const handleClick = (value: NotificationType | 'all') => {
        setFilterValue(value)

        handleSearch(value)
    }

    return (
        <form className=" max-w-sm">
            <fieldset className="space-y-3">
                <RadioCardGroup defaultValue="1" className="text-sm flex gap-4 items-center justify-start">
                    <RadioCardItem
                        value="all"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('all')}
                        checked={filterValue === 'all'}
                    >
                        <RadioCardIndicator />
                        <span>All</span>
                    </RadioCardItem>
                    <RadioCardItem
                        value="account"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('security alert')}
                        checked={filterValue === 'security alert'}
                    >
                        <RadioCardIndicator />
                        <span>Account</span>
                    </RadioCardItem>
                    {/* <RadioCardItem
                        value="3"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('security alert')}
                        checked={filterValue === 'security alert'}
                    >
                        <RadioCardIndicator />
                        <span>Security</span>
                    </RadioCardItem> */}
                    <RadioCardItem
                        value="3"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('new report')}
                        checked={filterValue === 'new report'}
                    >
                        <RadioCardIndicator />
                        <span>Report</span>
                    </RadioCardItem>
                </RadioCardGroup>
            </fieldset>
        </form>
    )

}