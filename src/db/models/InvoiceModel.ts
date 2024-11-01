import { models, Schema, model } from 'mongoose'

const InvoiceSchema = new Schema({
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0.00
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

const InvoiceModel = models?.Invoice || model('Invoice', InvoiceSchema)
export default InvoiceModel
