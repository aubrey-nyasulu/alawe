'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';
import { PageStateContext } from '@/context/PageStateProvider';
import {
  RiBarChartLine,
  RiMicroscopeLine,
  RiNotification3Line,
  RiBarcodeLine,
  RiTicketLine,
  RiReceiptLine,
  RiFile3Line,
  RiAddBoxLine,
  RiAddLine
} from '@remixicon/react';

export default function NavLinks({ links, }: {
  links: {
    name: string;
    href: string;
  }[],
}) {
  const pathname = usePathname()

  const { notifications } = useContext(PageStateContext)

  const notificationsCount = notifications.length

  const { showMenu, setShowMenu } = useContext(PageStateContext)

  const { theme } = useContext(PageStateContext)

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='flex gap-2 w-full pr-2'
            onClick={() => { setShowMenu(false) }}
          >
            <div className={clsx(
              'w-1 h-4 my-auto md:h-full rounded-3xl md:rounded-r-3xl',
              {
                'bg-primary': pathname === link.href
              }
            )}></div>
            <div className={clsx(
              'w-full h-[48px] flex gap-2 items-center px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50',
              {
                'text-white bg-primary hover:bg-primary': pathname === link.href,
              },
            )}>
              <div className='relative'>
                {
                  (
                    link.name === "Notifications" && (notificationsCount > 0)
                  ) &&
                  <div className={cx('absolute w-6 h-6 p-1 -top-[12px] -left-[12px] rounded-full bg-primary grid place-content-center text-white ', pathname === link.href && 'bg-white text-primary')}>
                    <small className='text-xs font-semibold'>{notificationsCount}</small>
                  </div>
                }

                {
                  link.href === '/dashboard'
                    ? <RiBarChartLine className='size-5' />
                    : link.href === '/dashboard/reviewcenter'
                      ? <RiMicroscopeLine className='size-5' />
                      : link.href === '/dashboard/notifications'
                        ? <RiNotification3Line className='size-5' />
                        : link.href === '/dashboard/inventory'
                          ? <RiBarcodeLine className='size-5' />
                          : (link.href === '/dashboard/invoices' || link.href === '/dashboard/purchasetransactions')
                            ? <RiReceiptLine className='size-5' />
                            : link.href === '/dashboard/reports'
                              ? <RiFile3Line className='size-5' />
                              : link.href === '/dashboard/create'
                                ? <RiAddLine className='size-5' />
                                : null
                }
              </div>
              <p className=" text-sm ">{link.name}</p>
            </div>

          </Link>
        );
      })}
    </>
  );
}
