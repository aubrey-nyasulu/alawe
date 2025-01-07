import { models, Schema, model } from 'mongoose'

const AdminAnalyticsSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    documents_read: {
        type: Number,
        required: true,
        default: 0
    },
    documents_written: {
        type: Number,
        required: true,
        default: 0,
    },
    operation_cost: {
        type: {
            deployement: Number,
            cloud_services: Number
        },
        default: {
            deployement: 0.00,
            cloud_services: 0.00
        },
    }
}, { timestamps: true })

const AdminAnalyticsModel = models?.AdminAnalytics || model('AdminAnalytics', AdminAnalyticsSchema)
export default AdminAnalyticsModel
