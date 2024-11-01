"use client"

import React, { Dispatch, SetStateAction, useContext, useRef, useState } from "react"

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
import { EmailInput, PasswordInput, TextInput } from "@/ui/dashboard/components/InputComponents"
import { Label } from "@/tremorComponents/Label"
import { useToast } from "@/customHooks/useToast"

type StateType = [boolean, () => void, () => void, () => void] & {
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export function ClientApplyDrawer({ showModel, setShowModel }: { showModel: boolean, setShowModel: Dispatch<SetStateAction<boolean>> }) {


    const [email, setEmail] = useState<string | undefined>('')
    const [oldPassword, setOldPassword] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>('')
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formaData: FormData) => {
        toast({
            title: "Success",
            description: 'Application sent. you will be notified via your email',
            variant: "success",
            duration: 10000,
        })

        if (formRef.current) formRef.current.reset()
        setShowModel(false)
    }

    return (
        <>
            <div className="flex justify-center">
                <Drawer
                    open={showModel}
                    onOpenChange={(modalOpened) => {
                        if (!modalOpened) {
                            setShowModel(false)
                        }
                    }}
                >
                    <DrawerContent className="sm:max-w-lg">
                        <DrawerHeader>
                            <DrawerTitle>Insert Information</DrawerTitle>
                            {/* <DrawerDescription className="mt-1 text-sm"> */}
                            {/* </DrawerDescription> */}
                        </DrawerHeader>
                        <form action={handleSubmit} className="h-fit min-h-[60vh] flex flex-col justify-between" ref={formRef}>
                            <DrawerBody>
                                <div className="space-y-1 mt-4">
                                    <TextInput {...{ placeholder: 'your name/company name', required: true }} />
                                </div>
                                <div className="space-y-1 mt-4">
                                    <EmailInput
                                        id="email"
                                        name="email"
                                        placeholder={'your email here'}
                                        onChange={(el: any) => {
                                            setEmail(el.target.value)
                                        }}
                                        required={true}
                                    />
                                </div>
                                <div className="w-full mt-4">
                                    <textarea
                                        name="textarea"
                                        id="texarea" cols={6}
                                        className="w-full border border-gray-300 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 cursor-pointer p-2"
                                        placeholder="your message"
                                        required
                                    ></textarea>
                                </div>
                            </DrawerBody>
                            <DrawerFooter className="mt-6">
                                <DrawerClose asChild>
                                    <Button
                                        className="mt-2 w-full sm:mt-0 sm:w-fit"
                                        variant="secondary"
                                    >
                                        cancel
                                    </Button>
                                </DrawerClose>
                                <Button className="w-full sm:w-fit" onClick={() => null}>
                                    send
                                </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}