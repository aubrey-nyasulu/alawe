'use server'

import PassIdModel from "@/db/models/PassIdModel"

// import { signIn } from '@/auth'
// import { AuthError } from 'next-auth'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // await signIn('credentials', formData)
    } catch (error) {
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //             return 'Invalid credentials.'
        //         default:
        //             return 'Something went wrong.'
        //     }
        // }
        throw error
    }
}

export const verifyPassId = async (value: string) => {
    try {
        if (!value) return { isValid: false, message: 'the value field can never be empty' }

        if (typeof value !== 'string') return { isValid: false, message: 'value filed should be a string' }


        let res = await PassIdModel.find().where({ value })

        if (res.length) {
            return { isValid: true, message: 'verification complee' }
        } else {
            return { isValid: false, message: 'Please Enter a valid passID key to continue' }
        }
    } catch (error) {
        console.log('some error occured while creating a passId', { error })

        return { isValid: false, message: 'Failed to finish verification stage. Please make sure you have an internet connection' }
    }
}