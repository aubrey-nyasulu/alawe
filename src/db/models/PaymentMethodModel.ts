import { models, Schema, model } from 'mongoose'

const PaymentMethodSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const PaymentMethodModel = models?.PaymentMethod || model('PaymentMethod', PaymentMethodSchema)
export default PaymentMethodModel
