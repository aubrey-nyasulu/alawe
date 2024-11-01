import { models, Schema, model } from 'mongoose'

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        maxlength: 255
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: [true]
    }
}, { timestamps: true })

const ClientModel = models?.Client || model('Client', ClientSchema)
export default ClientModel
