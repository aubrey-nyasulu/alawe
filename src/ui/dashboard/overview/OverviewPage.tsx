import AdminOverview from './ConditionalPages/AdminOverview'
import BranchManagerOverView from './ConditionalPages/BranchManagerOverView'
import CEOOverview from './ConditionalPages/CEOOverview'
import useServerSession from '@/customHooks/useServerSession'
import { User } from '@/types'
import ProcurementManagerOverView from './ConditionalPages/ProcurementManagerOverView'
import SupplyChainManagerManagerOverView from './ConditionalPages/SupplyChainManagerManagerOverView'

export default async function OverviewPage({
    searchParams,
}: {
    searchParams?: {
        city?: string
        branch_id?: string
        year?: string
    }
}) {
    const { session } = await useServerSession()

    const user = session?.user as User

    const isCEO = user.role === 'Company Manager'
    const isAdmin = user.role === 'Admin'
    const isBranchManager = user.role === 'Branch Manager'
    const isProcurementManager = user.role === 'Procurement Manager'
    const isSupplyChainManager = user.role === 'Supply Chain Manager'

    return (
        <>
            {isCEO && <CEOOverview {...{ searchParams }} />}

            {isAdmin && <AdminOverview {...{ searchParams }} />}

            {isBranchManager && <BranchManagerOverView {...{ searchParams }} />}

            {
                isProcurementManager &&
                <ProcurementManagerOverView {...{ searchParams }} />
            }

            {
                isSupplyChainManager &&
                <SupplyChainManagerManagerOverView {...{ searchParams }} />
            }
        </>
    )
}
