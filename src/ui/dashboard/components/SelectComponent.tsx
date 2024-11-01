'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/tremorComponents/Select"
import { useEffect } from "react";

const initialValue = ''

export function SelectComponent(
    {
        data,
        defaultValue = '',
        placeholder = 'Select',
        value = undefined,
        OnValueChange,
        disabled,
        ...props
    }:
        {
            data: {
                value: string;
                label: string;
            }[],
            defaultValue?: string,
            value?: string | undefined,
            OnValueChange?: (value: string) => any,
            placeholder?: string,
            disabled?: boolean | undefined,
            props?: any,
        }) {



    return (
        <>
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
                    {data.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}