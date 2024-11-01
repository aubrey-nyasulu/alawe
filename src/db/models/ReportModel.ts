import { models, Schema, model } from 'mongoose'

const ReportSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    documentName: {
        type: String,
        required: [true, 'documentName cannot be empty']
    },
    downloadableUrl: {
        type: String,
        required: [true, 'downloadable url can never be empty']
    },
}, { timestamps: true })

const ReportModel = models?.Report || model('Report', ReportSchema)
export default ReportModel