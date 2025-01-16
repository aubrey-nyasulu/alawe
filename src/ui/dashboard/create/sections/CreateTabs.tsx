'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { CreatUserIcon, InvoiceIcon } from "@/assets/SVGComponents"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TabsCreateInvoiceContent from "../components/TabsCreateInvoiceContent"
import { Branch, Client, Employee } from "@/types"
import { FetchSalariesReturnType } from "@/lib/dbdirect"
import TabsCreateEmployeeContent from "../components/TabsCreateEmployeeContent"
import { RiUser3Line } from "@remixicon/react"



export default function CreateTabs({ Clients, Branches, Salaries, Employees }: { Clients: Client[], Branches: Branch[], Salaries: FetchSalariesReturnType[], Employees: Employee[] }) {
    const [currentsection, setCurrentSection] = useState('')

    useEffect(() => {

        setCurrentSection('createUser')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#createUser') {
                setCurrentSection('createUser')
            }
            if (window.location.hash === '#createInvoice') {

                setCurrentSection('createInvoice')
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
                            <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm pt-[52px] px-2 md:px-8 gap-8 sticky top-0 z-40">
                                <TabsTrigger value="createUser" className="inline-flex gap-1 group">
                                    <RiUser3Line className="size-5" />
                                    <a href="#createUser">
                                        User
                                    </a>
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-4 px-2 md:px-8 py-2 md:py-4">
                                <TabsContent value="createUser">
                                    <TabsCreateEmployeeContent {...{ Branches, Salaries, Employees }} />
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