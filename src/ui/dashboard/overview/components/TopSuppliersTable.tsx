import { formatCurrency } from '@/lib/utils';
import { fetchFilteredInventory, fetchLatestPurchasedItems, } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';
import { fetchSuppliers } from '@/lib/dbdirect';

export default async function TopSuppliersTable({ title }: { title: string }) {

    let suppliers = await fetchSuppliers();

    return (
        <div className="flow-root w-full ">
            <div className="inline-block w-full align-middle">
                {/* fetch latest purchased items form */}
                {
                    title &&
                    <p className='p-6 pb-4 font-semibold'>{title}</p>
                }
                <Card className="w-full p-2 md:pt-0">
                    <table className="w-full text-gray-900 dark:text-gray-50 table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium text-nowrap sm:pl-6">
                                    Supplier Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                                    Total Supplies
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" rounded-lg bg-[#f5f6f9] dark:bg-gray-900 text-gray-900 dark:text-gray-50">
                            {suppliers?.map((supplier, i) => (
                                <tr
                                    key={supplier._id}
                                    className="w-full border-b-2 border-b-white dark:border-b-gray-950 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3 ">
                                        <div className="flex items-center gap-3">

                                            <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                                            <p>{supplier.name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {97 - (i * 6)}
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
