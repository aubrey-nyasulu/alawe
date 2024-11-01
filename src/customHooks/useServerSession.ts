import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'


export default async function useServerSession() {
    const session = await getServerSession(authOptions)

    return { session }
}

