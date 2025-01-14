"use server"

import connectDB from '@/db/config/connectDB'
import { NotificationModel } from '@/db/models'
import UserModel from '@/db/models/UserModel'
import { passIDs } from '@/lib/utils'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { unstable_noStore as noStore } from 'next/cache'

export async function updateEmployee(id: string, passID: string, formData: FormData) {
    noStore()

    if (!passIDs.includes(passID)) return `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`

    const email: any = formData.get('email')
    const password: any = formData.get('password')

    try {
        connectDB()

        if (!password) return 'password is required'
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!email) {
            await UserModel.findByIdAndUpdate(new ObjectId(id), { password: hashedPassword })
        }
        else {
            await UserModel.findByIdAndUpdate(new ObjectId(id), { password: hashedPassword, email })
        }

        const notification = await NotificationModel.deleteOne().where({ type: 'security alert', userId: new ObjectId(id) })

        return 'successfull'
    } catch (error) {
        return 'some error'
    }
}