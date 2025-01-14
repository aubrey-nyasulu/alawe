'use client'

import { uploadImage } from '@/actions/uploadActions';
import { useToast } from '@/customHooks/useToast';
import { fetchUsers } from '@/lib/data';
import { Button } from '@/tremorComponents/Button';
import { User } from '@/types';
import CustomSelect from '@/ui/dashboard/components/CustomSelect';
import { TextInput } from '@/ui/dashboard/components/InputComponents';
import { useSession } from 'next-auth/react';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

export default function FileUploadForm({ users }: { users: User[] }) {
    const { data: session } = useSession()
    const user = session?.user as User

    const { toast } = useToast()

    const passID = localStorage.getItem('passID') || ''

    const initialState = { message: '', errors: {} };
    const uploadImageWithpassID = uploadImage.bind(null, passID)
    const [state, dispatch] = useFormState(uploadImageWithpassID, initialState);

    const formRef = useRef<HTMLFormElement | null>(null);

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
            if (formRef.current) {
                formRef.current.reset();
            }
        }

        console.log('state message', state.message)

        if (!state.success && (state.message === 'you can not send to yourself')) {
            toast({
                title: "Failed",
                description: state.message,
                variant: "error",
                duration: 10000,
            })
            if (formRef.current) {
                formRef.current.reset();
            }
        }

    }, [state])

    const handleSubmit = (formData: FormData) => {
        formData.append('from', user._id)

        dispatch(formData)
    }

    return (
        <form action={handleSubmit} ref={formRef} >
            <div className="rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <div className="relative space-y-4">
                        <CustomSelect {...{ id: "to", name: "to", required: true }}>
                            <option value="" disabled>
                                Select a User
                            </option>
                            {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                        </CustomSelect>
                        <div className='flex-1'>
                            <TextInput {...{ name: "title", placeholder: 'title', id: 'title', required: true }} />
                            {/* <div id="LastName-error" aria-live="polite" aria-atomic="true">
                            {(state?.errors && state.errors?.lastName) &&
                                state.errors.lastName.map((error: string, index: number) => (
                                    <p className="mt-2 text-sm text-red-500" key={index}>
                                        {error}
                                    </p>
                                ))}
                        </div> */}
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            {/* <label htmlFor="image">Upload file</label> */}
                            <input
                                type="file"
                                accept=".pdf,.docx,.doc,.xlsx,.xls,.odt,.rtf,.wpd"
                                id="image"
                                name="image"
                                required
                                className='border border-gray-300 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 cursor-pointer p-2' />
                        </div>
                        <div className='w-full flex justify-end'>
                            <Button type='submit' >Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}