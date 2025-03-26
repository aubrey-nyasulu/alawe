import { Metadata } from "next";

import ReportsPage from "@/ui/dashboard/reports/ReportsPage";

export const metadata: Metadata = {
    title: 'Reports',
}

export default function Reports({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        reportsType?: string,
    }
}) {
    return <ReportsPage searchParams={searchParams} />
}
