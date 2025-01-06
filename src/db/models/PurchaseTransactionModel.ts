import { models, Schema, model } from 'mongoose'

const PurchaseTransactionSchema = new Schema({
    purchase_total: {
        type: Number,
        required: true,
        default: 0.00
    },
    year: {
        type: Date,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
}, { timestamps: true })

const PurchaseTransactionModel = models?.PurchaseTransaction || model('PurchaseTransaction', PurchaseTransactionSchema)
export default PurchaseTransactionModel
