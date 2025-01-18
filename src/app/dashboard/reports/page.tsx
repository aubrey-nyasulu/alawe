import ReportsPage from "@/ui/dashboard/reports/ReportsPage";

export default function Reports({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        reportsType?: string,
    };
}) {
    return <ReportsPage searchParams={searchParams} />
}
