import { models, Schema, model } from 'mongoose'

const ProcurementExpenditureSchema = new Schema({
    year: {
        type: Date,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0.00
    },
    on: {
        type: String,
        required: true
    },
}, { timestamps: true })

const ProcurementExpenditureModel = models?.ProcurementExpenditure || model('ProcurementExpenditure', ProcurementExpenditureSchema)
export default ProcurementExpenditureModel
