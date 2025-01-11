import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/tremorComponents/Select"

export default function CardSelect(
    {
        data,
        defaultValue = '0',
        placeholder = 'Select',
        value = undefined,
        OnValueChange,
        disabled,
        ...props
    }:
        {
            data: string[],
            defaultValue?: string,
            value?: string | undefined,
            OnValueChange?: (value: string) => any,
            placeholder?: string,
            disabled?: boolean | undefined,
            props?: any,
        }) {

    return (
        <Select
            disabled={disabled}
            defaultValue={defaultValue}
            {...{ ...props }}
            onValueChange={OnValueChange}
            value={value}
        >
            <SelectTrigger className="mx-auto">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map(value => (
                    <SelectItem key={value} value={value}>
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
