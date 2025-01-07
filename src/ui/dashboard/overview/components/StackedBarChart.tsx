'use client'

import { cx } from "@/lib/utils"
import { BarChart, TooltipProps } from "@/tremorComponents/BarChart";

interface Issue {
    status: "Fullfilled" | "Unfullfilled";
    value: number;
    percentage: number;
}

interface DataEntry {
    date: string;
    issues: Issue[];
}

// Transform data into a format suitable for BarChart
function formatteArray(data: DataEntry[]) {
    const formattedArray = data.map((entry) => {
        return {
            date: entry.date,
            ...entry.issues.reduce(
                (acc, issue) => {
                    acc[issue.status] = issue.value;
                    return acc;
                },
                {} as { [key in Issue["status"]]?: number }
            ),
        };
    })

    return formattedArray
}

const valueFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
};

const status = {
    "Fullfilled": "bg-amber-500 dark:bg-blue-500",
    "Unfullfilled": "bg-primary dark:bg-cyan-500",
}

const Tooltip = ({ payload, active, label }: TooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload.map((item) => ({
        status: item.category as Issue["status"],
        value: item.value,
        percentage: (
            (item.value /
                (item.payload.Fullfilled + item.payload["Unfullfilled"])) *
            100
        ).toFixed(2),
    }));

    return (
        <>
            <div className="w-60 rounded-md border border-gray-500/10  bg-amber-500 px-4 py-1.5 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
                <p className="flex items-center justify-between">
                    <span className="text-gray-50 dark:text-gray-50">
                        Date
                    </span>
                    <span className="font-medium text-gray-50 dark:text-gray-50">{label}</span>
                </p>
            </div>
            <div className="mt-1 w-60 space-y-1 rounded-md border border-gray-500/10  bg-white px-4 py-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2.5">
                        <span
                            className={cx(
                                status[item.status],
                                "size-2.5 shrink-0 rounded-sm"
                            )}
                            aria-hidden={true}
                        />
                        <div className="flex w-full justify-between">
                            <span className=" text-gray-700 dark:text-gray-300">
                                {item.status}
                            </span>
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-gray-900 dark:text-gray-50">
                                    {item.value}
                                </span>
                                <span className="text-gray-500 dark:text-gray-500">
                                    ({item.percentage}&#37;)
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export function StackedBarChart({ ordersFullfilmentRates }: { ordersFullfilmentRates: DataEntry[] }) {
    const formattedArray = formatteArray(ordersFullfilmentRates)

    console.log({ formattedArray })

    return (
        <div>
            <BarChart
                className="hidden h-80 sm:block"
                data={formattedArray}
                index="date"
                categories={["Fullfilled", "Unfullfilled"]}
                type="stacked"
                colors={["amber", "primary",]}
                valueFormatter={valueFormatter}
                yAxisWidth={35}
                showLegend={false}
                customTooltip={Tooltip}
            />
            <BarChart
                className="h-80 sm:hidden"
                data={formattedArray}
                index="date"
                categories={["Fullfilled", "Unfullfilled"]}
                type="stacked"
                colors={["amber", "primary",]}
                valueFormatter={valueFormatter}
                showYAxis={false}
                showLegend={false}
                startEndOnly={true}
                customTooltip={Tooltip}
            />
        </div>
    );
}