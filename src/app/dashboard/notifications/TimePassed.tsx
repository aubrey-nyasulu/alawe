import { timeAgo } from "@/lib/utils"

export default function TimePassed({ inputDate }: { inputDate: Date | string | number }) {
    const timePassed = timeAgo(inputDate)

    return (
        <>
            {
                timePassed === '0s'
                    ? <small className="opacity-50">just now</small>
                    : <small className="opacity-50">{timePassed} ago</small>
            }
        </>
    )
}