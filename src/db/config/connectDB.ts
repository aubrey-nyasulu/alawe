import mongoose from 'mongoose'

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return
    }

    const URI = process.env.MONGO_URI

    console.log({ URI })

    if (!URI) throw new Error('Invalid or missing connection string')

    try {
        const res = await mongoose.connect(URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })

        console.log('MongoDB Connected', { res: res.Connection.name })
    } catch (error) {
        console.log('failed to connect to mongodb:', error)
    }
}

export default connectDB
