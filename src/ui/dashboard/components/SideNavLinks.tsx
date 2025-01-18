'use client'

import NavLinks from '@/ui/dashboard/components/nav-links';
import { CEOAnalyticsLinks, CEOWorksSpaceLinks, adminAnalyticsLinks, adminworksSpaceLinks, BranchManagerAnalyticsLinks, BranchManagerWorksSpaceLinks, ProcurementManagerAnalyticsLinks, ProcurementManagerWorksSpaceLinks, SupplyChainManagerWorksSpaceLinks, SupplyChainManagerAnalyticsLinks } from '@/lib/constants';
import { UserRole } from '@/types';

export default function SideNavLinks({ role, _id }: { role: UserRole, _id: string }) {
    const userLinks = role === "Company Manager"
        ? [CEOAnalyticsLinks, CEOWorksSpaceLinks]
        : role === "Admin"
            ? [adminAnalyticsLinks, adminworksSpaceLinks]
            : role === "Branch Manager"
                ? [BranchManagerAnalyticsLinks, BranchManagerWorksSpaceLinks]
                : role === "Procurement Manager"
                    ? [ProcurementManagerAnalyticsLinks, ProcurementManagerWorksSpaceLinks]
                    : role === "Supply Chain Manager"
                        ? [SupplyChainManagerAnalyticsLinks, SupplyChainManagerWorksSpaceLinks]
                        : [[], []]

    return (
        <>
            <small className='text-gray-400 dark:text-gray-500 pl-6 text-[12px] '>Overview</small>
            <NavLinks {...{ links: userLinks[0] }} />
            <div className='bg-[#e0e0e0] dark:bg-gray-900 w-full h-[1px] mt-4'></div>
            <small className='text-gray-400 dark:text-gray-500 pl-6 text-[12px] pt-4 '>Action Space</small>
            <NavLinks {...{ links: userLinks[1] }} />
        </>
    )
}
