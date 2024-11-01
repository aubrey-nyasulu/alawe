import { Schema, model, models } from 'mongoose'

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }
}, { timestamps: true })

const NotificationModel = models?.Notification || model('Notification', notificationSchema)

export default NotificationModel
