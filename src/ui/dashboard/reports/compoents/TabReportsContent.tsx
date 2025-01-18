import { Card } from "@/tremorComponents/Card";
import { ResetFilters, SelectCityFilter, SelectYearFilter } from "@/ui/dashboard/overview/components/OverviewFilters";
import Search from "@/ui/dashboard/components/search";
import { Report } from "@/types";
import { CreateUserCard } from "../../create/components/CreateUserCard";
import { Button } from "@/tremorComponents/Button";

export default function TabReportsContent({ reports }: {
    reports: {
        sent: Report[];
        received: Report[];
    }
}) {
    return (
        <>
            <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8  sticky top-20 z-30">
                <div className="flex-1 max-w-[400px]">
                    <Search placeholder="Search invoices..." />
                </div>
                <div className="flex items-center gap-4">


                    <ResetFilters />
                </div>
            </Card>
            <div className="w-full space-y-4 mt-4">
                <CreateUserCard {...{ title: 'Received', subTitle: '' }}>
                    <div className="w-full space-y-4 mt-4">
                        {
                            reports.received
                                .map(report => {

                                    const nameArr = report.documentName.split('.')
                                    const ext = nameArr[nameArr.length - 1]

                                    const fileType = fileTypeFromExt(ext)

                                    return (
                                        <Card key={report._id} className="p-3 gap-0 flex items-center justify-between  ">
                                            {/* <small>date</small> */}
                                            <div className="flex flex-col items-center justify-between">
                                                <h2 className="capitalize font-semibold">{report.title}</h2>
                                            </div>
                                            <small className="px-2 hidden md:block">{fileType} Document</small>
                                            <div className="flex items-center justify-between">
                                                <a href={report.downloadableUrl} download>
                                                    <Button variant="secondary" className="md:px-8 md:py-4 px-4 py-3 rounded-full">
                                                        download
                                                    </Button>
                                                </a>
                                            </div>
                                        </Card>
                                    )
                                })
                        }
                    </div>
                </CreateUserCard>

                {/* <CreateUserCard {...{ title: 'Sent', subTitle: '' }}>
                    <div className="w-full space-y-4 mt-4">
                        {
                            reports.sent
                                .map(report => {

                                    const nameArr = report.documentName.split('.')
                                    const ext = nameArr[nameArr.length - 1]

                                    const fileType = fileTypeFromExt(ext)

                                    return (
                                        <Card key={report._id} className="p-3 gap-0 flex items-center justify-between  ">
                                            <div className="flex flex-col items-center justify-between">
                                                <h2 className="capitalize font-semibold">{report.title}</h2>
                                            </div>
                                            <small className="px-2 hidden md:block">{fileType} Document</small>
                                            <div className="flex items-center justify-between">
                                                <a href={report.downloadableUrl} download>
                                                    <Button variant="secondary" className="md:px-8 md:py-4 px-4 py-3 rounded-full">
                                                        download
                                                    </Button>
                                                </a>
                                            </div>
                                        </Card>
                                    )
                                })
                        }
                    </div>
                </CreateUserCard> */}
            </div>
        </>
    )
}


function fileTypeFromExt(ext: string) {
    switch (ext.toLowerCase()) {
        case 'docx': return 'Microsoft Word'
        case 'pdf': return 'PDF'
        default: return ext
    }
}