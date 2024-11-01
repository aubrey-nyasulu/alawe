import { models, Schema, model } from 'mongoose'

const SalesTransactionSchema = new Schema({
    purchase_total: {
        type: Number,
        required: true,
        default: 0.00
    },
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },

}, { timestamps: true })

const SalesTransactionModel = models?.SalesTransaction || model('SalesTransaction', SalesTransactionSchema)
export default SalesTransactionModel
