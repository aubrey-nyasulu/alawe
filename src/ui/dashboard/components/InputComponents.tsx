"use client"

import { Input, InputProps } from "@/tremorComponents/Input"

type TextTypePropTypes = {
    id?: string | undefined
    name?: string | undefined
    placeholder?: string
    required?: boolean
    className?: string
    value?: string | number | undefined
    onChange?: (el: any) => void
    props?: InputProps
}


export const TextInput = ({ id = undefined, placeholder = '', value = undefined, name = undefined, ...props }: TextTypePropTypes) => (
    <Input className="w-full" {...{ id, name, placeholder, value, ...props }} />
)

type EmailTypePropTypes = {
    id?: string | undefined
    name?: string | undefined
    placeholder?: string
    required?: boolean
    className?: string
    value?: string | number | undefined
    onChange?: (el: any) => void
    props?: InputProps
}

export const EmailInput = ({ id = undefined, placeholder = '', value = undefined, name = undefined, required = false, className, onChange, ...props }: EmailTypePropTypes) => (
    <div className="w-full">
        <Input
            type="email"
            className={className} {...{ id, name, placeholder, value, required, onChange, ...props }}
        />
    </div>
)

type PasswordTypePropTypes = {
    id?: string | undefined
    name?: string | undefined
    placeholder?: string
    value?: string | number | undefined
    required?: boolean
    className?: string
    onChange?: (el: any) => void
    props?: InputProps
}

export const PasswordInput = ({ id = undefined, placeholder = '', value = undefined, name = undefined, required = false, className, onChange, ...props }: PasswordTypePropTypes) => (
    <div className="w-full">
        <Input
            type="password"
            className={className} {...{ id, name, placeholder, value, required, onChange, ...props }}
        />
    </div>
)
