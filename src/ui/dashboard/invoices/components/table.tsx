
import InvoiceStatus from '@/ui/dashboard/invoices/components/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchFilteredInvoices } from '@/lib/data';
import InvoiceTableActionsDropdown from './InvoiceTableActionsDropdown';
import { Card } from '@/tremorComponents/Card';


export default async function InvoicesTable({
  query,
  currentPage,
  canEdit
}: {
  query: string;
  currentPage: number;
  canEdit: boolean
}) {

  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="w-full custom mt-4 flow-roo">
      <div className="w-full inline-block align-middle">
        <Card className="w-full p-2 md:pt-0 overflow-x-auto">

          <table className="w-full text-gray-900 dark:text-gray-50 table">
            <thead className=" w-full rounded-lg text-left text-sm font-normal relative">
              <tr className=' relative  text-nowrap'>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-nowrap sticky left-0 bg-white dark:bg-[#090E1A] ">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-nowrap text-center">
                  Status
                </th>
                {
                  canEdit &&
                  <th scope="col" className="px-3 py-5 font-medium text-nowrap text-center">
                    Actions
                  </th>
                }
              </tr>
            </thead>
            <tbody className=" rounded-lg bg-[#f5f6f9] dark:bg-gray-900 text-gray-900 dark:text-gray-50">
              {invoices?.map((invoice: any, i: number) => (
                <tr
                  key={invoice._id._id}
                  className="relative w-full  border-b-2 border-b-white dark:border-b-gray-950 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-[#f5f6f9] dark:bg-gray-900 z-20 ">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                      <p>
                        {invoice.client_id.name}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {invoice.client_id.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    {formatDateToLocal(invoice.due_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3  grid place-content-center">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  {
                    canEdit &&
                    <td className="whitespace-nowrap py-3  pl-6 pr-3">
                      <div className="flex justify-center gap-3">
                        <InvoiceTableActionsDropdown {...{ id: invoice._id as string }} />
                      </div>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

