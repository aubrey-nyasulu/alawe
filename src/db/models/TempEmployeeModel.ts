import { models, Schema, model } from 'mongoose'
import NotificationModel from './NotificationModel';
import UserModel from './UserModel';
import UserRoleModel from './UserRolesModel';
import { pusher } from '@/lib/pusher'

const TempEmployeeSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    job_title: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        default: 0.00
    },
    reports_to: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
}, { timestamps: true })


TempEmployeeSchema.pre('save', async function (next) {
    const user = await UserRoleModel.find().where({ role: "Company Manager" })
    const admin = await UserModel.find().where({ role: user[0]?._id })

    const notification = {
        message: 'admin requested to add new employee',
        type: 'new hire',
        userId: admin[0]._id.toString(),
        target: this._id
    }

    await pusher.trigger('notifications-channel', 'new-notification', {
        message: 'A new notification!',
    })

    await NotificationModel.create(notification)

    next();
});

const TempEmployeeModel = models?.TempUser || model('TempUser', TempEmployeeSchema)
export default TempEmployeeModel
