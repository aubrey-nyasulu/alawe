"use client"

import { Dispatch, SetStateAction, useContext, useRef } from "react"

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

import { useToast } from "@/customHooks/useToast"
import { CartIcon } from "@/assets/SVGComponents"
import CartContext from "@/context/CartStateProvider"
import CardSelect from "./CardSelect"

export function CartDrawer({ showModel, setShowModel }: { showModel: boolean, setShowModel: Dispatch<SetStateAction<boolean>> }) {
    const { Dispatch, cart, totalItems, totalPrice } = useContext(CartContext)

    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formaData: FormData) => {
        toast({
            title: "Success",
            description: 'Purchase a success. Your delivery is on its way',
            variant: "success",
            duration: 10000,
        })

        Dispatch({ type: 'RESET' })

        if (formRef.current) formRef.current.reset()
        setShowModel(false)
    }

    return (
        <>
            <div className="flex justify-center z-[99999]">
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
                                <div className="w-fit flex gap-2 items-center">
                                    <CartIcon />
                                    Cart
                                </div>
                            </DrawerTitle>

                            <DrawerDescription className="mt-1 text-sm hidden">
                                Drawer description
                            </DrawerDescription>
                        </DrawerHeader>

                        <form action={handleSubmit} className="h-full  flex flex-col justify-between" ref={formRef}>
                            <DrawerBody className="py-0">
                                <div className="w-full h-full flex gap-4 flex-col justify-between">
                                    <div className="w-full mt-4 space-y-2">
                                        {
                                            cart.map(item => {
                                                const data = item?.quantity < 19
                                                    ? Array.from({ length: 20 }, (_, i) => (i).toString())
                                                    : Array.from(
                                                        { length: 20 },
                                                        (_, i) => {
                                                            const val = (i + Math.floor(item.quantity / 2)) + 1

                                                            return (val).toString()
                                                        }
                                                    )

                                                return (
                                                    item.quantity > 0 &&
                                                    <div
                                                        key={item.name}
                                                        className="p-2 w-full flex items-center justify-between gap-8  bg-stone-100 rounded-md"
                                                    >
                                                        <p>{item.name}</p>

                                                        <p> MK{item.price} </p>

                                                        <div className='w-fit'>
                                                            <CardSelect {...{
                                                                data,
                                                                value: item?.quantity?.toString() || '0',
                                                                OnValueChange: (newValue) => {
                                                                    Dispatch(
                                                                        {
                                                                            type: 'ADD',
                                                                            payload: {
                                                                                quantity: Number(newValue) - item.quantity,
                                                                                name: item.name, price: item.price
                                                                            }
                                                                        })
                                                                }
                                                            }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="w-full flex gap-4 items-center justify-between ">
                                        <div className="w-fit flex gap-2 items-center">
                                            <p>Total Items:</p>
                                            <p>{totalItems}</p>
                                        </div>

                                        <div className="w-fit flex gap-2 items-center">
                                            <p>Total Price:</p>
                                            <p>MK{totalPrice}.00</p>
                                        </div>
                                    </div>
                                </div>
                            </DrawerBody>

                            <DrawerFooter className="mt-6 gap-2 flex-col-reverse">
                                <DrawerClose asChild>
                                    <Button
                                        className="mt-2 w-full sm:mt-0 sm:w-fit px-8 py-4 rounded-full"
                                        variant="secondary"
                                    >
                                        cancel
                                    </Button>
                                </DrawerClose>

                                <Button className="w-full sm:w-fit px-8 py-4 rounded-full" >
                                    Purchase
                                </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}