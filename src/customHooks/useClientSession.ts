
import { useSession } from 'next-auth/react'
import { User, UserRole } from '@/types';

export default function useClientSession() {
    const { data: session, status } = useSession()

    const { _id, email, role, username } = session?.user as User

    return { _id, email, role, username }
}
