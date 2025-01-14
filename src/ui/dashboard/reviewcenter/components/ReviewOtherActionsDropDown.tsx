"use client"

import { ReactNode, useContext } from "react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/tremorComponents/DropdownMenu"
import { Elipsis } from "@/assets/SVGComponents"
import { cx } from "@/lib/utils"
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuIconWrapper,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/tremorComponents/DropdownMenu"
import { approveEmployee } from "@/actions/approveactions"
import { RiCheckLine, RiMoreLine } from "@remixicon/react";
import { PageStateContext } from "@/context/PageStateProvider"
import { useToast } from "@/customHooks/useToast"
import { revalidatePath } from "next/cache"
import { useSession } from "next-auth/react"
import { User } from "@/types"

export default function ReviewOtherActionsDropDown({ targetId }: { targetId: string }) {
    const { updatePageStateState } = useContext(PageStateContext)

    const { data: session } = useSession()
    const user = session?.user as User

    const { toast } = useToast()

    const passID = localStorage.getItem('passID') || ''

    const handleApprove = async () => {
        try {
            console.log('approving')
            const res = await approveEmployee(user._id, targetId, passID)

            console.log({ res })

            toast({
                title: res === 'Employee approved' ? 'success' : 'Failed',
                description: res,
                variant: res === 'Employee approved' ? 'success' : 'error',
                duration: 10000,
            })
            if (updatePageStateState) {
                console.log('in update page post review other')
                await updatePageStateState()
            }

            revalidatePath('/dashboard/reviewcenter')
            revalidatePath('/dashboard/notifications')
        } catch (error) {
            console.log('failed to approve')
        }
    }

    return (
        <div className={cx("w-fit flex items-center justify-start")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    < button className="cursor-pointer" >
                        <RiMoreLine className="rotate-90 text-gray-900 dark:text-gray-50" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <button
                            className="w-full"
                            onClick={handleApprove}
                        >
                            <DropdownMenuItem className="w-full flex items-center gap-x-1 justify-between text-green-500" >
                                Approve
                                <DropdownMenuIconWrapper>
                                    <RiCheckLine className="size-4 text-inherit text-green-500" />
                                </DropdownMenuIconWrapper>
                            </DropdownMenuItem>
                        </button>
                        <button className="w-full">
                            <DropdownMenuItem className="w-full flex items-center gap-x-1 justify-between text-red-500" >
                                Decline
                                <DropdownMenuIconWrapper>
                                    {/* <Ri className="size-4 text-inherit" /> */}
                                </DropdownMenuIconWrapper>
                            </DropdownMenuItem>
                        </button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}