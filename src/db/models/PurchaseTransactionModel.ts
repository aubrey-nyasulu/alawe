import { models, Schema, model } from 'mongoose'

const PurchaseTransactionSchema = new Schema({
    purchase_total: {
        type: Number,
        required: true,
        default: 0.00
    },
    supplier_id: {
        type: String,
        ref: 'Supplier',
        required: true
    },
}, { timestamps: true })

const PurchaseTransactionModel = models?.PurchaseTransaction || model('PurchaseTransaction', PurchaseTransactionSchema)
export default PurchaseTransactionModel
