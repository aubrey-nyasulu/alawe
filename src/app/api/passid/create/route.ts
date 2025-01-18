import connectDB from "@/db/config/connectDB"
import PassIdModel from "@/db/models/PassIdModel"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        connectDB()

        const data = await req.json()

        const { issuesdTo, password } = data

        if (!issuesdTo || password !== 'AlawePassID') return NextResponse.json('Failed, check your credenials and then try again')

        const value = generateRandomString()

        let res = await PassIdModel.create({
            value,
            issuesdTo,
        })

        return NextResponse.json(res)
    } catch (error) {
        console.log('some error occured while creating a passId', { error })

        return NextResponse.json('some error occured')
    }
}

function generateRandomString(length = 24) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        result += chars[randomIndex]
    }

    return result
}
