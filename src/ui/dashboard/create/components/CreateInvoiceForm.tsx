'use client';

import { Button } from '@/tremorComponents/Button';
import { createInvoice } from '@/actions/invoiceActions';
import { useFormState } from 'react-dom';
import { Client } from '@/types';
import { useEffect, useRef } from 'react';
import { useToast } from '@/customHooks/useToast';
import { Toaster } from '@/ui/dashboard/components/Toaster';
import CustomSelect from '@/ui/dashboard/components/CustomSelect';

export default function CreateInvoiceForm({ Clients }: { Clients: Client[] }) {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createInvoice, initialState);
    const { toast } = useToast()

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state?.message && state.success) {
            toast({
                title: "Success",
                description: state.message,
                variant: "success",
                duration: 10000,
            })
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    }, [state])

    return (
        <form action={dispatch} ref={formRef} >
            <Toaster />
            <div className="rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Client", name: "customerId" }}>
                            <option value="" disabled>
                                Select a Client
                            </option>
                            {Clients.map((Client) => (
                                <option key={Client._id} value={Client._id}>
                                    {Client.name}
                                </option>
                            ))}
                        </CustomSelect>
                        {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.customerId &&
                            state.errors.customerId.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter MWK amount"
                                className="peer block w-full rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 pl-12 p-4 text-sm outline-2 placeholder:text-gray-500 focus:ring-primary dark:focus:ring-primary "
                                aria-describedby="amount-error"
                            />
                            <div className="pointer-events-none absolute left-3 top-1/2 h-fit w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 flex gap-1 items-center">
                                <div>MK</div>
                                <div>|</div>
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
                </div>

                {/* Invoice Status */}
                <fieldset>
                    {/* <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend> */}
                    <div className="rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="w-6 h-6 accent-primary border-0 focus:ring-2 focus:ring-transparent"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-950 border border-gray-500/30 text-gray-900 dark:text-gray-300"
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
                                    className="w-6 h-6 accent-primary border-0 focus:ring-2 focus:ring-transparent"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400"
                                >
                                    Paid
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.status &&
                            state.errors.status.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit" {...{ className: 'rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white px-8 py-4', variant: 'secondary' }}>Create Invoice</Button>
            </div>
        </form>
    );
}