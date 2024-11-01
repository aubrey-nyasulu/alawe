import { PageStateContext } from "@/context/PageStateProvider";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { ReactNode, useContext } from "react";

export default function CustomSelect({ id, name, OnChange, children }: { id: string, name: string, OnChange?: (e: any) => void, children: ReactNode }) {

    return (
        <div className="relative">
            <select
                id={id}
                name={name}
                onChange={OnChange}
                className="peer outline-2 placeholder:text-gray-500 block w-full p-4 text-sm border border-gray-300 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-500 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                defaultValue=""
                aria-describedby="reports_to-error"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex  flex-col items-center justify-center  mr-4">
                <div className="relative h-[30px] text-gray-900 dark:text-gray-500">
                    <RiArrowUpSLine className="size-5 absolute top-0 " />
                    <RiArrowDownSLine className="size-5 absolute bottom-0" />
                </div>
            </div>
        </div>
    )
}
