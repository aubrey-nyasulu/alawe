import { Model } from "mongoose";
import { Decimal128, ObjectId } from 'mongodb'
import bcrypt from "bcryptjs"

import sampleData from "@/dev/sampleData";
import errorHandler from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { Branch, Client, Employee, Item, Product, PurchasedItem, Revenue, TilaweDatabaseEntity } from "@/types";
import asyncHandler from "@/lib/asyncHandler";
import connectDB from "@/db/config/connectDB";
import {
    RevenueModel,
    InvoiceModel,
    BranchModel,
    SalaryModel,
    ClientModel,
    ItemModel,
    PaymentModel,
    PaymentMethodModel,
    ProductModel,
    SupplierModel,
    EmployeeModel,
    InventoryModel,
    ProductSoldModel,
    PurchasedItemsModel,
    PurchaseTransactionModel,
    SalesTransactionModel,
    UserRoleModel
} from '@/db/models';
import UserModel from "@/db/models/UserModel";
import TempEmployeeModel from "@/db/models/TempEmployeeModel";
import { months, years } from "@/lib/utils";


export async function GET(req: NextRequest) {

    try {
        connectDB()

        const res = await SeedDataBase()

        if (res.ok) {
            return NextResponse.json({ message: res.message })
        }
        else {
            return NextResponse.json({ message: res.message }, { status: 303 })
        }

    } catch (error) {
        errorHandler(error, '', '', '',)
        console.log('error in API text route', error)

        return NextResponse.json(
            { error: 'some server error' },
            { status: 500 }
        )
    }

}


export async function POST(req: NextRequest) {

    try {
        connectDB()

        const res = await SeedDataBase()

        if (res.ok) {
            return NextResponse.json({ message: res.message })
        }
        else {
            return NextResponse.json({ message: res.message }, { status: 303 })
        }

    } catch (error) {
        errorHandler(error, '', '', '',)
        console.log('error in API text route', error)

        return NextResponse.json(
            { error: 'some server error' },
            { status: 500 }
        )
    }

}

async function SeedDataBase() {
    console.log('including temp user')
    try {
        let res = await populateUserRoles()
        if (!res) throw new Error('failed to populate user roles')

        res = await populateBranches()
        if (!res) throw new Error('failed to populate branches')

        res = await populateSalaries()
        if (!res) throw new Error('failed to populate salaries')

        res = await populateClients()
        if (!res) throw new Error('failed to populate clients')

        res = await populateSuppliers()
        if (!res) throw new Error('failed to populate suppliers')

        res = await populateItems()
        if (!res) throw new Error('failed to populate items')

        res = await populateProducts()
        if (!res) throw new Error('failed to populate products')

        res = await populatePaymentMethods()
        if (!res) throw new Error('failed to populate payment methods')

        res = await populateInvoices()
        if (!res) throw new Error('failed to populate invoices')

        res = await populateSalesTransactions()
        if (!res) throw new Error('failed to populate transactions')

        res = await populateProductsSold()
        if (!res) throw new Error('failed to populate products sold')

        res = await populatePurchaseTransactions()
        if (!res) throw new Error('failed to populate purchase transactions')

        res = await populatePurchaseItems()
        if (!res) throw new Error('failed to populate purchased items')

        res = await populatePayments()
        if (!res) throw new Error('failed to populate payments')

        res = await populateInventory()
        if (!res) throw new Error('failed to populate inventory')

        res = await populateRevenue()
        if (!res) throw new Error('failed to populate revenue')

        res = await populateEmployees()
        if (!res) throw new Error('failed to populate employees')
        // await TempEmployeeModel.find()

        return { ok: true, message: 'seeding successfull' }
    } catch (error: any) {
        console.log('errors while seeding', error)

        return { ok: false, message: 'Some errors during seeding .' + error.message }
    }

}

const { branches, salaries, clients, employees, inventory, invoices, items, payments, paymentMethods, products, productsSold, salesTransactions, purchaseTransactions, suppliers, UserRoles
} = sampleData

async function populateBranches() {
    try {
        const data = await BranchModel.insertMany(branches)

        return true
    } catch (error) {

        return false
    }
}

async function populateSalaries() {
    try {
        const data = await SalaryModel.insertMany(salaries)

        return true
    } catch (error) {

        return false
    }
}

async function populateClients() {
    try {
        const data = await ClientModel.insertMany(clients)

        return true
    } catch (error) {

        return false
    }
}

async function populateSuppliers() {
    try {
        const data = await SupplierModel.insertMany(suppliers)

        return true
    } catch (error) {

        return false
    }
}

async function populateUserRoles() {
    try {
        const data = await UserRoleModel.insertMany(UserRoles)

        return true
    } catch (error) {

        return false
    }
}

async function populateItems() {
    try {
        const data = await ItemModel.insertMany(items)

        return true
    } catch (error) {

        return false
    }
}

async function populateProducts() {
    try {
        const data = await ProductModel.insertMany(products)

        return true
    } catch (error) {

        return false
    }
}

async function populatePaymentMethods() {
    try {
        const data = await PaymentMethodModel.insertMany(paymentMethods)

        return true
    } catch (error) {

        return false
    }
}

async function populateInventory() {
    try {
        const branches: Branch[] = await BranchModel.find()
        const products: Product[] = await ProductModel.find()

        for (let branch of branches) {
            for (let product of products) {
                const randomQuantity = generateRandomNumber(1000, 20000)

                const newInventoryItem = { product_id: new ObjectId(product._id), quantity: randomQuantity, branch_id: new ObjectId(branch._id), }

                const res = await InventoryModel.create(newInventoryItem)
            }

        }

        return true
    } catch (error) {
        return false
    }
}

async function populateSalesTransactions() {
    try {
        for (let salesTransaction of salesTransactions) {

            const { purchase_total } = salesTransaction

            const branch_id = await randomID(BranchModel)

            const newSalesTransaction = { branch_id, purchase_total }

            const res = await SalesTransactionModel.create(newSalesTransaction)
        }

        return true
    } catch (error) {

        return false
    }
}

async function populateProductsSold() {
    try {
        for (let productSold of productsSold) {

            const { quantity, unit_price } = productSold

            const product_id = await randomID(ProductModel)
            const sales_transaction_id = await randomID(SalesTransactionModel)

            const newSalesTransaction = { product_id, quantity, sales_transaction_id, unit_price }

            const res = await ProductSoldModel.create(newSalesTransaction)
        }

        return true
    } catch (error) {

        return false
    }
}

async function populatePurchaseTransactions() {
    try {
        for (let purchaseTransaction of purchaseTransactions) {

            const { purchase_total } = purchaseTransaction

            const supplier_id = await randomID(SupplierModel)

            const newPurchaseTransaction = { purchase_total, supplier_id }

            const res = await PurchaseTransactionModel.create(newPurchaseTransaction)

        }

        return true
    } catch (error) {

        return false
    }
}

async function populatePurchaseItems() {
    try {
        // const Items: Item[] = await PurchasedItemsModel.find()

        // for (let year of years) {
        for (let month of months) {
            for (let Item of items) {
                const { _id } = await ItemModel.findOne().where({ name: Item.name })

                const { price } = Item
                const ranPrice = generateRandomNumber((price - (price * 0.1)), price + (price * 0.1))

                const quantity = price < 1000000
                    ? generateRandomNumber(50, 100)
                    : price < 10000000
                        ? generateRandomNumber(15, 30)
                        : generateRandomNumber(5, 10)

                const purchase_transaction_id = await randomID(PurchaseTransactionModel)

                // const purchasedItem: PurchasedItem = {
                //     item_id: _id  as string,
                //     unit_price: ranPrice,
                //     month,
                //     purchase_transaction_id,
                //     quantity
                // }

                const item_id = await randomID(ItemModel)

                const res = await PurchasedItemsModel.create({
                    item_id: _id as string,
                    unit_price: ranPrice,
                    month,
                    purchase_transaction_id,
                    quantity,
                    year: "2024"
                })

            }

        }
        // }

        return true
    } catch (error) {

        return false
    }
}

async function populatePayments() {
    try {
        for (let payment of payments) {

            const { amount, payments } = payment

            const client_id = await randomID(ClientModel)
            const invoice_id = await randomID(InvoiceModel)
            const payment_method_id = await randomID(PaymentMethodModel)

            const newPayment = { amount, payments, client_id, invoice_id, payment_method_id }

            const res = await PaymentModel.create(newPayment)

        }

        return true
    } catch (error) {

        return false
    }
}

async function populateEmployees() {
    try {
        const UserRoles = await UserRoleModel.find()

        let i = 0
        for (let employee of employees) {

            const { firstname, lastname, email } = employee

            const branch_id = await randomID(BranchModel)

            type SchemaEmployeeType = {
                [K in keyof Employee]: K extends "branch_id" ? ObjectId : Employee[K]
            }
            const newEmployee: SchemaEmployeeType = { firstname, lastname, email, branch_id: branch_id as ObjectId }

            const hashedPassword = await bcrypt.hash("1234", 10)

            if (i < UserRoles.length) {
                await UserModel.create({
                    username: firstname + ' ' + lastname,
                    email,
                    password: hashedPassword,
                    role: UserRoles[i]._id
                })

                newEmployee.job_title = UserRoles[i]._id
            }

            const res = await EmployeeModel.create(newEmployee)

            i++
        }

        return true
    } catch (error) {
        console.log('error in populate employees:', error)

        return false
    }
}

// branch_id
// month
// year
// amount


async function populateRevenue() {
    try {
        const branches: Branch[] = await BranchModel.find()
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()

        for (let year of years) {
            for (let branch of branches) {

                for (let month of months) {
                    if (currentYear === Number(year) && currentMonth === months.findIndex(mon => mon === month)) break

                    const amount = generateRandomNumber(100000000, 1000000000)
                    const revenue: Revenue = { branch_id: branch._id as string, year, month, amount }
                    const data = await RevenueModel.insertMany(revenue)
                }
            }
        }

        return true
    } catch (error) {

        return false
    }
}

async function populateInvoices() {
    try {
        const clients: Client[] = await ClientModel.find()

        for (let i = 0; i <= 3; i++) {
            for (let client of clients) {

                const amount = generateRandomNumber(2000000, 100000000)
                const due_date = generateRandomDate(2020, 2024)
                const status = ['pending', 'paid'][Math.floor(Math.random() * 2)]

                const newInvoice = { client_id: client._id, amount, due_date, status }


                const res = await InvoiceModel.create(newInvoice)
            }
        }

        return true
    } catch (error) {

        return false
    }
}

type ModelProp = Model<any, {}, {}, {}, any, any>
async function randomID(Model: ModelProp) {
    const data = await Model.find()
    let id: ObjectId | null = null
    if (data.length) {
        let randomIndex = Math.floor(Math.random() * data.length)
        id = data[randomIndex]._id
    }
    return id
}

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDate(startYear: number, endYear: number) {
    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31);

    const timeDifference = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDifference + startDate.getTime();

    return new Date(randomTime);
}
