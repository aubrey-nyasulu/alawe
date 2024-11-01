'use client';

import { useEffect, useRef } from 'react';

import { Button } from '../../../../tremorComponents/Button';
import { createSupplier } from '@/actions/supplierActions';
import { useFormState } from 'react-dom';
import { TextInput } from '../../components/InputComponents';
import { useToast } from "@/customHooks/useToast"
import { Toaster } from "@/ui/dashboard/components/Toaster"


export default function AddSupplierForm() {
    const { toast } = useToast()

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createSupplier, initialState);

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state?.message && state.success) {
            toast({
                title: "Success",
                description: state.message,
                variant: "success",
                duration: 10000,
            })
            if (formRef.current) {
                formRef.current.reset();
            }
        }

    }, [state])

    return (
        <form action={dispatch} ref={formRef} >
            <Toaster />
            <div className="rounded-md bg-gray-50 border border-[#e0e0e0] p-4 md:p-6 space-y-4">
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Name", name: "name", id: 'name', type: 'text' }} />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.name) &&
                            state.errors.name.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Contact", name: "contact", id: 'contact' }} />
                    <div id="contact-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.contact) &&
                            state.errors.contact.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className='flex-1'>
                    <TextInput {...{ placeholder: "Supplier Adrress", name: "address", id: 'address' }} />
                    <div id="address-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.address) &&
                            state.errors.address.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit" {...{ className: 'rounded-full hover:bg-primary hover:text-white', variant: 'secondary' }}>Add Supplier</Button>
            </div>
        </form>
    );
}
