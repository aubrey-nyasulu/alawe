'use client';

import { Button } from '@/tremorComponents/Button';
import { createPurchaseTransaction } from '@/actions/purchaseTransactionActions';
import { useFormState } from 'react-dom';
import { Item, Supplier } from '@/types';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/customHooks/useToast';
import CustomSelect from '@/ui/dashboard/components/CustomSelect';
import { RiAddLine } from '@remixicon/react';
import { months, years } from '@/lib/utils';

export default function CreatePurchaseTransaction({ Suppliers, items }: { Suppliers: Supplier[], items: Item[] }) {
    const passID = localStorage.getItem('passID') || ''
    const createPurchaseTransactionWithPassID = createPurchaseTransaction.bind(null, passID)

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createPurchaseTransactionWithPassID, initialState);

    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement | null>(null);

    // State for managing purchased items
    const [purchasedItems, setPurchasedItems] = useState([{ quantity: '', unit_price: '', item_id: '' }])

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
                title: 'Success',
                description: state.message,
                variant: 'success',
                duration: 10000,
            })
        }
        console.log({ items })

        if (formRef.current) {
            formRef.current.reset();
        }
    }, [state])

    // Handle adding a new purchased item field
    const handleAddItem = () => {
        setPurchasedItems([...purchasedItems, { quantity: '', unit_price: '', item_id: '' }]);
    };

    // Handle input changes in purchased items
    const handleItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        console.log({ name, value })
        const updatedItems = purchasedItems.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        console.log({ updatedItems })

        setPurchasedItems(updatedItems);
    };

    const handleSubmit = (formData: FormData) => {
        formData.append('purchasedItems', JSON.stringify(purchasedItems))

        console.log('purchasedItems ====>', { purchasedItems: formData.get('purchasedItems') })

        dispatch(formData)
        setPurchasedItems([{ quantity: '', unit_price: '', item_id: '' }])
    }

    return (
        <form action={handleSubmit} ref={formRef}>
            <div className="rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 md:p-6">
                <div className="mb-4">
                    <CustomSelect id="supplier" name="supplierId">
                        <option value="" disabled>
                            Select a Supplier
                        </option>
                        {
                            Suppliers.map(supplier => (
                                <option
                                    key={supplier._id}
                                    value={supplier._id}
                                >
                                    {supplier.name}
                                </option>
                            ))}
                    </CustomSelect>
                    {state.errors?.supplier_id && (
                        <p className="mt-2 text-sm text-red-500">{state.errors.supplier_id.join(', ')}</p>
                    )}
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <div className="relative">
                        <input
                            id="purchaseTotal"
                            name="purchaseTotal"
                            type="number"
                            step="0.01"
                            placeholder="Enter MWK amount"
                            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 pl-12 p-4 text-sm outline-2 placeholder:text-gray-500 focus:ring-primary dark:focus:ring-primary "
                            aria-describedby="purchaseTotal-error"
                        />
                        <div className="pointer-events-none absolute left-3 top-1/2 h-fit w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 flex gap-1 items-center">
                            <div>MK</div>
                            <div>|</div>
                        </div>
                    </div>
                    {state.errors?.purchase_total && (
                        <p className="mt-2 text-sm text-red-500">{state.errors.purchase_total.join(', ')}</p>
                    )}
                </div>

                <div className="block w-full mt-2">
                    <CustomSelect
                        id="itemId"
                        name="month"
                    >
                        <option value="" disabled>
                            Select a Month
                        </option>
                        {
                            months.map(month => (
                                <option
                                    key={month}
                                    value={month}

                                >
                                    {month}
                                </option>
                            ))}
                    </CustomSelect>
                </div>
                {state.errors?.purchased_items && (
                    <p className="mt-2 text-sm text-red-500">
                        {
                            state.errors.purchased_items.find(error => error.includes('Please select a month.'))
                        }
                    </p>
                )}
                <div className="block w-full mt-2">
                    <CustomSelect
                        id="itemId"
                        name="year"
                    >
                        <option value="" disabled>
                            Select a Year
                        </option>
                        {
                            years.map(year => (
                                <option
                                    key={year}
                                    value={year}

                                >
                                    {year}
                                </option>
                            ))}
                    </CustomSelect>
                </div>
                {state.errors?.purchased_items && (
                    <p className="mt-2 text-sm text-red-500">
                        {
                            state.errors.purchased_items.find(error => error.includes('Please select a year.'))
                        }
                    </p>
                )}

                {/* Dynamically Generated Purchased Items */}
                <div className='mt-4'>
                    {purchasedItems.map((item, index) => (
                        <div
                            key={index}
                            className="mb-4 border border-gray-300 dark:border-gray-800 p-4 rounded-md">
                            <h4 className="font-medium">Purchased Item {index + 1}</h4>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={e => handleItemChange(index, e)}
                                className="peer block w-full rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 pl-12 p-4 text-sm outline-2 placeholder:text-gray-500 focus:ring-primary dark:focus:ring-primary mt-2 "
                            />
                            {state.errors?.purchased_items && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        state.errors.purchased_items.find(error => error.includes('quantity can never be less than 1'))
                                    }
                                </p>
                            )}
                            <input
                                type="number"
                                name="unit_price"
                                placeholder="Unit Price"
                                value={item.unit_price}
                                onChange={e => handleItemChange(index, e)}
                                className="peer block w-full rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 pl-12 p-4 text-sm outline-2 placeholder:text-gray-500 focus:ring-primary dark:focus:ring-primary mt-2 "
                            />
                            {state.errors?.purchased_items && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        state.errors.purchased_items.find(error => error.includes('unit price can never be less than 1'))
                                    }
                                </p>
                            )}

                            <div className="block w-full mt-2">
                                <CustomSelect
                                    id="itemId"
                                    name="item_id"
                                    OnChange={(e: any) => handleItemChange(index, e)}
                                >
                                    <option value="" disabled>
                                        Select a Item
                                    </option>
                                    {
                                        items.map(item => (
                                            <option
                                                key={item._id}
                                                value={item._id}

                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </CustomSelect>
                            </div>
                            {state.errors?.purchased_items && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        state.errors.purchased_items.find(error => error.includes('Please select an item.'))
                                    }
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    variant='secondary'
                    onClick={handleAddItem}
                >
                    <RiAddLine />
                    Add More Items
                </Button>

                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">Create Purchase Transaction</Button>
                </div>
            </div>
        </form>
    );
}









// 'use client';

// import { Button } from '@/tremorComponents/Button';
// import { createInvoice } from '@/actions/invoiceActions';
// import { useFormState } from 'react-dom';
// import { Client, Supplier } from '@/types';
// import { useEffect, useRef } from 'react';
// import { useToast } from '@/customHooks/useToast';
// import { Toaster } from '@/ui/dashboard/components/Toaster';
// import CustomSelect from '@/ui/dashboard/components/CustomSelect';

// export default function CreatePurchaseTransaction({ Suppliers }: { Suppliers: Supplier[] }) {
//     const initialState = { message: '', errors: {} };
//     const [state, dispatch] = useFormState(createInvoice, initialState);
//     const { toast } = useToast()

//     const formRef = useRef<HTMLFormElement | null>(null);

//     useEffect(() => {
//         if (state?.message && state.success) {
//             toast({
//                 title: "Success",
//                 description: state.message,
//                 variant: "success",
//                 duration: 10000,
//             })
//         }

//         if (formRef.current) {
//             formRef.current.reset();
//         }
//     }, [state])

//     return (
//         <form action={dispatch} ref={formRef} >
//             {/* <Toaster /> */}
//             <div className="rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 md:p-6">
//                 <div className="mb-4">
//                     <div className="relative">
//                         <CustomSelect {...{ id: "Client", name: "customerId" }}>
//                             <option value="" disabled>
//                                 Select a Client
//                             </option>
//                             {Suppliers.map((Supplier) => (
//                                 <option key={Supplier._id} value={Supplier._id}>
//                                     {Supplier.firstname}
//                                     {' '}
//                                     {Supplier.lastname}
//                                 </option>
//                             ))}
//                         </CustomSelect>
//                         {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
//                     </div>
//                     <div id="Client-error" aria-live="polite" aria-atomic="true">
//                         {state.errors?.customerId &&
//                             state.errors.customerId.map((error: string) => (
//                                 <p className="mt-2 text-sm text-red-500" key={error}>
//                                     {error}
//                                 </p>
//                             ))}
//                     </div>
//                 </div>

//                 {/* Invoice Amount */}
//                 <div className="mb-4">
//                     <div className="relative mt-2 rounded-md">
//                         <div className="relative">
//                             <input
//                                 id="amount"
//                                 name="amount"
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="Enter MWK amount"
//                                 className="peer block w-full rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 pl-12 p-4 text-sm outline-2 placeholder:text-gray-500 focus:ring-primary dark:focus:ring-primary "
//                                 aria-describedby="amount-error"
//                             />
//                             <div className="pointer-events-none absolute left-3 top-1/2 h-fit w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 flex gap-1 items-center">
//                                 <div>MK</div>
//                                 <div>|</div>
//                             </div>
//                         </div>
//                         <div id="amount-error" aria-live="polite" aria-atomic="true">
//                             {state.errors?.amount &&
//                                 state.errors.amount.map((error: string) => (
//                                     <p className="mt-2 text-sm text-red-500" key={error}>
//                                         {error}
//                                     </p>
//                                 ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Invoice Status */}
//                 <fieldset>
//                     {/* <legend className="mb-2 block text-sm font-medium">
//                         Set the invoice status
//                     </legend> */}
//                     <div className="rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 px-[14px] py-3">
//                         <div className="flex gap-4">
//                             <div className="flex items-center">
//                                 <input
//                                     id="pending"
//                                     name="status"
//                                     type="radio"
//                                     value="pending"
//                                     className="w-6 h-6 accent-primary border-0 focus:ring-2 focus:ring-transparent"
//                                     aria-describedby="status-error"
//                                 />
//                                 <label
//                                     htmlFor="pending"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-950 border border-gray-500/30 text-gray-900 dark:text-gray-300"
//                                 >
//                                     Pending
//                                 </label>
//                             </div>
//                             <div className="flex items-center">
//                                 <input
//                                     id="paid"
//                                     name="status"
//                                     type="radio"
//                                     value="paid"
//                                     className="w-6 h-6 accent-primary border-0 focus:ring-2 focus:ring-transparent"
//                                 />
//                                 <label
//                                     htmlFor="paid"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400"
//                                 >
//                                     Paid
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                     <div id="Client-error" aria-live="polite" aria-atomic="true">
//                         {state.errors?.status &&
//                             state.errors.status.map((error: string) => (
//                                 <p className="mt-2 text-sm text-red-500" key={error}>
//                                     {error}
//                                 </p>
//                             ))}
//                     </div>
//                 </fieldset>
//             </div>
//             <div className="mt-6 flex justify-end gap-4">
//                 <Button type="submit" {...{ className: 'rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white', variant: 'secondary' }}>Create Invoice</Button>
//             </div>
//         </form>
//     );
// }
