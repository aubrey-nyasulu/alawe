import { model, models, Schema } from "mongoose";
import NotificationModel from "./NotificationModel";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true
    }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {

    const notification = {
        message: `your account is all set, make sure to update your password as soon as possible`,
        type: 'security alert',
        userId: this._id
    }

    await NotificationModel.create(notification)

    next();
});

const UserModel = models?.User || model('User', UserSchema)

export default UserModel