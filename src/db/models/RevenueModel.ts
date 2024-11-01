import { models, Schema, model } from 'mongoose'

const RevenueSchema = new Schema({
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0.00
    }
}, { timestamps: true })

const RevenueModel = models?.Revenue || model('Revenue', RevenueSchema)
export default RevenueModel