import connectDB from "@/db/config/connectDB"
import PassIdModel from "@/db/models/PassIdModel"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        connectDB()

        const data = await req.json()

        const { value } = data

        if (!value) return NextResponse.json({ isValid: false, message: 'the value field can never be empty' })

        if (typeof value !== 'string') return NextResponse.json({ isValid: false, message: 'value filed should be a string' })


        let res = await PassIdModel.find().where({ value })

        if (res.length) {
            return NextResponse.json({ isValid: true, message: 'verification complee' })
        } else {
            return NextResponse.json({ isValid: false, message: 'key passed is invalid' })
        }
    } catch (error) {
        console.log('some error occured while creating a passId', { error })

        return NextResponse.json({ isValid: false, message: 'some error occured' })
    }
}
