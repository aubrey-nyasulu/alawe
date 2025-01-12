"use client"

import './CheckBox.css'

import { Dispatch, SetStateAction, useContext, useRef, useState } from "react"

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
import StoreContext from '@/context/StoreStateProvider'

type StateType = [boolean, () => void, () => void, () => void] & {
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export function AutofillerDrawer({ showModel, setShowModel }: { showModel: boolean, setShowModel: Dispatch<SetStateAction<boolean>> }) {
    const { setAutoFillData } = useContext(StoreContext)

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formaData: FormData) => {
        setAutoFillData({
            email: formaData.get('tofill') as string || '',
            password: 'super password'
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
                        <DrawerHeader className="w-full">
                            <DrawerTitle className="w-full">
                                <p>This feature is for demonstration purposes</p>
                            </DrawerTitle>
                            {/* <DrawerDescription className="mt-1 text-sm"> */}
                            {/* </DrawerDescription> */}
                        </DrawerHeader>
                        <form action={handleSubmit} className="h-full  flex flex-col justify-between" ref={formRef}>
                            <DrawerBody className="py-0">
                                <div className="w-full h-full flex gap-4 flex-col py-8">
                                    <div className="w-full h-fit flex items-center justify-between bg-stone-100 rounded-md px-4">
                                        <label className="animated-checkbox_container">
                                            Login In as CEO

                                            <input type="radio" name='tofill' value='muhammed@gmail.com' />

                                            <Check />
                                        </label>
                                    </div>

                                    <div className="w-full h-fit flex items-center justify-between bg-stone-100 rounded-md px-4">
                                        <label className="animated-checkbox_container">
                                            Login In as Supply Chain Manager

                                            <input type="radio" name='tofill' value='maria@gmail.com' />

                                            <Check />
                                        </label>
                                    </div>

                                    <div className="w-full h-fit flex items-center justify-between bg-stone-100 rounded-md px-4">
                                        <label className="animated-checkbox_container">
                                            Login In as Procurement Manager

                                            <input type="radio" name='tofill' value='mayamiko@gmail.com' />

                                            <Check />
                                        </label>
                                    </div>

                                    <div className="w-full h-fit flex items-center justify-between bg-stone-100 rounded-md px-4">
                                        <label className="animated-checkbox_container">
                                            Login In as Branch Manager

                                            <input type="radio" name='tofill' value='ester@gmail.com' />

                                            <Check />
                                        </label>
                                    </div>

                                    <div className="w-full h-fit flex items-center justify-between bg-stone-100 rounded-md px-4">
                                        <label className="animated-checkbox_container">
                                            Login In as Admin

                                            <input type="radio" name='tofill' value='dave@gmail.com' />

                                            <Check />
                                        </label>
                                    </div>
                                </div>
                            </DrawerBody>
                            <DrawerFooter className="mt-6">
                                <DrawerClose asChild>
                                    <Button
                                        className="mt-2 w-full sm:mt-0 sm:w-fit px-8 py-4 rounded-full"
                                        variant="secondary"
                                    >
                                        cancel
                                    </Button>
                                </DrawerClose>
                                <Button className="w-full sm:w-fit px-8 py-4 rounded-full" onClick={() => null}>
                                    AutoFill
                                </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div >
        </>
    )
}

const Check = () => (
    <svg viewBox="0 0 64 64" height="1em" width="1em">
        <path
            d="M0 16v40a8 8 90 0 0 8 8h48a8 8 90 0 0 8-8V8a8 8 90 0 0-8-8H8a8 8 90 0 0-8 8v8l32 32 32-32V8a8 8 90 0 0-8-8H8a8 8 90 0 0-8 8v48a8 8 90 0 0 8 8h48a8 8 90 0 0 8-8V16"
            className="path"
            pathLength={575.054}
        />
    </svg>
)