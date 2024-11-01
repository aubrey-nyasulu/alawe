import connectDB from "@/db/config/connectDB"
import { InvoiceModel } from "@/db/models"
import { FetchInvoicesById } from "@/lib/data"
import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {

    console.log("invoiceID", id)

    try {
        connectDB()
        const _id = new ObjectId(id)

        const data = await InvoiceModel.findById(id).populate('client_id')

        const invoice: FetchInvoicesById = {
            _id: data._id?.toString(),
            amount: data.amount / 100,
            client_id: {
                _id: data.client_id._id.toString(),
                name: data.client_id.name,
                contact: data.client_id.contact,
                email: data.client_id.email,
                address: data.client_id.address || ''
            },
            due_date: data.due_date.toString(),
            status: data.status,
        }

        return NextResponse.json(invoice)
    } catch (error) {

        return NextResponse.json('some server error', { status: 500 })
    }
}