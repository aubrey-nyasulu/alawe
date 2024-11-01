"use client"

import {
  DropdownMenu,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/tremorComponents/DropdownMenu"
import { cx } from "@/lib/utils"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/tremorComponents/DropdownMenu"
import { deleteInvoice } from "@/actions/invoiceActions"
import { RiMore2Line, RiLogoutBoxLine, RiColorFilterLine, RiSunLine, RiMoonLine, RiComputerLine, RiProfileLine, RiArrowUpSLine, RiArrowDownSLine } from "@remixicon/react";
import { useContext, useEffect, useState } from "react"
import { DoubleCaret } from "@/assets/SVGComponents"
import { signOut } from 'next-auth/react'
import { PageStateContext } from "@/context/PageStateProvider"
import { Button } from "@/tremorComponents/Button"

export default function SideNavProfileDropdown({ username, role }: { username?: string, role?: string }) {

  const { theme, handleThemeChange, setEditProfileModalShow, } = useContext(PageStateContext)

  return (
    <div className={cx("w-full h-fit items-center justify-start ")}>
      <DropdownMenu >
        <DropdownMenuTrigger className="px-0 w-full" asChild>
          <button className='w-full gap-4 flex items-center justify-between md:px-4 md:py-4  text-gray-900 dark:text-gray-50 md:hover:bg-gray-100 dark:md:hover:bg-gray-800'
          >
            <div className='w-10 h-10 rounded-full bg-slate-200 grid place-content-center text-start text-black'>UN</div>

            <div className="text-start hidden md:block flex-1">
              {
                username &&
                <p className='flex-1 text-left text-ellipsis whitespace-nowrap'>{username}</p>
              }
              {
                role &&
                <p className="text-xs text-gray-500">{role}</p>
              }
            </div>
            {
              !(!username && !role) &&
              <div className="relative w-5 h-[30px] hidden md:block">
                <RiArrowUpSLine className="size-5 absolute top-0 " />
                <RiArrowDownSLine className="size-5 absolute bottom-0" />
              </div>
            }
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>Tilawe Meat Merchants</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <span className="flex items-center gap-x-2">
                  <RiColorFilterLine className="size-4 text-inherit" />
                  <span>Theme</span>
                </span>
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                // @ts-ignore
                >
                  <DropdownMenuRadioItem
                    value="light"
                    onClick={() => {
                      handleThemeChange('light')
                    }}
                  >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>Light</span>
                      <RiSunLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="dark"
                    onClick={() => {
                      handleThemeChange('dark')
                    }}
                  >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>Dark</span>
                      <RiMoonLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="system"
                    onClick={() => {
                      handleThemeChange('system')
                    }}
                  >
                    <span className="w-full flex items-center gap-x-1 justify-between">
                      <span>System</span>
                      <RiComputerLine className="size-4 text-inherit" />
                    </span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            <button
              className="w-full"
              onClick={() => setEditProfileModalShow(true)}
            >
              <DropdownMenuItem >
                <span className="flex items-center gap-x-2">
                  <RiProfileLine className="size-4 text-inherit" />
                  Update Profile
                </span>
              </DropdownMenuItem>
            </button>
            <button
              className="w-full"
              onClick={() => signOut()}
            >
              <DropdownMenuItem >
                <span className="flex items-center gap-x-2">
                  <RiLogoutBoxLine className="size-4 text-inherit" />
                  Sign out
                </span>
              </DropdownMenuItem>
            </button>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}