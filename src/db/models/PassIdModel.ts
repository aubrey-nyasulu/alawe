import { models, Schema, model } from 'mongoose'

const PassIdSchema = new Schema({
    value: {
        type: String,
        length: 24,
        required: true
    },
    issuesdTo: {
        type: String,
        maxlength: 50,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const PassIdModel = models?.PassId || model('PassId', PassIdSchema)
export default PassIdModel
