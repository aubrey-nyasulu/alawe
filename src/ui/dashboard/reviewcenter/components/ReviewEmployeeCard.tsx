import { formatCurrency } from '@/lib/utils';
import { Card } from '@/tremorComponents/Card';
import { Employee } from '@/types';
import ReviewOtherActionsDropDown from './ReviewOtherActionsDropDown';

export default function ReviewEmployeeCard({ Employee }: { Employee: Employee }) {
    return (
        <div className="w-full flow-root text-gray-900 dark:text-gray-50">
            <div className="w-full inline-block min-w-full align-middle">
                <p className='font-semibold pb-2'>Approve Employee <small className='italic text-gray-600'>@Branch Manager</small></p>
                <Card className="w-full p-2 md:pt-0 overflow-x-auto">
                    <table className="w-full text-gray-900 dark:text-gray-50 table">
                        <thead className=" w-full rounded-lg text-left text-sm font-normal relative">
                            <tr className=' relative  text-nowrap'>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-nowrap sticky left-0 bg-white dark:bg-[#090E1A] ">
                                    First Name
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-start">
                                    Last Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Salary
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Branch
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" rounded-lg bg-[#f5f6f9] dark:bg-gray-900 text-gray-900 dark:text-gray-50">
                            <tr
                                className="relative w-full  border-b-2 border-b-white dark:border-b-gray-950 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg   "
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-[#f5f6f9] dark:bg-gray-900 z-30 ">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
                                        <p>{Employee.firstname}</p>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {Employee.lastname}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {Employee.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {Employee.salary}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    branch
                                </td>
                                <td className="whitespace-nowrap py-3  pl-6 pr-3">
                                    <div className="flex justify-center gap-3">
                                        <ReviewOtherActionsDropDown {...{ targetId: Employee._id?.toString() as string }} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}
