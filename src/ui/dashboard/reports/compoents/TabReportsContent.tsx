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
            {/* <Card className="flex gap-4  flex-wrap md:flex-row md:items-center justify-between p-4 md:px-8  sticky top-20 z-30">
                <div className="flex-1 max-w-[400px]">
                    <Search placeholder="Search invoices..." />
                </div>
                <div className="flex items-center gap-4">
                    <SelectYearFilter {...{
                        data: [
                            {
                                label: '2024',
                                value: '2024'
                            },
                            {
                                label: '2023',
                                value: '2023'
                            },
                            {
                                label: '2022',
                                value: '2022'
                            },
                            {
                                label: '2021',
                                value: '2021'
                            },
                            {
                                label: '2020',
                                value: '2020'
                            },
                        ],
                        defaultValue: '2024' 
                    }} />

                    <ResetFilters />
                </div>
            </Card> */}
            <div className="w-full space-y-4">
                <CreateUserCard {...{ title: 'Received', subTitle: '' }}>
                    <div className="w-full space-y-4 mt-4">
                        {
                            reports.received
                                .map(report => (
                                    <Card key={report._id}>
                                        {/* <small>date</small> */}
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-lg capitalize md:text-2xl font-semibold">{report.title}</h2>
                                            {/* <div>Status</div> */}
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p>{report.documentName}</p>
                                            <a href={report.downloadableUrl} download>
                                                <Button>
                                                    download
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                ))
                        }
                    </div>
                </CreateUserCard>
                <CreateUserCard {...{ title: 'Sent', subTitle: '' }}>
                    <div className="w-full space-y-4 mt-4">
                        {
                            reports.sent
                                .map(report => (
                                    <Card key={report._id}>
                                        {/* <small>date</small> */}
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-lg capitalize md:text-2xl font-semibold">{report.title}</h2>
                                            {/* <div>Status</div> */}
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p>{report.documentName}</p>
                                            <a href={report.downloadableUrl} download>
                                                <Button>
                                                    download
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                ))
                        }
                    </div>
                </CreateUserCard>
            </div>
        </>
    )
}
