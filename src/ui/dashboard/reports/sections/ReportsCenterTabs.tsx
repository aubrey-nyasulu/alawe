'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { RiAddBoxLine, RiFile3Line } from "@remixicon/react"
import TabReportsContent from "../compoents/TabReportsContent"
import { Report } from "@/types"




export default function ReportsCenterTabs({
    children, reports
}: {
    children: ReactNode,
    reports: {
        sent: Report[];
        received: Report[];
    }
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
                                        Report
                                    </TabsTrigger>
                                </a>
                                <a href="#createReport">
                                    <TabsTrigger value="createReport" className="inline-flex gap-1 group">
                                        <RiAddBoxLine className="size-5 text-inherit" />
                                        Create Report
                                    </TabsTrigger>
                                </a>
                            </TabsList>
                            <div className="mt-0 px-2 md:px-8 py-4">
                                <TabsContent value="reports">
                                    <TabReportsContent {...{ reports }} />
                                </TabsContent>
                                <TabsContent value="createReport">
                                    {children}
                                </TabsContent>
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