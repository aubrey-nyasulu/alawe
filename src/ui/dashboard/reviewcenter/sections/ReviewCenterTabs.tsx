'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { useEffect, useState } from "react"
import TabsReviewCenterContent from "../components/TabsReviewCenterContent"
import { RiCoinsLine, RiUser2Line, RiClockwise2Line, RiAB } from "@remixicon/react";
import TabsReviewOtherContent from "../components/TabsReviewOtherContent"


export default function ReviewCenterTabs() {
    const [currentsection, setCurrentSection] = useState('')

    useEffect(() => {
        setCurrentSection('Financial')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#createUser') {
                setCurrentSection('createUser')
            }
            if (window.location.hash === '#Project') {
                setCurrentSection('Project')
            }
            if (window.location.hash === '#Personal') {
                setCurrentSection('Personal')
            }
            if (window.location.hash === '#Other') {
                setCurrentSection('Other')
            }
        }
    }, [currentsection])

    return (
        <>
            {
                currentsection.length
                    ? (
                        <Tabs defaultValue={currentsection}>
                            <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm pt-8 md:pt-[52px] px-2 md:px-8 gap-8 sticky top-0 z-40">
                                <a href="#Financial">
                                    <TabsTrigger value="Financial" className="inline-flex gap-1 group">
                                        <RiCoinsLine className="size-4 text-inherit" />
                                        Financial
                                    </TabsTrigger>
                                </a>
                                <a href="#Other">
                                    <TabsTrigger value="Other" className="inline-flex gap-2 group">
                                        <RiAB className="size-4 text-inherit" />
                                        Other
                                    </TabsTrigger>
                                </a>
                            </TabsList>
                            <div className="mt-4 px-2 md:px-8 py-0 md:py-4">
                                <TabsContent value="Financial">
                                    <TabsReviewCenterContent placeholder="No financial documents to review at the moment" />
                                </TabsContent>
                                <TabsContent value="Other">
                                    <TabsReviewOtherContent />
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