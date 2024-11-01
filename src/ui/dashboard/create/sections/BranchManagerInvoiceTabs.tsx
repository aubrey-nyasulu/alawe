'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { InvoiceIcon } from "@/assets/SVGComponents"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TabsCreateInvoiceContent from "../components/TabsCreateInvoiceContent"
import { Branch, Client, Employee } from "@/types"
import { FetchSalariesReturnType } from "@/lib/dbdirect"
import { RiAddBoxLine } from "@remixicon/react"



export default function BranchManagerInvoiceTabs({
    Clients,
    Branches,
    Salaries,
    Employees,
    children
}: {
    Clients: Client[],
    Branches: Branch[],
    Salaries: FetchSalariesReturnType[],
    Employees: Employee[],
    children: ReactNode,
}) {
    const [currentsection, setCurrentSection] = useState('')

    useEffect(() => {

        setCurrentSection('invoices')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#invoices') {
                setCurrentSection('invoices')
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
                            <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm pt-[52px] px-8 gap-8 sticky top-0 z-40">
                                <TabsTrigger value="invoices" className="inline-flex gap-1 group">
                                    <a href="#createInvoice" className="hidden group-data-[state=active]:block overflow-hidden">
                                        <InvoiceIcon {...{ color: '#fa4040' }} />
                                    </a>
                                    <a href="#createInvoice" className="hidden group-data-[state=inactive]:block overflow-hidden">
                                        <InvoiceIcon {...{ color: '#606060' }} />
                                    </a>
                                    <a href="#invoices">
                                        Invoices
                                    </a>
                                </TabsTrigger>
                                <TabsTrigger value="createInvoice" className="inline-flex gap-1 group">
                                    <RiAddBoxLine className="size-5 text-inherit" />
                                    <a href="#createInvoice">
                                        Create Invoice
                                    </a>
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-0 px-8 py-4">
                                <TabsContent value="invoices">
                                    {children}
                                </TabsContent>
                                <TabsContent value="createInvoice">
                                    <TabsCreateInvoiceContent {...{ Clients }} />
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