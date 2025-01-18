"use server"

import connectDB from '@/db/config/connectDB'
import { NotificationModel } from '@/db/models'
import UserModel from '@/db/models/UserModel'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { unstable_noStore as noStore } from 'next/cache'
import { verifyPassId } from './authenticateActions'

export async function updateEmployee(id: string, passID: string, formData: FormData) {
    noStore()

    const email: string | null = formData.get('email') as string
    const oldpassword: string | null = formData.get('oldpassword') as string
    const newpassword: string | null = formData.get('newpassword') as string
    const confirmpassword: string | null = formData.get('confirmpassword') as string

    try {
        connectDB()

        if (!email) return 'email is required'
        if (!oldpassword) return 'old password is required'
        if (!newpassword) return 'new password is required'
        if (!confirmpassword) return 'confirm password is required'
        if (newpassword === oldpassword) return 'you can not change password to the same password'
        if (newpassword !== confirmpassword) return 'new password and confirm password does not match'

        const passIdExists = await verifyPassId(passID)

        if (!passIdExists.isValid) return `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`

        const hashedNewPassword = await bcrypt.hash(newpassword, 10)

        const userExist = await UserModel.find().where({ email })

        if (!userExist) return 'user does note exist'

        let passwordMatch = await bcrypt.compare(oldpassword, userExist[0].password)

        if (!passwordMatch) return 'old password is incorrect'

        await UserModel.findByIdAndUpdate(new ObjectId(id), { password: hashedNewPassword })

        const notification = await NotificationModel.deleteOne().where({ type: 'security alert', userId: new ObjectId(id) })

        return 'successfull'
    } catch (error) {
        return 'some error'
    }
}