
import { NotificationsRadioCardGroup } from "@/ui/dashboard/notifications/NotificationsRadioCardGroup"
import Notifications from "./Notifications"


export default function NotificationsCenter({
    searchParams,
}: {
    searchParams?: {
        notifications?: string,
        page?: string,
    };
}) {


    return (
        <main className="w-full p-4 space-y-2 text-gray-900 dark:text-gray-50">
            <div className="flex items-center gap-4 text-sm mb-8">
                <NotificationsRadioCardGroup searchParams={searchParams} />
            </div>

            <Notifications searchParams={searchParams} />
        </main>
    )
}



