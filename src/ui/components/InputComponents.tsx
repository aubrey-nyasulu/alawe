"use client"

import { Input, InputProps } from "@/tremorComponents/Input"

type InputPropTypes = {
    id?: string | undefined
    name?: string | undefined
    placeholder?: string
    required?: boolean
    className?: string
    value?: string | number | undefined
    onChange?: (el: any) => void
    props?: InputProps
}

export const TextInput = (
    {
        id = undefined,
        placeholder = '',
        value = undefined,
        name = undefined, ...props
    }: InputPropTypes
) => {
    return (
        <Input className="w-full" {...{ id, name, placeholder, value, ...props }} />
    )
}



export const EmailInput = (
    { id = undefined,
        placeholder = '',
        value = undefined,
        name = undefined,
        required = false,
        className,
        onChange, ...props
    }: InputPropTypes
) => {
    return (
        <div className="w-full">
            <Input
                type="email"
                className={className} {...{ id, name, placeholder, value, required, onChange, ...props }}
            />
        </div>
    )
}

export const PasswordInput = (
    {
        id = undefined,
        placeholder = '',
        value = undefined,
        name = undefined,
        required = false,
        className, onChange,
        ...props
    }: InputPropTypes
) => {
    return (
        <div className="w-full">
            <Input
                type="password"
                className={className} {...{ id, name, placeholder, value, required, onChange, ...props }}
            />
        </div>
    )
}