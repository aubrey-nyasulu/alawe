import { models, Schema, model } from 'mongoose'

const InventorySchema = new Schema({
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const InventoryModel = models?.Inventory || model('Inventory', InventorySchema)
export default InventoryModel
