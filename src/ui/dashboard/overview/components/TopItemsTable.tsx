import { formatCurrency } from '@/lib/utils';
import { fetchFilteredInventory, fetchLatestPurchasedItems, fetchLatestPurchaseTransaction, } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';

export default async function TopItemsTable({ title, topItems }: {
    title?: string, topItems: {
        quantity: number,
        avg_price: number,
        item_name: string,
        category: string
    }[]
}) {

    return (
        <div className=" flow-root w-full">
            <div className="inline-block w-full align-middle ">
                {/* fetch latest purchased items form */}
                {
                    title &&
                    <p className='p-6 pb-4 font-semibold'>{title}</p>
                }
                <Card className="w-full p-2 md:pt-0 overflow-x-auto relative">
                    <table className="w-full text-gray-900 dark:text-gray-50 table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr className=' relative  text-nowrap'>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-nowrap sticky left-0 bg-white dark:bg-[#090E1A] z-20">
                                    Supplier Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                                    Purchase Total
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" rounded-lg bg-[#f5f6f9] dark:bg-gray-900 text-gray-900 dark:text-gray-50">
                            {topItems?.map((topItem: any, i: number) => (
                                <tr
                                    key={topItem._id}
                                    className="relative w-full border-b-2 border-b-white dark:border-b-gray-950 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-[#f5f6f9] dark:bg-gray-900 z-20">
                                        <div className="flex items-center gap-3">

                                            <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                                            <p>{topItem.item_name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(topItem.quantity * topItem.avg_price)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {topItem.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}
