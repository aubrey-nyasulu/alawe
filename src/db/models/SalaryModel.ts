import { Schema, model, models } from 'mongoose'

const SalarySchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
}, { timestamps: true })

const SalaryModel = models?.Salary || model('Salary', SalarySchema)

export default SalaryModel