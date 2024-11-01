import { Metadata } from 'next';

import ReviewCenterPage from '@/ui/dashboard/reviewcenter/ReviewCenterPage';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Create() {
    return (
        <ReviewCenterPage />
    );
}