import { InventoryModel, InvoiceModel } from "@/db/models";
import TempEmployeeModel from "@/db/models/TempEmployeeModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tempEmployees = await TempEmployeeModel.find()

        return NextResponse.json(tempEmployees, { status: 201 })
    } catch (error) {

        return NextResponse.json('some server error', { status: 500 })
    }
}