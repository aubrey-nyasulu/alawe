import { Card } from "@/tremorComponents/Card";
import { DynamicFilter, ResetFilters } from "@/ui/dashboard/overview/components/OverviewFilters";
import { CreateUserCard } from "../../create/components/CreateUserCard";
import { Button } from "@/tremorComponents/Button";
import Filters from "../../create/components/Filters";
import TimePassed from "@/app/dashboard/notifications/TimePassed";

export default function TabReportsContent({ reports, reportsType }: {
    reports: { from?: string, to?: string, title: string, documentName: string, downloadableUrl: string, createdAt: string | Date }[],
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
                    {
                        reports.length
                            ? (
                                < div className="w-full space-y-6 mt-3">
                                    {
                                        reports.map((report, index) => {

                                            const nameArr = report.documentName.split('.')
                                            const ext = nameArr[nameArr.length - 1]

                                            const fileType = fileTypeFromExt(ext)

                                            return (
                                                <Card key={report.title + index} className="p-3 pt-8 gap-0 flex items-center justify-between relative  ">
                                                    <small className="absolute w-fit h-8 bg-gray-100 dark:bg-gray-900 -top-3 grid place-content-center px-4 rounded-full">{fileType} Document</small>
                                                    <div className="flex flex-col gap-1">
                                                        <h2 className="capitalize font-semibold">
                                                            {report.title}
                                                        </h2>

                                                        <div className="opacity-50 flex items-center gap-2">
                                                            <small >
                                                                {reportsType === 'received' ? 'Received from' : 'Sent to'}: {reportsType === 'received' ? report.from : report.to}
                                                            </small>

                                                            <small>
                                                                <TimePassed inputDate={new Date(report.createdAt)} />
                                                            </small>
                                                        </div>
                                                    </div>
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
                            )
                            : <p className="p-4 pt-0 opacity-50">0 reports {reportsType} </p>
                    }
                </CreateUserCard>
            </div>
        </>
    )
}

function fileTypeFromExt(ext: string): string {
    switch (ext.toLowerCase()) {
        case 'docx': return 'Microsoft Word'
        case 'doc': return 'Microsoft Word'
        case 'pdf': return 'PDF'
        case 'xlsx': return 'Microsoft Excel Spreadsheet'
        case 'xls': return 'Microsoft Excel Spreadsheet'
        case 'pptx': return 'Microsoft PowerPoint Presentation'
        case 'ppt': return 'Microsoft PowerPoint Presentation'
        case 'csv': return 'Comma-Separated Values'
        case 'txt': return 'Plain Text File'
        case 'rtf': return 'Rich Text Format'
        case 'odt': return 'OpenDocument Text'
        case 'ods': return 'OpenDocument Spreadsheet'
        case 'odp': return 'OpenDocument Presentation File'
        default: return `Unknown or Unsupported File Type (${ext})`
    }
}
