"use client"

import { NotificationIcon } from '@/assets/SVGComponents'
import { PageStateContext } from '@/context/PageStateProvider'
import { cx } from '@/lib/utils'
import { RiNotification2Line, RiNotification3Line } from '@remixicon/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

export default function NotificationsComponent() {
    const pathname = usePathname()

    const { notifications } = useContext(PageStateContext)

    const notificationsCount = notifications.length

    return (
        <Link
            href={'/dashboard/notifications'}
            className='w-fit h-fit '
        >
            <div className='relative text-gray-900 dark:text-gray-50'>
                {
                    notificationsCount &&
                    <div className={cx('absolute w-6 h-6 p-1 -top-[12px] -left-[12px] rounded-full bg-primary grid place-content-center text-white ', pathname === '/notifications' && 'bg-white text-primary')}>
                        <small className='text-xs font-semibold'>{notificationsCount}</small>
                    </div>
                }
                <RiNotification3Line className='size-6' />
            </div>
        </Link>
    )
}
