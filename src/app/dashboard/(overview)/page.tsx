import { Metadata } from 'next'

import OverviewPage from '@/ui/dashboard/overview/OverviewPage'

export const metadata: Metadata = {
    title: 'Overview',
}

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        city?: string,
        branch_id?: string,
        year?: string
    }
}) {

    return (
        <OverviewPage {...{ searchParams }} />
    )
}

