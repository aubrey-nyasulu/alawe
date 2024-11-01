import useClientSession from "@/customHooks/useClientSession";
import { Revenue, User } from "@/types";

// Tremor Raw cx [v0.0.0]
import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-[#fa909050] ",
  // border color
  "focus:border-[#fa909090] ",
]

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-[#fa909090] ",
]

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 ",
  // ring color
  "ring-red-200 ",
]

export const formatCurrency = (amountInTambala: number) => {
  const amountInKwacha = amountInTambala / 100
  if (amountInKwacha <= 999) {
    return (amountInKwacha).toLocaleString('malawi', {
      style: 'currency',
      currency: 'MWK',
    })
  }
  else if (amountInKwacha <= 999999) {
    const amount = (amountInKwacha / 1000).toLocaleString('malawi', {
      style: 'currency',
      currency: 'MWK',
    }) + 'k'

    return amount
  }
  else {
    const amount = (amountInKwacha / 1000000).toLocaleString('malawi', {
      style: 'currency',
      currency: 'MWK',
    }) + 'm'

    return amount
  }

}

export const barChartFormatCurrency = (amountInTambala: number) => {
  const amountInKwacha = amountInTambala / 100
  if (amountInKwacha <= 999) {
    return `MK${Intl.NumberFormat("malawi").format(amountInKwacha).toString()}m`
  }
  else if (amountInKwacha <= 999999) {
    return `MK${Intl.NumberFormat("malawi").format(amountInKwacha / 1000).toString()}k`
  }
  else {
    return `MK${Intl.NumberFormat("malawi").format(amountInKwacha / 1000000).toString()}m`
  }

}

let valueFormatter = (number: number) =>
  `MK${Intl.NumberFormat("malawi").format(number / 1000000).toString()}m`


export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil((highestRecord / 100) / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000000) {

    yAxisLabels.push(`MK${(i / 1000) / 1000}m`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

type deepCloneReturnType = {
  [key: string]: any
} | any[]

export const deepClone = (param: any): deepCloneReturnType => {
  if (typeof param !== 'object') return param
  let ret
  ret = Array.isArray(param) ? [...param] : { ...param }

  for (let key in param) {
    ret[key] = deepClone(param[key])
  }

  return ret
}

export const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const years = ["2020", "2021", "2022", "2023", "2024"]

export function formatSolidNumber(value: number) {
  const strValue = value + ''

  const revStrVal = strValue.split('').reverse()

  let commadArr: string[] = []
  for (let i = 0; i < revStrVal.length;) {
    if (revStrVal[i + 3]) {
      const temp = revStrVal.splice(0, 3)
      if (i === 0) {
        commadArr = [...commadArr, ",",]
      }
    }
  }
}