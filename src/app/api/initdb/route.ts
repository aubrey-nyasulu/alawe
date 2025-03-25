import { Model } from "mongoose";
import { Decimal128, ObjectId } from 'mongodb'
import bcrypt from "bcryptjs"

import sampleData from "@/dev/sampleData";
import errorHandler from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { Branch, Client, Employee, Item, Product, PurchasedItem, Revenue, TilaweDatabaseEntity } from "@/types";
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
import BudgetModel from "@/db/models/BudgetModel";
import ExpenditureModel from "@/db/models/ExpenditureModel";
import ProcurementExpenditureModel from "@/db/models/ProcurementExpenditureModel";
import OrdersModel from "@/db/models/OrdersModel";
import AdminAnalyticsModel from "@/db/models/AdminAnalyticsModel";


export async function GET(req: NextRequest) {

    try {
        connectDB()

        return NextResponse.json({ message: 'eary return. no seeding happened' })

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

        return NextResponse.json({ message: 'eary return. no seeding happened' })

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

export async function PUT(req: NextRequest) {
    return NextResponse.json({ message: 'eary return. no seeding happened' })

    try {
        connectDB()

        let res = await populateAdminAnalytics()
        if (!res) throw new Error('failed to populate Admin Analytics')

        return NextResponse.json('successfull')
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
    try {
        let res = await populateUserRoles()
        if (!res) throw new Error('failed to populate user roles')

        res = await populateBranches()
        if (!res) throw new Error('failed to populate branches')

        res = await populateBudgets()
        if (!res) throw new Error('failed to populate budgets')

        res = await populateExpenditures()
        if (!res) throw new Error('failed to populate budgets')

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

        res = await populateProcurementExpenditures()
        if (!res) throw new Error('failed to populate purchase ProcurementExpenditures')

        res = await populatePayments()
        if (!res) throw new Error('failed to populate payments')

        res = await populateInventory()
        if (!res) throw new Error('failed to populate inventory')

        res = await populateRevenue()
        if (!res) throw new Error('failed to populate revenue')

        res = await populateEmployees()
        if (!res) throw new Error('failed to populate employees')

        res = await populateOrders()
        if (!res) throw new Error('failed to populate Orders')

        res = await populateAdminAnalytics()
        if (!res) throw new Error('failed to populate Admin Analytics')

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

async function populateBudgets() {
    try {
        const branches: Branch[] = await BranchModel.find().distinct('city')
        const currentYear = new Date().getFullYear()
        const budgetsToInsert = []
        console.log({ branches })

        for (let year of years) {
            for (let branch of branches) {
                if (currentYear === Number(year)) break
                const amount = generateRandomNumber(5497458099, 8797458099)
                const budget = { branch, year, amount }
                budgetsToInsert.push(budget)
            }
        }

        await BudgetModel.insertMany(budgetsToInsert)

        return true
    } catch (error) {

        return false
    }
}

async function populateExpenditures() {
    try {
        const branches: Branch[] = await BranchModel.find().distinct('city')
        const currentYear = new Date().getFullYear()
        const expendituresToInsert = []
        console.log({ branches })

        for (let year of years) {
            for (let branch of branches) {
                if (currentYear === Number(year)) break
                const amount = generateRandomNumber(5497458099, 8797458099)
                const budget = { branch, year, amount }
                expendituresToInsert.push(budget)
            }
        }

        await ExpenditureModel.insertMany(expendituresToInsert)

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
        console.log('populate user roles error', { error })

        return false
    }
}

async function populateAdminAnalytics() {
    try {
        const adminAnalyticsToInsert = []

        for (let year of years) {
            for (let month of months) {
                const documents_read = generateRandomNumber(5000, 15000)
                const documents_written = generateRandomNumber(2500, 7500)
                const deployement = generateRandomNumber(
                    (documents_read * documents_written),
                    (documents_read * documents_written)
                )
                const cloud_services = generateRandomNumber(
                    (documents_read * documents_written * 1.5),
                    (documents_read * documents_written * 2 * 2)
                )

                const newAnalytic = {
                    year,
                    month,
                    documents_read,
                    documents_written,
                    operation_cost: {
                        deployement,
                        cloud_services
                    }
                }

                adminAnalyticsToInsert.push(newAnalytic)
            }
        }

        await AdminAnalyticsModel.insertMany(adminAnalyticsToInsert)

        return true
    } catch (error) {
        console.log('populate user roles error', { error })

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
        const data = await ProductModel.insertMany(products.map(({ name, type, category, price }) => ({ name, type, category, price })))

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
        const Products: Product[] = await ProductModel.find()
        const inventoryToInset = []

        for (let year of years) {
            for (let month of months) {
                for (let branch of branches) {
                    for (let product of Products) {
                        const randomQuantity = generateRandomNumber(0, 250)

                        if (randomQuantity < 100) continue

                        const { appreciated, percentage } = appreciate(month, year)

                        const prod = products.find(p => p.name === product.name)

                        const productPrice = prod?.price

                        if (!productPrice) continue

                        const price = appreciated
                            ? productPrice + ((productPrice % percentage) / 100)
                            : productPrice

                        const newInventoryItem = {
                            product_id: new ObjectId(product._id),
                            quantity: randomQuantity,
                            branch_id: new ObjectId(branch._id),
                            year,
                            month,
                            price
                        }

                        inventoryToInset.push(newInventoryItem)
                    }
                }
            }
        }

        await InventoryModel.insertMany(inventoryToInset)
        return true
    } catch (error) {
        return false
    }
}

async function populateSalesTransactions() {
    try {
        const branches = await BranchModel.find()
        const salesTransactionsToInsert = []
        for (let salesTransaction of salesTransactions) {

            const { purchase_total } = salesTransaction

            const branch_id = await randomID(branches)

            const newSalesTransaction = { branch_id, purchase_total }

            salesTransactionsToInsert.push(newSalesTransaction)
        }

        await SalesTransactionModel.insertMany(salesTransactionsToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populateProductsSold() {
    try {
        const products = await ProductModel.find()
        const salesTransactions = await SalesTransactionModel.find()
        const productsSoldToInsert = []

        for (let productSold of productsSold) {

            const { quantity, unit_price } = productSold

            const product_id = await randomID(products)
            const sales_transaction_id = await randomID(salesTransactions)

            const newSalesTransaction = { product_id, quantity, sales_transaction_id, unit_price }

            productsSoldToInsert.push(newSalesTransaction)
        }

        await ProductSoldModel.insertMany(productsSoldToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populatePurchaseTransactions() {
    try {
        const suppliers = await SupplierModel.find()
        const purchaseTransactionsToInsert = []

        for (let year of years) {
            for (let month of months) {
                for (let i = 0; i < 3; i++) {

                    const purchase_total = generateRandomNumber(500000000, 800000000)

                    const supplier_id = await randomID(suppliers)

                    const newPurchaseTransaction = { purchase_total, supplier_id, year, month }

                    purchaseTransactionsToInsert.push(newPurchaseTransaction)
                }
            }
        }

        await PurchaseTransactionModel.insertMany(purchaseTransactionsToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populatePurchaseItems() {
    try {
        const purchaseTransactions = await PurchaseTransactionModel.find()
        const purchaseItemsToInsert = []
        const Items = await ItemModel.find()

        for (let purchaseTransaction of purchaseTransactions) {
            let amount = Math.ceil(purchaseTransaction.purchase_total / 3)

            const ids: any[] = []

            for (let i = 0; i < 3;) {
                const _id = await randomID(Items)
                if (ids.includes(_id)) {
                    continue
                }

                i++

                ids.push(_id)

                const { name } = Items.find(Itm => Itm._id === _id)
                const item = items.find(itm => itm.name === name)
                const price = item?.price

                if (!price) return false

                const ranPrice = generateRandomNumber((price - (price * 0.1)), price + (price * 0.1))

                const quantity = Math.ceil(amount / price)

                const purchase_transaction_id = await randomID(purchaseTransactions)

                const newPurchasedItem = {
                    item_id: _id,
                    unit_price: ranPrice,
                    purchase_transaction_id,
                    quantity
                }

                purchaseItemsToInsert.push(newPurchasedItem)
            }
        }

        await PurchasedItemsModel.insertMany(purchaseItemsToInsert)
        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

async function populateProcurementExpenditures() {
    try {
        const suppliers = await SupplierModel.find()
        const purchaseTransactionsToInsert = []

        for (let year of years) {
            for (let month of months) {
                for (let i = 0; i < 3; i++) {

                    const amount = generateRandomNumber(5000000, 50000000)

                    const supplier_id = await randomID(suppliers)

                    const newPurchaseTransaction = { amount, year, month, on: 'transportation' }

                    purchaseTransactionsToInsert.push(newPurchaseTransaction)
                }
            }
        }

        await ProcurementExpenditureModel.insertMany(purchaseTransactionsToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populatePayments() {
    try {
        const clients = await ClientModel.find()
        const invoices = await InvoiceModel.find()
        const paymentModels = await PaymentMethodModel.find()
        const paymentsToInsert = []

        for (let payment of payments) {
            const { amount } = payment

            const client_id = await randomID(clients)
            const invoice_id = await randomID(invoices)
            const payment_method_id = await randomID(paymentModels)

            const newPayment = { amount, client_id, invoice_id, payment_method_id }

            paymentsToInsert.push(newPayment)
        }

        await PaymentModel.insertMany(paymentsToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populateEmployees() {
    try {
        const UserRoles = await UserRoleModel.find()
        const branches = await BranchModel.find()
        const employeesToInsert = []

        let i = 0
        for (let employee of employees) {

            const { firstname, lastname, email } = employee

            const branch_id = await randomID(branches)

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

            employeesToInsert.push(newEmployee)
            i++
        }

        await EmployeeModel.insertMany(employeesToInsert)
        return true
    } catch (error) {
        console.log('error in populate employees:', error)

        return false
    }
}

async function populateRevenue() {
    try {
        const branches: Branch[] = await BranchModel.find()
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const revenueToInsert = []

        for (let year of years) {
            for (let branch of branches) {
                for (let month of months) {
                    if (currentYear === Number(year) && currentMonth === months.findIndex(mon => mon === month)) break
                    const amount = generateRandomNumber(100000000, 1000000000)
                    const revenue: Revenue = { branch_id: branch._id as string, year, month, amount }
                    revenueToInsert.push(revenue)
                }
            }
        }

        await RevenueModel.insertMany(revenueToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populateInvoices() {
    try {
        const clients: Client[] = await ClientModel.find()
        const invoicesToInsert = []

        for (let i = 0; i <= 3; i++) {
            for (let client of clients) {

                const amount = generateRandomNumber(2000000, 100000000)
                const due_date = generateRandomDate(2020, 2024)
                const status = ['pending', 'paid'][Math.floor(Math.random() * 2)]

                const newInvoice = { client_id: client._id, amount, due_date, status }

                invoicesToInsert.push(newInvoice)
            }
        }

        await InvoiceModel.insertMany(invoicesToInsert)
        return true
    } catch (error) {

        return false
    }
}

async function populateOrders() {
    try {
        const clients: Client[] = await ClientModel.find()
        const invoicesToInsert = []

        for (let year of years) {
            for (let month of months) {
                const numberOfOrders = generateRandomNumber(100, 800)

                for (let i = 0; i <= numberOfOrders; i++) {
                    const id = await randomID(clients)
                    const ran = Math.floor(Math.random() * 100) < 90 ? 0 : 1
                    const status = ['fullfilled', 'unfullfilled'][ran]

                    const newInvoice = { client_id: id, status, year, month }

                    invoicesToInsert.push(newInvoice)
                }
            }
        }

        await OrdersModel.insertMany(invoicesToInsert)
        return true
    } catch (error) {

        return false
    }
}

type ModelProp = Model<any, {}, {}, {}, any, any>
async function randomID(data: any[]) {
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

function appreciate(month: string, year: string) {
    let appreciated = false
    let percentage = 1

    if (year === '2020') {
        if (month === 'jun') {
            appreciated = true
            percentage = 1.7
        } else if (month === 'nov') {
            appreciated = true
            percentage = 2.5
        }
    }

    if (year === '2021') {
        if (month === 'jun') {
            appreciated = true
            percentage = 3.1
        } else if (month === 'nov') {
            appreciated = true
            percentage = 4.5
        }
    }

    if (year === '2022') {
        if (month === 'jun') {
            appreciated = true
            percentage = 4.9
        } else if (month === 'nov') {
            appreciated = true
            percentage = 6.2
        }
    }

    if (year === '2023') {
        if (month === 'jun') {
            appreciated = true
            percentage = 8.4
        } else if (month === 'nov') {
            appreciated = true
            percentage = 9.5
        }
    }

    if (year === '2023') {
        if (month === 'jun') {
            appreciated = true
            percentage = 10.3
        } else if (month === 'nov') {
            appreciated = true
            percentage = 13.5
        }
    }

    return {
        appreciated,
        percentage
    }
}