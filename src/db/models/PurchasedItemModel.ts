import { models, Schema, model } from 'mongoose'

const PurchasedItemsSchema = new Schema({
    purchase_transaction_id: {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseTransaction',
        required: true
    },
    unit_price: {
        type: Number,
        required: true,
        default: 0.00
    },
    quantity: {
        type: Number,
        required: true
    },
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true })

const PurchasedItemsModel = models?.PurchasedItem || model('PurchasedItem', PurchasedItemsSchema)
export default PurchasedItemsModel
