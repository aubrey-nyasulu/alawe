'use client'

import { Badge } from "@/tremorComponents/Barge"
import { Card } from "@/tremorComponents/Card"
import { cx } from "@/lib/utils"
import { useContext, useEffect } from "react"
import { PageStateContext } from "@/context/PageStateProvider"
import { RiAddCircleLine, RiAlarmWarningLine, RiCheckLine, RiInformation2Line, RiUserReceived2Line } from "@remixicon/react"
import Link from "next/link"
import TimePassed from "./TimePassed"

export default function Notifications({
    searchParams,
}: {
    searchParams?: {
        notifications?: string,
        page?: string,
    };
}) {
    const { notifications, updateNotifications, editProfileModalShow, setEditProfileModalShow } = useContext(PageStateContext)

    useEffect(() => {
        updateNotifications(searchParams?.notifications)
    }, [searchParams])

    return (
        <>
            {
                notifications
                    .map(notification => {
                        return (
                            <Link
                                key={notification._id}
                                href={
                                    notification.type === "new hire"
                                        ? "/dashboard/reviewcenter#Other"
                                        : notification.type === 'new report'
                                            ? "/dashboard/reports"
                                            : "#"
                                }
                                className="w-full h-fit block"
                                onClick={() => {
                                    if (notification.type === "security alert") {
                                        setEditProfileModalShow(!editProfileModalShow)
                                    }
                                }}
                            >
                                <Card className="max-w-[800px] flex md:items-center justify-between text-sm p-1">

                                    <Badge
                                        className={cx(
                                            "ring-none  rounded-md text-blaack ring-transparent",
                                            {
                                                "bg-green-500 text-white": notification.type === "hire approved",
                                                "bg-orange-500 text-white": notification.type === "new hire",
                                                "bg-red-500 text-white": notification.type === "security alert" || notification.type === "hire declined",
                                                "bg-yellow-500 text-white": notification.type === 'new report',
                                            }
                                        )}
                                    >
                                        {
                                            notification.type === "hire approved" &&
                                            <RiCheckLine className="size-8 text-inherit" />
                                        }
                                        {
                                            notification.type === "security alert" &&
                                            <RiAlarmWarningLine className="size-8 text-inherit" />
                                        }
                                        {
                                            notification.type === "new hire" &&
                                            <RiUserReceived2Line className="size-8 text-inherit" />
                                        }
                                        {
                                            notification.type === 'new report' &&
                                            <RiInformation2Line className="size-8 text-inherit" />
                                        }
                                        {
                                            notification.type === "hire declined" &&
                                            <RiAddCircleLine className="size-8 text-inherit rotate-45" />
                                        }
                                        {
                                            !(notification?.type) &&
                                            <RiInformation2Line className="size-8 text-inherit" />
                                        }
                                        {/* {notification.type} */}
                                    </Badge>

                                    <div className=" w-full flex gap-0 md:gap-4 md:justify-between flex-col md:flex-row px-3 ">
                                        <p className="line-clamp-3 text-gray-900 dark:text-gray-50">
                                            {notification.message}
                                        </p>
                                        {
                                            notification?.createdAt &&
                                            <TimePassed inputDate={new Date(notification.createdAt)} />
                                        }
                                    </div>
                                </Card>
                            </Link>
                        )
                    })
            }

            {
                !notifications.length &&
                <p>you have no new notifications at the moment</p>
            }
        </>
    )
}


