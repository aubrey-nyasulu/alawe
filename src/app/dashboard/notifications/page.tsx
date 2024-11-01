"use client"

import { Badge } from "@/tremorComponents/Barge"
import { Card } from "@/tremorComponents/Card"
import { Button } from "@/tremorComponents/Button"
import { NotificationsRadioCardGroup } from "@/ui/dashboard/notifications/NotificationsRadioCardGroup"
import ChangePasswordBTN from "@/ui/dashboard/components/ChangePasswordBTN"
import { cx } from "@/lib/utils"
import { useContext } from "react"
import { PageStateContext } from "@/context/PageStateProvider"
import { RiAlarmWarningLine, RiCheckLine, RiInformation2Line, RiUserReceived2Line } from "@remixicon/react"

export default function NotificationsCenter() {
    const { notifications } = useContext(PageStateContext)

    return (
        <main className="w-full p-4 space-y-2 text-gray-900 dark:text-gray-50">
            <div className="flex items-center gap-4 text-sm mb-8">
                <NotificationsRadioCardGroup />
            </div>
            {
                notifications
                    .map(notification => (
                        <Card className="max-w-[800px] flex items-center justify-between gap-4 md:gap-8 text-sm p-1" key={notification._id}>
                            <div className="flex items-center gap-2 ">
                                <Badge
                                    className={cx(
                                        "ring-none  rounded-full text-blaack ring-transparent",
                                        {
                                            "bg-green-500 text-white": notification.type === "hire approved",
                                            "bg-orange-500 text-white": notification.type === "new hire",
                                            "bg-red-500 text-white": notification.type === "security alert",
                                            "bg-yellow-500 text-white": notification.type === 'new report',
                                        }
                                    )}
                                >
                                    {
                                        notification.type === "hire approved" &&
                                        <RiCheckLine className="size-4 text-inherit" />
                                    }
                                    {
                                        notification.type === "security alert" &&
                                        <RiAlarmWarningLine className="size-4 text-inherit" />
                                    }
                                    {
                                        notification.type === "new hire" &&
                                        <RiUserReceived2Line className="size-4 text-inherit" />
                                    }
                                    {
                                        notification.type === 'new report' &&
                                        <RiInformation2Line className="size-4 text-inherit" />
                                    }
                                    {/* {notification.type} */}
                                </Badge>
                                <p className="line-clamp-3 text-gray-900 dark:text-gray-50">
                                    {notification.message}
                                </p>
                            </div>
                            {
                                notification.type === "security alert" &&
                                <ChangePasswordBTN styles=" rounded-[4px]" />
                            }
                            {
                                notification.type === "new hire" &&
                                < a
                                    href={"/dashboard/reviewcenter#Other"}
                                >
                                    <Button variant="secondary">
                                        Review
                                    </Button>
                                </a>
                            }
                            {
                                notification.type === 'new report' &&
                                < a
                                    href={"/dashboard/reports"}
                                >
                                    <Button variant="secondary">
                                        View
                                    </Button>
                                </a>
                            }
                        </Card>
                    ))
            }
            {
                !notifications.length &&
                <p>you have no new notifications at the moment</p>
            }
        </main>
    )
}



