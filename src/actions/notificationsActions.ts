"use server"

import connectDB from "@/db/config/connectDB"
import { NotificationModel } from "@/db/models"
import { Notification } from "@/types"
import { ObjectId } from 'mongodb'
import { unstable_noStore as noStore } from 'next/cache'

export async function getNotifications(id: string, query?: string) {
    noStore()

    const regex = new RegExp(query || '', 'i')

    try {
        connectDB()
        const notifications: Notification[] = await NotificationModel.find()
            .where({
                userId: new ObjectId(id),
                $or: [
                    {
                        type: { $regex: regex }
                    }
                ]
            })
            .sort({ updatedAt: -1 })

        console.log({ notifications })


        const seliarisedNotifications = notifications.map(({ _id, userId, message, type, target }) => {
            return {
                _id: _id?.toString(), userId: userId.toString(), message, type, target: target?.toString()
            }
        })

        return seliarisedNotifications
    } catch (error) {
        console.log('some error occured')

        throw new Error('failed to fetch notifications')
    }
}