'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/tremorComponents/Button';
import { createEmployee } from '@/actions/employeeActions';
import { useFormState } from 'react-dom';
import { Branch, Employee, } from '@/types';
import { EmailInput, TextInput } from '@/ui/dashboard/components/InputComponents';
import { FetchSalariesReturnType } from '@/lib/dbdirect';
import { useToast } from "@/customHooks/useToast"
import { Toaster } from "@/ui/dashboard/components/Toaster"
import CustomSelect from '@/ui/dashboard/components/CustomSelect';


export default function AddEmployeeForm({ Branches, Salaries, Users }: {
    Branches: Branch[], Salaries: FetchSalariesReturnType[], Users: {
        _id: string
        username: string
        role: string
    }[]
}) {
    const { toast } = useToast()

    const passID = localStorage.getItem('passID') || ''
    const createEmployeeWithpassId = createEmployee.bind(null, passID)

    const initialState = { message: '', errors: {} }
    const [state, dispatch] = useFormState(createEmployeeWithpassId, initialState);

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        console.log({ state })

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
            if (formRef.current) {
                formRef.current.reset();
            }
        }

    }, [state])

    return (
        <form action={dispatch} ref={formRef} >
            <Toaster />
            <div className="rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 md:p-6">
                <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center mb-4">
                    <div className='flex-1 w-full'>
                        <TextInput {...{ placeholder: "First Name", name: "firstName", id: 'firstname', type: 'text' }} className='w-full' required />
                        <div id="FirstName-error" aria-live="polite" aria-atomic="true">
                            {(state?.errors && state.errors?.firstName) &&
                                state.errors.firstName.map((error: string, index: number) => (
                                    <p className="mt-2 text-sm text-red-500" key={index}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className='flex-1 w-full'>
                        <TextInput {...{ placeholder: "Last Name", name: "lastName", id: 'lastname' }} className='w-full' required />
                        <div id="LastName-error" aria-live="polite" aria-atomic="true">
                            {(state?.errors && state.errors?.lastName) &&
                                state.errors.lastName.map((error: string, index: number) => (
                                    <p className="mt-2 text-sm text-red-500" key={index}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <EmailInput {...{ placeholder: "Email", name: "email", id: 'email' }} required />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.email) &&
                            state.errors.email.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Branch", name: "branchID" }} >
                            <option value="" disabled>
                                Select a Branch
                            </option>
                            {Branches.map((branch, index) => (
                                <option key={index} value={branch._id} className='hover:bg-primary'>
                                    {branch.address}
                                </option>
                            ))}
                        </CustomSelect>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.branchID) &&
                            state.errors.branchID.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <CustomSelect {...{ id: "Salary", name: "salary" }} >
                            <option value="" disabled>
                                Select Salary
                            </option>
                            {Salaries.map((salary, index) => (
                                <option key={index} value={salary._id}>
                                    {salary.grade + ' - ' + salary.amount}
                                </option>
                            ))}
                        </CustomSelect>
                    </div>
                    <div id="Client-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.salary) &&
                            state.errors.salary.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <CustomSelect {...{ id: "reports_to", name: "reportsTo" }}>
                        <option value="" disabled>
                            Reports To
                        </option>
                        {Users.map(({ _id, username, role }, index) => (
                            <option
                                key={index}
                                value={_id}
                                className='hover:bg-primary'
                            >
                                {username + ' - ' + role}
                            </option>
                        ))}
                    </CustomSelect>
                    <div id="reports_to-error" aria-live="polite" aria-atomic="true">
                        {(state?.errors && state.errors?.reportsTo) &&
                            state.errors.reportsTo.map((error: string, index: number) => (
                                <p className="mt-2 text-sm text-red-500" key={index}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit" {...{ className: 'rounded-full hover:bg-primary hover:text-white px-8 py-4', variant: 'secondary' }}>Add Employee</Button>
            </div>
        </form>
    );
}
