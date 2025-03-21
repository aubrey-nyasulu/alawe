"use server"

import connectDB from "@/db/config/connectDB"
import { EmployeeModel, NotificationModel, UserRoleModel } from "@/db/models"
import TempEmployeeModel from "@/db/models/TempEmployeeModel"
import UserModel from "@/db/models/UserModel"
import { Employee } from "@/types"
import { ObjectId } from "mongodb"
import { pusher } from '@/lib/pusher'
import { verifyPassId } from "./authenticateActions"

export async function approveEmployee(id: string, targetId: string, passID: string) {
    try {
        connectDB()

        const passIdExists = await verifyPassId(passID)


        if (!passIdExists.isValid) return `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`

        if (!id) return 'request poorly formed'

        const userExist = await UserModel.findById(new ObjectId(id))

        console.log({ userExist })
        if (!userExist) return 'restricted action'
        const { role: roleName } = await UserRoleModel.findById(new ObjectId(userExist.role))

        if (roleName !== "Company Manager") return 'you do not have enough rights to perfom this action'

        const tempUser: Employee | null = await TempEmployeeModel.findById(targetId)

        if (!tempUser) {
            return 'User to approve not found'
        }

        const { _id, branch_id, email, firstname, lastname, salary } = tempUser

        if (!branch_id || !email || !firstname || !lastname || !salary) {
            return 'corrupt user data'
        }

        const employee = await EmployeeModel.create({ branch_id, email, firstname, lastname, password: '1234', salary })

        if (employee) {
            const res = await TempEmployeeModel.findByIdAndDelete(_id)

            const res2 = await NotificationModel.deleteOne().where({ target: new ObjectId(targetId) })

        }
        else {
            console.log({ employee })
            return 'failed to approve user'
        }

        const userRole = await UserRoleModel.find().where({ role: "Admin" })
        const user = await UserModel.find().where({ role: userRole[0]?._id })

        const notification = {
            message: 'Employee has been approved by the CEO',
            type: 'hire approved',
            userId: user[0]._id.toString(),
            target: targetId
        }

        await pusher.trigger('notifications-channel', 'new-notification', {
            message: 'A new notification!',
        })

        await NotificationModel.create(notification)

        return 'Employee approved'


    } catch (error: any) {
        console.log('failed to approve user', error?.code, error?.message)
        if (error?.code === 11000) {
            return 'failed to approve user, email provided already exists'
        }
        return 'failed to approve user'
    }
}

export async function declineEmployee(id: string, targetId: string, passID: string) {
    try {
        connectDB()

        // if (!passIDs.includes(passID)) return `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`

        if (!id) return 'request poorly formed'

        const userExist = await UserModel.findById(new ObjectId(id))

        console.log({ userExist })
        if (!userExist) return 'restricted action'
        const { role: roleName } = await UserRoleModel.findById(new ObjectId(userExist.role))

        if (roleName !== "Company Manager") return 'you do not have enough rights to perfom this action'

        const tempUser: Employee | null = await TempEmployeeModel.findById(targetId)

        if (!tempUser) {
            return 'User to decline not found'
        }

        const { _id } = tempUser

        if (_id) {
            const res = await TempEmployeeModel.findByIdAndDelete(_id)

            const res2 = await NotificationModel.deleteOne().where({ target: new ObjectId(targetId) })
        }
        else {
            console.log({ _id })
            return 'failed to perfom action user'
        }

        const userRole = await UserRoleModel.find().where({ role: "Admin" })
        const user = await UserModel.find().where({ role: userRole[0]?._id })

        const notification = {
            message: 'Employee has been declined by the CEO',
            type: 'hire declined',
            userId: user[0]._id.toString(),
            target: targetId
        }

        await pusher.trigger('notifications-channel', 'new-notification', {
            message: 'A new notification!',
        })

        await NotificationModel.create(notification)

        return 'Employee declined'


    } catch (error: any) {
        console.log('failed to decline user', error?.code, error?.message)
        if (error?.code === 11000) {
            return 'failed to decline user, email provided already exists'
        }
        return 'failed to decline user'
    }
}