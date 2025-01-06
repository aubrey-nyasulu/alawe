import { models, Schema, model } from 'mongoose'

const BudgetSchema = new Schema({
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0.00
    }
}, { timestamps: true })

const BudgetModel = models?.Budget || model('Budget', BudgetSchema)
export default BudgetModel
