import { Metadata } from 'next';

import CreatePage from '@/ui/dashboard/create/CreatePage';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Create() {
    return (
        <CreatePage />
    );
}