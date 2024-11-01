import mongoose, { model, models, Schema } from "mongoose";

const UserRoleSchema = new Schema({
    role: {
        type: String,
        required: true
    },
}, { timestamps: true })

const UserRoleModel = models?.UserRole || model('UserRole', UserRoleSchema)

export default UserRoleModel