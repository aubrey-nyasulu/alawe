import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
} from "@/tremorComponents/RadioCardGroup"
import { useState } from "react"

export const NotificationsRadioCardGroup = () => {
    const [filterValue, setFilterValue] = useState('all')

    const handleClick = (value: string) => {
        console.log(value)
        setFilterValue(value)
    }

    return (
        <form className=" max-w-sm">
            <fieldset className="space-y-3">
                <RadioCardGroup defaultValue="1" className="text-sm flex gap-4 items-center justify-start">
                    <RadioCardItem
                        value="all"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('all')}
                        checked={filterValue === 'all'}
                    >
                        <RadioCardIndicator />
                        <span>All</span>
                    </RadioCardItem>
                    <RadioCardItem
                        value="account"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('account')}
                        checked={filterValue === 'account'}
                    >
                        <RadioCardIndicator />
                        <span>Account</span>
                    </RadioCardItem>
                    <RadioCardItem
                        value="3"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('security')}
                        checked={filterValue === 'security'}
                    >
                        <RadioCardIndicator />
                        <span>Security</span>
                    </RadioCardItem>
                </RadioCardGroup>
            </fieldset>
        </form>
    )

}