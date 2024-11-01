import connectDB from "@/db/config/connectDB"
import { BranchModel } from "@/db/models"
import { Branch } from "@/types"
import { unstable_noStore as noStore } from "next/cache"

export async function getCities() {
    noStore()

    try {
        connectDB()
        const data: Branch[] = await BranchModel.find().distinct('city')

        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}