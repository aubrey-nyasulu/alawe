import connectDB from "@/db/config/connectDB";
import UserModel from "@/db/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json()

    if (!username || !email || !password) return NextResponse.json('all fields are required', { status: 301 })

    try {
        connectDB()

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({ username, email, password: hashedPassword })

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log('error in resister post route', error)
        return NextResponse.json('some server error', { status: 500 })
    }

}