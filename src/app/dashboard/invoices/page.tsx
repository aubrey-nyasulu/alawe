
import InvoicesPage from '@/ui/dashboard/invoices/InvoicesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        year?: string,
        city?: string,
        page?: string,
    };
}) {
    return (
        <InvoicesPage {...{ searchParams }} />
    )
}