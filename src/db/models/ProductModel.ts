import { models, Schema, model } from 'mongoose'

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    type: {
        type: String,
        required: [true, 'Please provide a product type']
    },
}, { timestamps: true })

const ProductModel = models?.Product || model('Product', ProductSchema)
export default ProductModel
