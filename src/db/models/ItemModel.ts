import { models, Schema, model } from 'mongoose'

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Item name cannot be empty']
    },
    type: {
        type: String,
        required: [true, 'Please provide a Item type']
    }
}, { timestamps: true })

const ItemModel = models?.Item || model('Item', ItemSchema)
export default ItemModel
