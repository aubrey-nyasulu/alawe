import { models, Schema, model } from 'mongoose'

const SupplierSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Supplier name is required']
    },
    contact: {
        type: String,
        required: [true, 'Contact information is required'],
    },
    address: {
        type: String,
        maxlength: 255
    }
}, { timestamps: true })

const SupplierModel = models?.Supplier || model('Supplier', SupplierSchema)
export default SupplierModel
