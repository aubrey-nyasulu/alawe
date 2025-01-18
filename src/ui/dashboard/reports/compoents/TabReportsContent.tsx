import { Card } from "@/tremorComponents/Card";
import { DynamicFilter, ResetFilters } from "@/ui/dashboard/overview/components/OverviewFilters";
import { CreateUserCard } from "../../create/components/CreateUserCard";
import { Button } from "@/tremorComponents/Button";
import Filters from "../../create/components/Filters";

export default function TabReportsContent({ reports, reportsType }: {
    reports: { from: string, title: string, documentName: string, downloadableUrl: string }[],
    reportsType: string
}) {
    return (
        <>
            <Filters {...{ searchPlaceholder: 'Search Reports...' }}>
                <DynamicFilter {...{
                    name: 'reportsType',
                    data: [
                        { label: 'Received', value: 'received' },
                        { label: 'Sent', value: 'sent' },
                    ],
                    defaultValue: reportsType.toLowerCase(),
                }} />

                <ResetFilters preserve="reportsType=received" />
            </Filters>

            <div className="w-full space-y-4 mt-4">
                <CreateUserCard {...{ title: reportsType, subTitle: '' }}>
                    <div className="w-full space-y-4">
                        {
                            reports.map((report, index) => {

                                const nameArr = report.documentName.split('.')
                                const ext = nameArr[nameArr.length - 1]

                                const fileType = fileTypeFromExt(ext)

                                return (
                                    <Card key={report.title + index} className="p-3 gap-0 flex items-center justify-between  ">
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