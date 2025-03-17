"use client"

import { useContext, useState } from "react"

import { Button } from "@/tremorComponents/Button"
import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/tremorComponents/Drawer"
import { PageStateContext } from "@/context/PageStateProvider"
import { useSession } from "next-auth/react"
import { User } from "@/types"
import { EmailInput, PasswordInput } from "../../components/InputComponents"
import { Label } from "@/tremorComponents/Label"
import { updateEmployee } from "@/actions/userActions"
import { useToast } from "@/customHooks/useToast"
import { getNotifications } from "@/actions/notificationsActions"

type StateType = [boolean, () => void, () => void, () => void] & {
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/tremorComponents/Dialog";
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { RiAuctionLine, RiInbox2Line, RiKey2Line, RiLandscapeLine, RiMailLine, } from '@remixicon/react';
import { CookieIcon } from '@/assets/SVGComponents';
import Link from 'next/link';
import PassIdModel from '@/db/models/PassIdModel';
import { verifyPassId } from '@/actions/authenticateActions';

export function EditProfileDrawer() {
    const { editProfileModalShow, setEditProfileModalShow, setNotifications } = useContext(PageStateContext)

    const [currentSection, setCurrentSection] = useState('actions')
    const [typedValue, setTypedValue] = useState('')

    const { data: session } = useSession()
    const user = session?.user as User

    const [email, setEmail] = useState<string | undefined>(user.email)
    const [oldPassword, setOldPassword] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>('')
    const { toast } = useToast()

    const handleSubmit = async (formaData: FormData) => {
        try {
            const passID = localStorage.getItem('passID') || ''

            console.log({ passID })

            const updateEmployeeWithId = updateEmployee.bind(null, user._id, passID)
            const res = await updateEmployeeWithId(formaData)

            if (res === "successfull") {
                toast({
                    title: "Success",
                    description: 'password changed successfully',
                    variant: "success",
                    duration: 10000,
                })
                const updatedNotifications = await getNotifications(user._id)
                setNotifications(updatedNotifications)

                setOldPassword('')
                setPassword('')
                setConfirmPassword('')

                setEditProfileModalShow(false)
            }
            else {
                toast({
                    title: "Failed",
                    description: res,
                    variant: "error",
                    duration: 10000,
                })
            }
        } catch (error) {

        }

    }

    return (
        <>
            <div className="hidden">
                <Dialog
                    open={editProfileModalShow}
                    onOpenChange={(modalOpened) => {
                        if (!modalOpened) {
                            setEditProfileModalShow(false)
                        }
                    }}
                >
                    <DialogContent className="sm:max-w-lg ">
                        <DialogHeader>
                            <DialogTitle>Account Settings</DialogTitle>
                            <div
                                aria-describedby="Description"
                                className="flex gap-4 items-center mt-4"
                            >
                                <div className='w-10 h-10 rounded-full bg-slate-200 grid place-content-center text-start text-black'>
                                    {user.username?.split(' ').map(name => name[0].toUpperCase()).join('')}
                                </div>

                                <div className="space-y-0">
                                    <p>{user.username}</p>
                                    <small className="text-gray-400">{user.role}</small>
                                </div>
                            </div>
                        </DialogHeader>

                        <DialogDescription className="mt-8 text-sm leading-6">
                            <Tabs value={currentSection}>
                                <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm  gap-8 sticky top-0 z-40">
                                    <TabsTrigger value="actions"
                                        className="inline-flex gap-1 group outline-none"
                                        onClick={() => {
                                            setCurrentSection('actions')
                                        }}
                                    >
                                        <RiAuctionLine className="size-5 text-inherit" />
                                        Actions
                                    </TabsTrigger>
                                </TabsList>

                                <div className="pt-4">
                                    <TabsContent value="actions">
                                        <div className="flex flex-col gap-4 pt-4">
                                            <Button
                                                variant="secondary"
                                                className="w-full py-4"
                                                onClick={() => {
                                                    setCurrentSection('password')
                                                }}
                                            >
                                                Change Password
                                            </Button>

                                            <Button
                                                variant="secondary"
                                                className="w-full py-4 px-8"
                                                onClick={() => {
                                                    setCurrentSection('email')
                                                }}
                                            >
                                                Change Email
                                            </Button>

                                            <Button
                                                className="w-full py-4 px-8 rounded-full bg-red-700/60"
                                                onClick={() => {
                                                    setCurrentSection('delete')
                                                }}
                                            >
                                                Leave Organization
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="password">
                                        <ChangePassword
                                            {...{
                                                email, confirmPassword, handleSubmit, oldPassword, password, setConfirmPassword, setOldPassword, setPassword, user
                                            }}
                                        />
                                    </TabsContent>

                                    <TabsContent value="email">
                                        <form action={handleSubmit} className="h-full flex flex-col justify-between">

                                            <div className="space-y-1 mt-4">
                                                <Label
                                                    className="pl-4 opacity-50"
                                                    htmlFor="email"
                                                >
                                                    This action is currently unavailable now
                                                </Label>
                                                <EmailInput
                                                    id="email"
                                                    name="email"
                                                    placeholder={email}
                                                    value={email}
                                                    onChange={(el) => {
                                                        setEmail(el.target.value)
                                                    }}
                                                    required={true}
                                                    //@ts-ignore
                                                    disabled={true}
                                                />
                                            </div>
                                        </form>
                                    </TabsContent>

                                    <TabsContent value="delete">
                                        <form action={handleSubmit} className="h-full flex flex-col justify-between">

                                            <div className="space-y-1 mt-4">
                                                <Label
                                                    className="pl-4 opacity-50"
                                                    htmlFor="email"
                                                >
                                                    type <b><i>{`"Delete My Account"`}</i></b> to confirm this action
                                                </Label>
                                                <input
                                                    type="text"
                                                    value={typedValue}
                                                    onChange={(e) => setTypedValue(e.target.value)}
                                                    required
                                                    className='px-6 h-[60px] border bg-gray-200 dark:bg-gray-900 border-[#e0e0e0] dark: dark:border-gray-800 w-full rounded-md'
                                                />
                                            </div>
                                        </form>

                                        <DialogFooter className="mt-6">
                                            <DialogClose asChild>
                                                <Button
                                                    className="mt-2 w-full sm:mt-0 sm:w-fit px-6 py-3 rounded-full"
                                                    variant="secondary"
                                                >
                                                    Discard
                                                </Button>
                                            </DialogClose>

                                            <Button
                                                className="w-full sm:w-fit px-6 py-3 rounded-full bg-primary"
                                                onClick={() => {
                                                    toast({
                                                        title: "UnAuthorized",
                                                        description: "Sorry, you don't have enough priviledges to perfom this action",
                                                        variant: "error",
                                                        duration: 10000,
                                                    })
                                                }}
                                                disabled={typedValue !== "Delete My Account"}
                                            >
                                                Delete
                                            </Button>
                                        </DialogFooter>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )

}

// export const PopUp = () => {
//     const [modelOpen, setModelOpen] = useState(true)
//     const [currentSection, setCurrentSection] = useState<'cookies' | 'passID'>('cookies')

//     useEffect(() => {
//         const acceptedCookies = localStorage.getItem('acceptedCookies')

//         if (acceptedCookies === 'yes') {
//             setModelOpen(false)
//         }
//     }, [])

//     return (
//         <>
//             <div className="hidden">
//                 <Dialog open={modelOpen}>
//                     <DialogContent className="sm:max-w-lg ">
//                         <Tabs defaultValue={''} value={currentSection}>
//                             <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm  gap-8 sticky top-0 z-40">
//                                 <TabsTrigger value="cookies"
//                                     className="inline-flex gap-1 group outline-none"
//                                 >
//                                     <CookieIcon />
//                                 </TabsTrigger>

//                                 <TabsTrigger value="passID" className="inline-flex gap-1 group outline-none">
//                                     <RiKey2Line className="size-5 text-inherit" />
//                                 </TabsTrigger>
//                             </TabsList>
//                             <div className="pt-4">
//                                 <TabsContent value="cookies">
//                                     cookie consent
//                                 </TabsContent>
//                                 <TabsContent value="passID">
//                                     <PassId setModelOpen={setModelOpen} />
//                                 </TabsContent>
//                             </div>
//                         </Tabs>

//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </>
//     )
// }

// function PassId({ setModelOpen }: { setModelOpen: Dispatch<SetStateAction<boolean>> }) {
//     const [value, setValue] = useState('')
//     const [error, setError] = useState('')
//     const [isSubmitting, setIsSubmitting] = useState(false)

//     const verifyPassID = async (e: any) => {
//         setIsSubmitting(true)
//         setError('')

//         try {

//             if (value.length === 0) {
//                 setError('No input was passed. Please Skip or enter a valid key in the input to continue')

//                 setIsSubmitting(false)

//                 return
//             }

//             const passIdExists = await verifyPassId(value)

//             if (passIdExists.isValid) {
//                 localStorage.setItem('passID', value)
//                 setModelOpen(false)
//                 setIsSubmitting(false)
//             } else {
//                 console.log({ passIdExists })

//                 setError(passIdExists.message)
//                 setIsSubmitting(false)
//             }
//         } catch (error: any) {
//             console.log(error?.message)

//             setError('Failed to finish verification stage. Please make sure you have an internet connection')

//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <>
//             <DialogHeader>
//                 <DialogTitle>Pass ID (optional)</DialogTitle>
//                 <DialogDescription className="mt-1 text-sm leading-6">
//                     To ensure data integrity, only users with a valid pass ID are authorized to perform CREATE, UPDATE, and DELETE actions. Users without a pass ID have read-only privileges. If you require a pass ID and wish to obtain one, please connect with me via <Link href="https://www.linkedin.com/in/aubrey-nyasulu/" className='text-[dodgerBlue]' target='_blank'>LinkedIn</Link> or my <Link href="https://aubreynyasulu.com/" className='text-[dodgerBlue]' target='_blank'>Personal Website</Link>.

//                     {
//                         error.length > 0 &&
//                         <p className='text-red-600 pt-2'>{error}</p>
//                     }

//                     <form action={verifyPassID} className='mt-4'>
//                         <input
//                             type='text'
//                             name='passid'
//                             placeholder='enter pass ID'
//                             value={value}
//                             onChange={e => setValue(e.target.value)}
//                             className='border py-3 px-4 rounded-md w-full'
//                         />
//                     </form>
//                 </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="mt-6">
//                 <DialogClose
//                     asChild
//                     onClick={() => setModelOpen(false)}
//                 >
//                     <Button
//                         className="mt-2 w-full sm:mt-0 sm:w-fit rounded-full px-6 py-3 hover:bg-primary hover:text-white outline-none"
//                         variant="secondary"
//                     >
//                         Skip
//                     </Button>
//                 </DialogClose>
//                 <DialogClose
//                     asChild
//                     onClick={verifyPassID}
//                 >
//                     <Button
//                         className="mt-2 w-full sm:mt-0 sm:w-fit rounded-full px-6 py-3 hover:bg-primary hover:text-white outline-none"
//                         aria-disabled={isSubmitting}
//                         disabled={isSubmitting}
//                         isLoading={isSubmitting}
//                         loadingText='Verifying...'
//                     >
//                         Continue
//                     </Button>
//                 </DialogClose>
//             </DialogFooter>
//         </>
//     )
// }


function ChangePassword({
    handleSubmit,
    oldPassword,
    password,
    email,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setOldPassword
}: {
    handleSubmit: (formaData: FormData) => Promise<void>
    oldPassword: string | undefined
    password: string | undefined
    email: string | undefined
    setPassword: Dispatch<SetStateAction<string | undefined>>
    confirmPassword: string | undefined
    setConfirmPassword: Dispatch<SetStateAction<string | undefined>>
    setOldPassword: Dispatch<SetStateAction<string | undefined>>
}) {
    return (
        <div className="flex gap-4 flex-col">

            <form action={handleSubmit} className="h-full flex flex-col justify-between">
                <input
                    type="email"
                    name="email"
                    value={email}
                    hidden
                />
                <div className="space-y-1 mt-4">
                    <Label
                        className="pl-4 opacity-50"
                        htmlFor="email"
                    >
                        Old Password
                    </Label>
                    <PasswordInput
                        id="oldpassword"
                        name="oldpassword"
                        value={oldPassword}
                        onChange={(el) => {
                            setOldPassword(el.target.value)
                        }}
                        required={true}
                    />
                </div>
                <div className="space-y-1 mt-4">
                    <Label
                        className="pl-4 opacity-50"
                        htmlFor="email"
                    >
                        New Password
                    </Label>
                    <PasswordInput
                        id="newpassword"
                        name="newpassword"
                        value={password}
                        onChange={(el) => {
                            setPassword(el.target.value)
                        }}
                        required={true}
                    />
                </div>
                <div className="space-y-1 mt-4">
                    <Label
                        className="pl-4 opacity-50"
                        htmlFor="email"
                    >
                        Confirm
                    </Label>
                    <PasswordInput
                        id="confirmpassword"
                        name="confirmpassword"
                        value={confirmPassword}
                        onChange={(el) => {
                            setConfirmPassword(el.target.value)
                        }}
                        required={true}
                    />
                </div>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button
                            className="mt-2 w-full sm:mt-0 sm:w-fit px-6 py-3 rounded-full"
                            variant="secondary"
                        >
                            Discard
                        </Button>
                    </DialogClose>

                    <Button className="w-full sm:w-fit px-6 py-3 rounded-full" onClick={() => null}>
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </div>
    )
}