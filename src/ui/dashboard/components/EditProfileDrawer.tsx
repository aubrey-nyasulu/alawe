"use client"

import React, { useContext, useState } from "react"

import { Button } from "@/tremorComponents/Button"
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
import { useSession } from "next-auth/react"
import { User } from "@/types"
import { EmailInput, PasswordInput } from "./InputComponents"
import { Label } from "@/tremorComponents/Label"
import { updateEmployee } from "@/actions/userActions"
import { Toaster } from "./Toaster"
import { useToast } from "@/customHooks/useToast"
import { getNotifications } from "@/actions/notificationsActions"

type StateType = [boolean, () => void, () => void, () => void] & {
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export function EditProfileDrawer() {
    const { editProfileModalShow, setEditProfileModalShow, setNotifications } = useContext(PageStateContext)

    const { data: session } = useSession()
    const user = session?.user as User

    const [email, setEmail] = useState<string | undefined>(user.email)
    const [oldPassword, setOldPassword] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>('')
    const { toast } = useToast()

    const handleSubmit = async (formaData: FormData) => {

        if (!formaData.get('password')) return alert('password is required')

        try {
            const passID = localStorage.getItem('passID') || ''

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
            <div className="flex justify-center">
                <Drawer
                    open={editProfileModalShow}
                    onOpenChange={(modalOpened) => {
                        if (!modalOpened) {
                            setEditProfileModalShow(false)
                        }
                    }}
                >
                    <DrawerContent className="sm:max-w-lg">
                        <DrawerHeader>
                            <DrawerTitle>Update User Information</DrawerTitle>
                            {/* <DrawerDescription className="mt-1 text-sm"> */}
                            <div
                                aria-describedby="Description"
                                className="flex gap-4 items-center mt-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-500"></div>
                                <div className="space-y-0">
                                    <p>{user.username}</p>
                                    <small className="text-gray-400">{user.role}</small>
                                </div>
                            </div>
                            {/* </DrawerDescription> */}
                        </DrawerHeader>
                        <form action={handleSubmit} className="h-full flex flex-col justify-between">
                            <DrawerBody>
                                <div className="space-y-1 mt-4">
                                    <Label
                                        htmlFor="email"
                                    >
                                        Email
                                    </Label>
                                    <EmailInput
                                        id="email"
                                        name="email"
                                        placeholder={email}
                                        value={email}
                                        onChange={(el) => {
                                            setEmail(el.target.value)
                                        }}
                                    />
                                </div>
                                <div className="space-y-1 mt-4">
                                    <Label
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
                                    />
                                </div>
                                <div className="space-y-1 mt-4">
                                    <Label
                                        htmlFor="email"
                                    >
                                        New Password
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(el) => {
                                            setPassword(el.target.value)
                                        }}
                                    />
                                </div>
                                <div className="space-y-1 mt-4">
                                    <Label
                                        htmlFor="email"
                                    >
                                        Confirm
                                    </Label>
                                    <PasswordInput
                                        id="confirm"
                                        name="confirm"
                                        value={confirmPassword}
                                        onChange={(el) => {
                                            setConfirmPassword(el.target.value)
                                        }}
                                    />
                                </div>
                            </DrawerBody>
                            <DrawerFooter className="mt-6">
                                <DrawerClose asChild>
                                    <Button
                                        className="mt-2 w-full sm:mt-0 sm:w-fit"
                                        variant="secondary"
                                    >
                                        Go back
                                    </Button>
                                </DrawerClose>
                                <Button className="w-full sm:w-fit" onClick={() => null}>
                                    Save
                                </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}