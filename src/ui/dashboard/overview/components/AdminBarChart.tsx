"use client"

import { barChartFormatCurrency, deepClone } from "@/lib/utils";
import { BarChart } from "@/tremorComponents/BarChart"

export const AdminBarChart = ({ chartdata }: {
  chartdata: {
    [key: string]: any;
    date: string;
    Deployement?: number;
    'Cloud Services'?: number;
  }[]
}) => {

  let categories = deepClone(chartdata[0])

  if (typeof categories === 'object') {
    // @ts-ignore
    delete categories["date"]
    categories = Object.keys(categories)
  }

  return <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={categories as string[]}
    valueFormatter={barChartFormatCurrency}
    onValueChange={(v) => console.log(v)}
  />
}