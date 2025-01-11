
import { fetchReports, fetchUsers } from "@/lib/data";
import { CreateUserCard } from "../create/components/CreateUserCard";
import ReportsCenterTabs from "./sections/ReportsCenterTabs";
import FileUploadForm from "@/ui/store/Home/components/FileUploadForm";
import useServerSession from "@/customHooks/useServerSession";
import { User } from "@/types";

export default async function ReportsPage() {
    const { session } = await useServerSession()

    const user = session?.user as User

    const users = await fetchUsers()
    const reports = await fetchReports(user._id)

    return (
        <div className="w-full ">
            <ReportsCenterTabs {...{ reports }}>
                <CreateUserCard {...{ title: 'Report', subTitle: 'Create Report' }}>
                    <FileUploadForm {...{ users }} />
                </CreateUserCard>
            </ReportsCenterTabs>
        </div>
    )
}
