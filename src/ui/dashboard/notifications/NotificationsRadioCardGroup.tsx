import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
} from "@/tremorComponents/RadioCardGroup"

export const NotificationsRadioCardGroup = () => {
    const handleClick = (value: string) => {
        console.log(value)
    }

    return (
        <form className=" max-w-sm">
            <fieldset className="space-y-3">
                <RadioCardGroup defaultValue="1" className="text-sm flex gap-4 items-center justify-start">
                    <RadioCardItem
                        value="all"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('all')}
                    >
                        <RadioCardIndicator />
                        <span>All</span>
                    </RadioCardItem>
                    <RadioCardItem
                        value="account"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('account')}
                    >
                        <RadioCardIndicator />
                        <span>Account</span>
                    </RadioCardItem>
                    <RadioCardItem
                        value="3"
                        className="flex items-center gap-3"
                        onClick={e => handleClick('security')}
                    >
                        <RadioCardIndicator />
                        <span>Security</span>
                    </RadioCardItem>
                </RadioCardGroup>
            </fieldset>
        </form>
    )

}