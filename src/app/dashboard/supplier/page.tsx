import React from 'react'
import { Metadata } from 'next'

import SupplierPage from '@/ui/dashboard/suppliers/SupplierPage'

export const metadata: Metadata = {
    title: 'Supplier',
}

export default function Supplier() {
    return (
        <SupplierPage />
    )
}
