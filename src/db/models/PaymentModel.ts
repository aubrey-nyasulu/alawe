import { models, Schema, model } from 'mongoose'

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        default: 0.00
    },
    invoice_id: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true
    }
}, { timestamps: true })

const PaymentModel = models?.Payment || model('Payment', PaymentSchema)
export default PaymentModel
