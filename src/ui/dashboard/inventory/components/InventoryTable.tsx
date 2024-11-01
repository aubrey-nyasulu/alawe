import { formatCurrency } from '@/lib/utils';
import { fetchFilteredInventory, } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';


export default async function InventoryTable(
  { query, currentPage, branch = '' }: {
    query: string,
    branch?: string,
    currentPage: number,
  }
) {
  const invoices = await fetchFilteredInventory({ query, currentPage, branch });

  return (
    <div className="w-full mt-4 flow-root">
      <div className="w-full inline-block min-w-full align-middle">
        <Card className="w-full p-2 md:pt-0 overflow-x-auto">
          <table className="w-full text-gray-900 dark:text-gray-50 table">
            <thead className=" w-full rounded-lg text-left text-sm font-normal relative">
              <tr className=' relative  text-nowrap'>
                <th scope="col"
                  className="sticky left-0 bg-white dark:bg-[#090E1A] px-4 py-5 font-medium sm:pl-6 text-nowrap ">
                  Product Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Unit Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Total in Stock
                </th>
              </tr>
            </thead>
            <tbody className="overflow-hidden rounded-lg bg-[#f5f6f9] dark:bg-gray-900">
              {invoices?.map((inventory: any, i: number) => (
                <tr
                  key={inventory._id}
                  className="relative w-full overflow-hidden border-b-2 border-b-white dark:border-b-gray-950  py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-[#f5f6f9] dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                      <p>{inventory.product_id.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {inventory.product_id.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(inventory.product_id.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {inventory.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

