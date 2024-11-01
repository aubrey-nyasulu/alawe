// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth' // Adjust the path to where `authOptions` is located

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }








