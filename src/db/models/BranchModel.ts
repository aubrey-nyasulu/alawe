import { models, Schema, model } from 'mongoose'

const BranchSchema = new Schema({
    address: {
        type: String,
        maxlength: 255
    },
    city: {
        type: String,
        maxlength: 50
    },
    branch_type: {
        type: String,
        required: [true, 'Branch type can not be empty']
    },
}, { timestamps: true })

const BranchModel = models?.Branch || model('Branch', BranchSchema)
export default BranchModel
