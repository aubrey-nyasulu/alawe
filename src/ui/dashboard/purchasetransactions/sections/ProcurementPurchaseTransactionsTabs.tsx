'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { InvoiceIcon } from "@/assets/SVGComponents"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Branch, Client, Employee, Item, Supplier } from "@/types"
import { FetchSalariesReturnType } from "@/lib/dbdirect"
import { RiAddBoxLine } from "@remixicon/react"
import TabsCreatePurchaseTransactionContent from "../components/TabsCreatePurchaseTransactionContent"
import { RiReceiptLine } from "@remixicon/react"


export default function ProcurementPurchaseTransactionsTabs({
    Suppliers,
    children,
    items
}: {
    Suppliers: Supplier[],
    items: Item[],
    children: ReactNode,
}) {
    const [currentsection, setCurrentSection] = useState('purchaseTransactions')

    useEffect(() => {

        setCurrentSection('purchaseTransactions')

        if (typeof window !== 'undefined') {
            if (window.location.hash === '#purchaseTransactions') {
                setCurrentSection('purchaseTransactions')
            }
            if (window.location.hash === '#createPurchaseTransaction') {

                setCurrentSection('createPurchaseTransaction')
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
                                <a href="#purchaseTransactions">
                                    <TabsTrigger value="purchaseTransactions" className="inline-flex gap-1 group">
                                        <RiReceiptLine className="size-4" />
                                        Purchase Transactions
                                    </TabsTrigger>
                                </a>
                                <TabsTrigger value="createPurchaseTransaction" className="inline-flex gap-1 group">
                                    <RiAddBoxLine className="size-5 text-inherit" />
                                    <a href="#createPurchaseTransaction">
                                        Record Purchase Transaction
                                    </a>
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-0 px-2 md:px-8 py-4">
                                <TabsContent value="purchaseTransactions">
                                    {children}
                                </TabsContent>
                                <TabsContent value="createPurchaseTransaction">
                                    <TabsCreatePurchaseTransactionContent {...{ Suppliers, items }} />
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