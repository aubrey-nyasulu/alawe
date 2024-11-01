import { models, Schema, model } from 'mongoose'

const ProductSoldSchema = new Schema({
    sales_transaction_id: {
        type: Schema.Types.ObjectId,
        ref: 'SalesTransaction',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true,
        default: 0.00
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true })

const ProductSoldModel = models?.ProductSold || model('ProductSold', ProductSoldSchema)
export default ProductSoldModel
