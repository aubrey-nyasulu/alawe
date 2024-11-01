import { Card } from '@/tremorComponents/Card';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <Card
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-2 text-xs ',
        {
          'bg-gray-50 dark:bg-gray-950 border border-gray-500/30 text-gray-900 dark:text-gray-300': status === 'pending',
          'bg-emerald-50 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
        </>
      ) : null}
    </Card>
  );
}
