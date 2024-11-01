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

export default function InvoiceTableActionsDropdown({ id }: { id: string }) {
  const { setEditInvoiceModalShow } = useContext(PageStateContext)

  const { theme } = useContext(PageStateContext)

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
                <DeleteInvoice {...{ id }} />
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

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId} className="w-full">
      <button type="submit" className=" w-full text-start">Delete</button>
    </form>
  )
}