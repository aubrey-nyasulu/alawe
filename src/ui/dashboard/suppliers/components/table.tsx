import { formatCurrency } from '@/lib/utils';
import { fetchFilteredInventory, fetchLatestPurchasedItems, } from '@/lib/data';
import { Card } from '@/tremorComponents/Card';


export default async function SuppliersTable({
  query,
  currentPage,
  title
}: {
  query: string;
  currentPage: number;
  title?: string
}) {
  const latestPurchasedItems = await fetchLatestPurchasedItems(query, currentPage);

  return (
    <div className="mt-4 flow-root w-full">
      <div className="inline-block min-w-full align-middle">
        {/* fetch latest purchased items form */}
        <Card className=" p-2 md:pt-0">
          {
            title &&
            <p className='p-6 pb-0 font-semibold'>{title}</p>
          }
          <div className="md:hidden">
            {latestPurchasedItems?.map((latestPurchasedItem: any) => (
              <div
                key={latestPurchasedItem._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                      <p>{latestPurchasedItem.item_id.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{latestPurchasedItem.item_id.type}</p>
                  </div>
                  <p className="text-xl font-medium">
                    {formatCurrency(latestPurchasedItem.item_id.price)}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{latestPurchasedItem.unit_price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Item Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unit Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  quantity
                </th>
              </tr>
            </thead>
            <tbody className=" rounded-lg bg-[#f5f6f9]">
              {latestPurchasedItems?.map((latestPurchasedItem: any, i: number) => (
                <tr
                  key={latestPurchasedItem._id}
                  className="w-full border-b-2 border-b-white py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 ">
                    <div className="flex items-center gap-3">

                      <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                      <p>{latestPurchasedItem.item_id.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {latestPurchasedItem.item_id.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(latestPurchasedItem.unit_price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {latestPurchasedItem.quantity}
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

