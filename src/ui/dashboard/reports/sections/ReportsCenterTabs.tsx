'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { RiAddBoxLine, RiFile3Line, RiFileAddLine, RiGitRepositoryCommitsLine } from "@remixicon/react"
import TabReportsContent from "../compoents/TabReportsContent"


export default function ReportsCenterTabs({
    children, reports, reportsType, isCEO
}: {
    children: ReactNode,
    reports: { from?: string, to?: string, title: string, documentName: string, downloadableUrl: string, createdAt: string | Date }[],
    reportsType: string,
    isCEO: boolean
}) {
    const [currentsection, setCurrentSection] = useState('')

    useEffect(() => {

        setCurrentSection('reports')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#reports') {
                setCurrentSection('reports')
            }
            if (window.location.hash === '#createReport') {

                setCurrentSection('createReport')
            }
        }
    }, [currentsection])

    const pathname = usePathname()

    return (
        <>
            {
                currentsection.length
                    ? (
                        <Tabs defaultValue={currentsection}>
                            <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm pt-[52px] px-8 gap-8 sticky top-0 z-40">
                                <a href="#reports">
                                    <TabsTrigger value="reports" className="inline-flex gap-1 group">
                                        <RiFile3Line className="size-4" />
                                        Reports
                                    </TabsTrigger>
                                </a>
                                {
                                    isCEO &&
                                    <a href="#createReport">
                                        <TabsTrigger value="createReport" className="inline-flex gap-1 group">
                                            <RiGitRepositoryCommitsLine className="size-5 text-inherit" />
                                            Send Report
                                        </TabsTrigger>
                                    </a>
                                }
                            </TabsList>
                            <div className="mt-0 px-2 md:px-8 py-4">
                                <TabsContent value="reports">
                                    <TabReportsContent {...{ reports, reportsType }} />
                                </TabsContent>
                                {
                                    isCEO &&
                                    <TabsContent value="createReport">
                                        {children}
                                    </TabsContent>
                                }
                            </div>
                        </Tabs>
                    )
                    : (
                        <div className="absolute top-10 left-10">
                            <p>Loading...</p>
                        </div>
                    )
            }
        </>
    )
}