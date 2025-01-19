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
import { deleteInvoice } from "@/actions/invoiceActions"
import { RiAlignVertically, RiDeleteBin2Line, RiEdit2Line, RiMoreLine } from "@remixicon/react";
import { Button } from "@/tremorComponents/Button"
import { PageStateContext } from "@/context/PageStateProvider"
import { useToast } from "@/customHooks/useToast"

export default function InvoiceTableActionsDropdown({ id }: { id: string }) {
  const { setEditInvoiceModalShow } = useContext(PageStateContext)

  const { theme } = useContext(PageStateContext)

  const passID = localStorage.getItem('passID') || ''

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
            {/* <Link
              href={`/dashboard/invoices/${id}/edit`}
              className="w-full"> */}
            <Button
              className="p-0 w-full"
              variant="custom"
              onClick={() => {
                console.log({ id })
                setEditInvoiceModalShow({ open: true, id })
              }
              }
            >
              <DropdownMenuItem className="w-full flex items-center gap-x-1 justify-between" >
                Update Invoice
                <DropdownMenuIconWrapper>
                  <RiEdit2Line className="size-4 text-inherit" />
                </DropdownMenuIconWrapper>
              </DropdownMenuItem>
            </Button>
            {/* </Link> */}
            <DropdownMenuItem onClick={e => e.stopPropagation()} >
              <span className="w-full  flex items-center gap-x-1 justify-between">
                <DeleteInvoice {...{ id, passID }} />
                <DropdownMenuIconWrapper>
                  <RiDeleteBin2Line className="size-4 text-inherit" />
                </DropdownMenuIconWrapper>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function DeleteInvoice({ id, passID }: { id: string, passID: string }) {
  const { toast } = useToast()

  const deleteInvoiceWithId = deleteInvoice.bind(null, id, passID);

  const handleDelete = async (formaData: FormData) => {
    const res = await deleteInvoiceWithId()

    if (!res?.success && res?.message) {
      toast({
        title: "Failed",
        description: res.message,
        variant: "error",
        duration: 10000,
      })

      return
    }

    if (res?.success && res?.message) {
      toast({
        title: "Successfull",
        description: res.message,
        variant: "success",
        duration: 10000,
      })

      return
    }
  }

  return (
    <form action={handleDelete} className="w-full">
      <button type="submit" className=" w-full text-start">Delete</button>
    </form>
  )
}