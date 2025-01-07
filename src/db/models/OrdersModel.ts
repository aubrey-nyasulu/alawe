import { models, Schema, model } from 'mongoose'

const OrdersSchema = new Schema({
    year: {
        type: Date,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, { timestamps: true })

const OrdersModel = models?.Orders || model('Orders', OrdersSchema)
export default OrdersModel
