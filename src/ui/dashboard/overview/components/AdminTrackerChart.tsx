"use client"

import { Tracker } from '@/tremorComponents/Tracker'

const data = [
    // array-start
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-red-600", tooltip: "Error" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-red-600", tooltip: "Error" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-yellow-600", tooltip: "Warn" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },

    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { tooltip: "Server Down" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-yellow-600", tooltip: "Warn" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-red-600", tooltip: "Error" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    { color: "bg-emerald-600", tooltip: "Server Perfomance Optimal" },
    // array-end
]

export const AdminTrackerChart = () => (
    <>
        <Tracker className="hidden w-full lg:flex" data={data} />
        <Tracker
            className="hidden w-full sm:flex lg:hidden"
            data={data.slice(0, 60)}
        />
        <Tracker className="flex w-full sm:hidden" data={data.slice(0, 30)} />
    </>
)