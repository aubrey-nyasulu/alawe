import { fetchReports, fetchUsers } from "@/lib/data";
import { CreateUserCard } from "../create/components/CreateUserCard";
import ReportsCenterTabs from "./sections/ReportsCenterTabs";
import FileUploadForm from "@/ui/dashboard/reports/compoents/FileUploadForm";
import useServerSession from "@/customHooks/useServerSession";
import { User } from "@/types";

export default async function ReportsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        reportsType?: string,
    };
}) {
    const { session } = await useServerSession()

    const user = session?.user as User

    const isCEO = user.role !== 'Company Manager'

    const reportsType = searchParams?.reportsType || 'received'
    const query = searchParams?.query || ''

    const users = await fetchUsers()
    const reports = await fetchReports({ id: user._id, reportsType, query })

    return (
        <div className="w-full ">
            <ReportsCenterTabs {...{ reports, reportsType, isCEO }}>
                <CreateUserCard {...{ title: 'Report', subTitle: 'Create Report' }}>
                    <FileUploadForm {...{ users }} />
                </CreateUserCard>
            </ReportsCenterTabs>
        </div>
    )
}
