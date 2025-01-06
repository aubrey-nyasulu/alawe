import { models, Schema, model } from 'mongoose'

const ExpenditureSchema = new Schema({
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

const ExpenditureModel = models?.Expenditure || model('Expenditure', ExpenditureSchema)
export default ExpenditureModel
