"use client"

import React, { useContext, useEffect, useState } from "react"
import Link from 'next/link';
import { Button } from '@/tremorComponents/Button';
import { updateInvoice } from '@/actions/invoiceActions';
import { useFormState } from 'react-dom';
import { Invoice } from '@/types';

import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/tremorComponents/Drawer"
import { PageStateContext } from "@/context/PageStateProvider"
import { useToast } from "@/customHooks/useToast";

type StateType = [boolean, () => void, () => void, () => void] & {
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export function EditInvoiceDrawer() {
    const [invoice, setInvoice] = useState<Invoice | null>(null)
    const { editInvoiceModalShow, setEditInvoiceModalShow } = useContext(PageStateContext)
    const { toast } = useToast()

    const passID = (() => window ? localStorage.getItem('passID') || '' : "")()

    const updateInvoiceWithId = updateInvoice.bind(null, editInvoiceModalShow.id, passID);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);

    useEffect(() => {
        console.log('fetching invoice...')
        if (editInvoiceModalShow.id) {
            fetch(`/api/invoices/${editInvoiceModalShow.id}`, { cache: "no-cache" })
                .then(res => res.json())
                .then(invoice => {
                    if (invoice?._id) {
                        console.log('updating invoice', { invoice })
                        setInvoice(invoice)
                    }
                })
                .catch(err => {
                    console.log('failed to fetch single invoice via api', { err })
                })
        }
    }, [editInvoiceModalShow.id])

    useEffect(() => {
        if (!state?.success && state.message) {
            toast({
                title: "Failed",
                description: state.message,
                variant: "error",
                duration: 10000,
            })

            return
        }

        if (state?.message && state.success) {
            toast({
                title: "Success",
                description: state.message,
                variant: "success",
                duration: 10000,
            })
            setEditInvoiceModalShow({ open: false, id: '' })
        }

    }, [state])

    return (
        <>
            <div className="flex justify-center">
                <Drawer
                    open={editInvoiceModalShow.open}
                    onOpenChange={(modalOpened) => {
                        if (!modalOpened) {
                            setInvoice(null)
                            setEditInvoiceModalShow(prevState => (
                                {
                                    ...prevState,
                                    open: false
                                }
                            ))
                        }
                    }}
                >
                    <DrawerContent
                        aria-describedby={"edit invoice"}
                        className="sm:max-w-lg h-full"
                    >
                        <DrawerHeader>
                            <DrawerTitle>Update Invoice</DrawerTitle>
                        </DrawerHeader>
                        {
                            invoice?._id
                                ? (
                                    <form action={dispatch} className="h-full">
                                        <DrawerBody className="h-[80%]">
                                            <div className="pt-10">
                                                <div className="mb-4">
                                                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                                        Choose an amount
                                                    </label>
                                                    <div className="relative mt-2 rounded-md">
                                                        <div className="relative">
                                                            <input
                                                                id="amount"
                                                                name="amount"
                                                                type="number"
                                                                step="0.01"
                                                                defaultValue={invoice?.amount}
                                                                placeholder="Enter USD amount"
                                                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                                aria-describedby='amount'
                                                            />
                                                            <div className="pointer-events-none absolute left-3 top-1/2 h-fit w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">MK</div>
                                                        </div>
                                                    </div>
                                                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                                                        {state.errors?.amount &&
                                                            state.errors.amount.map((error: string) => (
                                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                                    {error}
                                                                </p>
                                                            ))}
                                                    </div>
                                                </div>

                                                {/* Invoice Status */}
                                                <fieldset>
                                                    <legend className="mb-2 block text-sm font-medium">
                                                        Set the invoice status
                                                    </legend>
                                                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                                        <div className="flex gap-4">
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="pending"
                                                                    name="status"
                                                                    type="radio"
                                                                    value="pending"
                                                                    defaultChecked={invoice.status === 'pending'}
                                                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                                                />
                                                                <label
                                                                    htmlFor="pending"
                                                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                                                >
                                                                    Pending
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="paid"
                                                                    name="status"
                                                                    type="radio"
                                                                    value="paid"
                                                                    defaultChecked={invoice.status === 'paid'}
                                                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                                                />
                                                                <label
                                                                    htmlFor="paid"
                                                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                                                >
                                                                    Paid
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <div id="status-error" aria-live="polite" aria-atomic="true">
                                                    {state.errors?.status &&
                                                        state.errors.status.map((error: string) => (
                                                            <p className="mt-2 text-sm text-red-500" key={error}>
                                                                {error}
                                                            </p>
                                                        ))}
                                                </div>
                                            </div>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            <div className=" flex justify-end gap-4">
                                                <Button
                                                    className=""
                                                    onClick={() => {
                                                        setInvoice(null)
                                                        setEditInvoiceModalShow(prevState => (
                                                            {
                                                                ...prevState,
                                                                open: false
                                                            }
                                                        ))
                                                    }}
                                                    variant="secondary"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" {...{ className: 'rounded-full' }}>Edit Invoice</Button>
                                            </div>
                                        </DrawerFooter>
                                    </form>
                                )
                                : <DrawerBody>
                                    <p>Loading...</p>
                                </DrawerBody>
                        }

                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}