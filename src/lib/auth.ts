import UserModel from '@/db/models/UserModel'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { JWT } from 'next-auth/jwt'
import connectDB from '@/db/config/connectDB'
import { UserRoleModel } from '@/db/models'
import { ObjectId } from "mongodb"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials: any) {
                const { email: emailToVerify, password: passwordToVerify } = credentials

                try {
                    connectDB()
                    const user = await UserModel.findOne({ email: emailToVerify })

                    if (!user) return null
                    const passwordMatch = await bcrypt.compare(passwordToVerify, user.password)
                    if (!passwordMatch) return null

                    const { role: roleName } = await UserRoleModel.findById(user.role)

                    const { _id, username, email } = user
                    return { id: _id, _id, username, email, role: roleName }
                } catch (error) {
                    console.log('error in authorize catch', error)
                    return null
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/'
    },
    callbacks: {
        // Attach user info to the token
        async jwt({ token, user }: { token: JWT, user: any }) {
            // If user exists, attach their ID to the token
            if (user) {
                token.id = user._id
                token.username = user.username
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        // Add the user information to the session
        async session({ session, token }) {
            if (token) {
                session.user = {
                    _id: token.id.toString() as string,  // Assign the user's _id to session
                    username: token.username as string,
                    email: token.email as string,
                    role: token.role as string,
                }
            }

            return session
        }
    }
}
