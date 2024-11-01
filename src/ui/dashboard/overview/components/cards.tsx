
import { CoinsIcons, GraphTimeSeries, TotalIcon, TimeGraph, ClockIcon } from '@/assets/SVGComponents';
import { fetchCardData } from '@/lib/data';
import { lusitana } from '@/assets/fonts';
import clsx from 'clsx';

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card {...{ title: 'Weekly Sales', type: 'sales', cardData: [{ title: 'Total', figure: 'MK3,200,000.00', Icon: TimeGraph }, { title: 'Profit', figure: 'MK1,540,000.00', Icon: CoinsIcons }] }} />
      <Card {...{ title: 'Invoices', type: 'invoices', cardData: [{ title: 'Collected', figure: totalPaidInvoices, Icon: TotalIcon }, { title: 'Pending', figure: totalPendingInvoices, Icon: ClockIcon }] }} />

    </>
  );
}

export function Card({
  title,
  subTitle,
  type,
  cardData
}: {
  title: string,
  subTitle?: string | number,
  type: 'invoices' | 'sales'
  cardData: {
    title: string,
    figure: string,
    Icon: ({ color }: {
      color?: string | undefined
    }) => JSX.Element,
  }[]
}) {

  return (
    <div className="w-fit rounded-xl bg-white p-2 shadow-sm border border-[#e0e0e0]">
      <div className="flex p-4 ">
        <h3 className="ml-2 font-bold uppercase">{title}</h3>
      </div>
      <div className='flex gap-2'>
        {
          cardData.map(({ title, figure, Icon }, index) => (
            <div
              key={index}
              className='flex-1 truncate rounded-xl border border-[#e0e0e0] p-4  space-y-6'
            >
              <div className='flex gap-16 justify-between items-center'>
                <small>{title}</small>
                {/* <div
                  className={clsx(
                    'p-4 rounded-2xl',
                    {
                      // 'bg-green-200': index === 0,
                      // 'bg-orange-200': index !== 0,
                    }
                  )}
                >
                  <Icon />
                </div> */}
              </div>
              <p
                className={` font-semibold`}
              >
                {figure}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
