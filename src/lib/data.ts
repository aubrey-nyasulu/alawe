import {
    Branch, Client, Employee, Invoice, Inventory, Item, PaymentMethod, Payment, Product, ProductSold, PurchasedItem, PurchaseTransaction, Supplier, Revenue, SalesTransaction,
    Salary,
    Report,
    User
} from '@/types'
import { calculatePercentage, capitalise, deepClone, formatCurrency, formatDateToLocal } from './utils'
import { unstable_noStore as noStore } from 'next/cache'
import RevenueModel from '../db/models/RevenueModel'
import InvoiceModel from '../db/models/InvoiceModel'
import ClientModel from '../db/models/ClientModel'
import { ObjectId } from 'mongodb'
import { BranchModel, EmployeeModel, InventoryModel, PaymentMethodModel, ProductModel, ProductSoldModel, PurchasedItemsModel, PurchaseTransactionModel, SalesTransactionModel, SupplierModel } from '../db/models'
import SalaryModel from '../db/models/SalaryModel'
import connectDB from '../db/config/connectDB'
import UserModel from '@/db/models/UserModel'
import ReportModel from '@/db/models/ReportModel'
import BudgetModel from '@/db/models/BudgetModel'
import ExpenditureModel from '@/db/models/ExpenditureModel'
import ProcurementExpenditureModel from '@/db/models/ProcurementExpenditureModel'
import OrdersModel from '@/db/models/OrdersModel'
import AdminAnalyticsModel from '@/db/models/AdminAnalyticsModel'

export type FetchRevenueReturnType = {
    [K in keyof Revenue]: K extends 'revenue' ? string : Revenue[K]
}
export async function fetchRevenue(query: string, year = "2024",): Promise<any[]> {
    noStore()

    try {
        connectDB()

        const regex = new RegExp(query, 'i')
        const regex2 = new RegExp(year, 'i')

        const data: Revenue[] = await RevenueModel.find(({
            $expr: { $eq: [{ $year: "$year" }, year] }
        }))

        return data.map(({ _id, month, amount, city }) => (
            {
                _id: _id?.toString(),
                // month: formatDateToLocal(month),
                month,
                revenue: amount,
                city
            }
        )).sort((reva, revb) => reva.month > revb.month ? 1 : 0)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch revenue data.')
    }
}

export type FetchLatestInvoicesReturnType = { amount: string, client: Client, status: "paid" | "pending" }

export type PopulatedInvoice = {
    [K in keyof Invoice]: K extends 'client_id' ? Client : Invoice[K]
}
export async function fetchLatestInvoices(): Promise<FetchLatestInvoicesReturnType[]> {
    noStore()

    try {
        connectDB()
        await ClientModel.find()
        const data: PopulatedInvoice[] =
            await InvoiceModel
                .find()
                .limit(5)
                .populate('client_id')
                .sort({ due_date: "desc" })

        const latestInvoices =
            data.map(({ amount, client_id: client, status }) => ({
                client,
                status,
                amount: formatCurrency(amount as number),
            }))

        return latestInvoices
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchCardData() {
    noStore()

    try {
        connectDB()

        const invoiceCountPromise = InvoiceModel.countDocuments()

        const clientCountPromise = ClientModel.countDocuments()

        const inventoryStatusPromise: Promise<{ paid: number, pending: number, total: number }> =
            (async () => {
                let totalMeatProducts: Invoice[] | number = await InvoiceModel.find().where('status').equals('paid')

                let totalGroceries: Invoice[] | number = await InvoiceModel.find().where('status').equals('pending')

                totalMeatProducts = totalMeatProducts.reduce((sum: number, invoice: Invoice) => {
                    const amount = Number(invoice.amount)
                    return sum + amount
                }, 0)

                totalGroceries = totalGroceries.reduce((sum: number, invoice: Invoice) => {
                    const amount = Number(invoice.amount)
                    return sum + amount
                }, 0)

                return { paid: totalMeatProducts, pending: totalGroceries, total: totalMeatProducts + totalGroceries }
            })()

        const data = await Promise.all([
            invoiceCountPromise,
            clientCountPromise,
            inventoryStatusPromise,
        ])

        const numberOfInvoices = Number(data[0] ?? '0')
        const numberOfCustomers = Number(data[1] ?? '0')
        const totalPaidInvoices = formatCurrency(data[2].paid ?? '0')
        const totalPendingInvoices = formatCurrency(data[2].pending ?? '0')
        const total = formatCurrency(data[2].total ?? '0')

        const paidPercentage = Math.floor((data[2].paid * 100) / data[2].total)
        const pendingPercentage = Math.ceil((data[2].pending * 100) / data[2].total)

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
            total,
            paidPercentage,
            pendingPercentage
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch card data.')
    }
}

export async function someFecth({ year, city }: { city?: string, year: string }) {
    noStore()

    city = city || ''

    const regex = new RegExp(city, 'i')

    try {
        connectDB()

        const revenue = await RevenueModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$year" } },
                }
            },
            { $match: { year } },
            {
                $lookup: {
                    from: 'branches',  // The name of the Branch collection
                    localField: 'branch_id',
                    foreignField: '_id',
                    as: 'branch_info'
                }
            },
            { $unwind: '$branch_info' },
            { $project: { city: '$branch_info.city', amount: 1, year: 1 } },
            {
                $match: {
                    $or: [
                        { city: { $regex: regex } },
                    ]
                }
            },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ])

        const budget = await BudgetModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$year" } },
                }
            },
            { $match: { year } },
            { $project: { city: '$branch', amount: 1 } },
            {
                $match: {
                    $or: [
                        { city: { $regex: regex } },
                    ]
                }
            },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ])

        const expenditure = await ExpenditureModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$year" } },
                }
            },
            { $match: { year } },
            { $project: { city: '$branch', amount: 1 } },
            {
                $match: {
                    $or: [
                        { city: { $regex: regex } },
                    ]
                }
            },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ])

        return {
            budget: Number(budget[0].amount || 0),
            expenditure: Number(expenditure[0].amount || 0),
            revenue: Number(revenue[0]?.amount || 0)
        }
    } catch (error) {
        console.log('some error')
        throw new Error('Failed to fetch data.')
    }
}

export async function fetchCities() {
    noStore()

    try {
        connectDB()
        const data = await BranchModel.find().distinct('city')

        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchAdminAnalytics({ year }: { year: string }) {
    noStore()

    try {
        connectDB()

        const usageAnalytics = await AdminAnalyticsModel.aggregate([
            {
                $match: { year }
            },
            {
                $group: {
                    _id: null,
                    total_documents_read: { $sum: '$documents_read' },
                    total_documents_written: { $sum: '$documents_written' },
                }
            }
        ])

        const chartdata = await AdminAnalyticsModel.aggregate([
            {
                $match: { year }
            },
            {
                $project: {
                    _id: 0,
                    date: '$month',
                    deployement: '$operation_cost.deployement',
                    cloud_services: '$operation_cost.cloud_services',
                }
            }
        ])

        console.log('fugure', chartdata)

        return {
            usageAnalytics: usageAnalytics[0],
            chartdata
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchShopManagerAnalytics() {
    noStore()

    try {
        connectDB()
        const totalInvoices = await InvoiceModel.find().countDocuments()
        const totalSalesTransactions = await SalesTransactionModel.find().countDocuments()

        return {
            totalInvoices,
            totalSalesTransactions
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchProcurementManagerAnalytics({ year }: { year: string }) {
    noStore()

    try {
        connectDB()
        let topSuppliers = await PurchaseTransactionModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$year" } },
                }
            },
            { $match: { year } },
            {
                $group: {
                    _id: '$supplier_id', totalTransactions: { $count: {} }
                }
            },
            { $sort: { 'totalTransactions': -1 } },
            { $limit: 8 },
            {
                $lookup: {
                    from: 'suppliers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'supplier_info'
                }
            },
            { $unwind: '$supplier_info' },
        ])

        topSuppliers = topSuppliers.map(({ totalTransactions, supplier_info }) => (
            {
                totalTransactions,
                name: supplier_info.name
            }
        ))

        const topItems = await PurchasedItemsModel.aggregate([
            {
                $lookup: {
                    from: 'purchasetransactions',
                    localField: 'purchase_transaction_id',
                    foreignField: '_id',
                    as: 'purchasetransaction_info'
                }
            },
            { $unwind: '$purchasetransaction_info' },
            {
                $addFields: {
                    month: { $dateToString: { format: "%M", date: "$purchasetransaction_info.year" } },
                    year: { $dateToString: { format: "%Y", date: "$purchasetransaction_info.year" } },
                }
            },
            { $match: { year } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_info'
                }
            },
            { $unwind: '$item_info' },
            {
                $project: {
                    unit_price: 1,
                    item_name: '$item_info.name',
                    category: '$item_info.type'
                }
            },
            {
                $group: {
                    _id: '$item_name',
                    quantity: { $count: {} },
                    avg_price: { $avg: '$unit_price' },
                    categories: { $addToSet: '$category' }
                }
            },
            {
                $project: {
                    avg_price: 1,
                    item_name: '$_id',
                    category: { $arrayElemAt: ['$categories', 0] },
                    quantity: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    avg_price: -1,
                    quantity: -1,
                }
            },
            {
                $limit: 8
            }
        ])

        const expenditures = await PurchasedItemsModel.aggregate([
            {
                $lookup: {
                    from: 'purchasetransactions',
                    localField: 'purchase_transaction_id',
                    foreignField: '_id',
                    as: 'purchasetransaction_info'
                }
            },
            { $unwind: '$purchasetransaction_info' },
            {
                $addFields: {
                    month: { $dateToString: { format: "%M", date: "$purchasetransaction_info.year" } },
                    year: { $dateToString: { format: "%Y", date: "$purchasetransaction_info.year" } },
                }
            },
            { $match: { year } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_info'
                }
            },
            { $unwind: '$item_info' },
            { $project: { total_amount: { $multiply: ['$unit_price', '$quantity'] }, item_type: '$item_info.type' } },
            { $group: { _id: '$item_type', total_spent: { $sum: '$total_amount' } } }
        ])

        const transportationExpenditures = await ProcurementExpenditureModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            { $match: { year } },
            { $group: { _id: '$on', total_spent: { $sum: '$amount' } } }
        ])

        console.log({
            expenditures: formatCurrency(expenditures[0].total_spent),
            transportationExpenditures: formatCurrency(transportationExpenditures[0].total_spent)
        })

        return {
            topSuppliers,
            expenditures: [
                ...expenditures,
                ...transportationExpenditures
            ],
            topItems
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchLatestPurchaseTransaction() {
    noStore()

    try {
        connectDB()
        let latestPurchaseTransaction = await PurchaseTransactionModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$year" } },
                }
            },
            { $match: { year: '2024' } },
            { $limit: 16 },
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplier_id',
                    foreignField: '_id',
                    as: 'supplier_info'
                }
            },
            {
                $unwind: '$supplier_info'
            }, {
                $project: { supplier_name: '$supplier_info.name', purchase_total: 1, month: 1 }
            }
        ])

        latestPurchaseTransaction = latestPurchaseTransaction.map(({ _id, supplier_name, purchase_total, month }) => ({ _id: _id.toString(), supplier_name, purchase_total, month }))

        console.log({ latestPurchaseTransaction })

        return latestPurchaseTransaction
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchSupplyChainManagerAnalytics({ year }: { year: string }) {
    noStore()

    try {
        connectDB()

        const { expenditures } = await fetchProcurementManagerAnalytics({ year })

        console.log({ expenditures })

        const total_expenditure = expenditures.reduce((acc, expenditures) => acc + expenditures.total_spent, 0)

        let beginningInventory = await InventoryModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            { $match: { year } },
            { $match: { month: 'Jan' } },
            { $project: { total_amount: { $multiply: ['$quantity', '$price'] } } },
            { $group: { _id: null, total: { $sum: '$total_amount' } } }
        ])

        let endingInventory = await InventoryModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            { $match: { year } },
            { $match: { month: 'Dec' } },
            { $project: { total_amount: { $multiply: ['$quantity', '$price'] } } },
            { $group: { _id: null, total: { $sum: '$total_amount' } } }
        ])

        const avg_inventory = (beginningInventory[0].total + endingInventory[0].total) / 2

        return {
            const_of_goods_sold: total_expenditure,
            avg_inventory: avg_inventory,
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const monthNameToMonthIndex = (query: string) => {
    if (query.length < 1) return -1
    let compareReturn = months
        .findIndex(value => {
            return value
                .toLowerCase()
                .includes(query.toLowerCase())
        })


    if (compareReturn !== -1) compareReturn += 1

    return compareReturn
}

const isMonth = (query: string) => {
    if (query.length < 1) return false
    if (monthNameToMonthIndex(query) !== -1) return true

    return false
}

const ITEMS_PER_PAGE = 8
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ClientModel.find()

        const regex = new RegExp(query, 'i')
        const regex2 = isMonth(query) ? new RegExp((monthNameToMonthIndex(query).toString()), 'i') : null

        // Build the search query with proper checks for different field types
        const invoices = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: 'clients',  // The name of the Client collection
                    localField: 'client_id',
                    foreignField: '_id',
                    as: 'client_info'
                }
            },
            { $unwind: '$client_info' },  // Unwind the client_info array
            {
                $addFields: {
                    client_id: '$client_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$due_date" } },  // Extract year from due_date
                    month: { $dateToString: { format: "%m", date: "$due_date" } }, // Extract month from due_date
                    day: { $dateToString: { format: "%d", date: "$due_date" } }    // Extract day from due_date (if needed)
                }
            },
            {
                $match: {
                    $or: [
                        { 'client_id.firstname': { $regex: regex } },
                        { 'client_id.lastname': { $regex: regex } },
                        { 'client_id.email': { $regex: regex } },
                        { 'client_id.address': { $regex: regex } },
                        { status: { $regex: regex } },
                        { year: { $regex: regex } },   // Search by year
                        { month: { $regex: regex2 || regex } },  // Search by month
                        { day: { $regex: regex } }     // Optional: Search by day if needed
                    ]
                }
            },
            { $sort: { due_date: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        const formatedInvoices = invoices.map((invoice) => {
            return {
                ...invoice,
                _id: invoice?._id?.toString() || '',
                due_date: invoice?.due_date?.toString() || null
            }
        })

        // console.log({ formatedInvoices })

        return deepClone(formatedInvoices)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoices.')
    }
}

export async function fetchInvoicesPages(query: string) {
    noStore()

    try {
        await connectDB()
        await ClientModel.find()

        const regex = new RegExp(query, 'i')
        const regex2 = isMonth(query) ? new RegExp((monthNameToMonthIndex(query).toString()), 'i') : null

        const totalDocuments = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: 'clients',  // The name of the Client collection
                    localField: 'client_id',
                    foreignField: '_id',
                    as: 'client_info'
                }
            },
            { $unwind: '$client_info' },  // Unwind the client_info array
            {
                $addFields: {
                    client_id: '$client_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$due_date" } },  // Extract year from due_date
                    month: { $dateToString: { format: "%m", date: "$due_date" } }, // Extract month from due_date
                    day: { $dateToString: { format: "%d", date: "$due_date" } }    // Extract day from due_date (if needed)
                }
            },
            {
                $match: {
                    $or: [
                        { 'client_id.firstname': { $regex: regex } },
                        { 'client_id.lastname': { $regex: regex } },
                        { 'client_id.email': { $regex: regex } },
                        { 'client_id.address': { $regex: regex } },
                        { status: { $regex: regex } },
                        { year: { $regex: regex } },   // Search by year
                        { month: { $regex: regex2 || regex } },  // Search by month
                        { day: { $regex: regex } }     // Optional: Search by day if needed
                    ]
                }
            },
            { $count: 'total' }  // Instead of returning documents, just return the count
        ]);

        const totalResults = totalDocuments.length > 0 ? totalDocuments[0].total : 0;


        const totalPages = Math.ceil(Number(totalResults) / ITEMS_PER_PAGE)

        return totalPages
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of invoices.')
    }
}

export type FetchInvoicesById = {
    [K in keyof Invoice]: K extends 'client_id' ? Client : Invoice[K]
}

export async function fetchInvoiceById(id: string) {
    noStore()

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

        return invoice
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoice.')
    }
}

// export async function fetchFilteredInventory(
//     { query, currentPage, branch }: {
//         query: string,
//         branch: string,
//         currentPage: number,
//     }
// ) {
//     noStore()

//     console.log({ query, branch })

//     const offset = (currentPage - 1) * ITEMS_PER_PAGE

//     try {
//         await connectDB()
//         await ProductModel.find()

//         const regex = new RegExp(query, 'i')
//         const branchId = branch.length === 24 ? new ObjectId(branch) : ''

//         console.log({ regex, branchId })

//         // Build the search query with proper checks for different field types
//         const inventory = await InventoryModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'products',  // The name of the Client collection
//                     localField: 'product_id',
//                     foreignField: '_id',
//                     as: 'product_info'
//                 }
//             },
//             { $unwind: '$product_info' },  // Unwind the client_info array
//             {
//                 $addFields: {
//                     product_id: '$product_info'  // Replace client_id with the populated client_info
//                 }
//             },
//             {
//                 $match: {
//                     $or: [
//                         { 'product_id.name': { $regex: regex } },
//                         { 'product_id.type': { $regex: regex } },
//                         { 'product_id.price': { $regex: regex } },
//                         { quantity: { $regex: regex } },
//                         { branch_id: branchId }
//                     ]
//                 }
//             },
//             { $sort: { quantity: -1 } },
//             { $skip: offset },
//             { $limit: ITEMS_PER_PAGE }
//         ]);

//         const formatedInventory = inventory.map((invoice) => {
//             return {
//                 ...invoice,
//                 _id: invoice?._id?.toString() || '',
//             }
//         })

//         console.log(formatedInventory.length)

//         return deepClone(formatedInventory)
//     }
//     catch (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch Inventory.')
//     }
// }

export async function fetchFilteredInventory(
    { query, currentPage, branch }: {
        query: string,
        branch?: string,
        currentPage: number,
    }
) {
    noStore()


    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ProductModel.find()

        const regex = new RegExp(query, 'i')
        const branchId = (branch && branch.length === 24) ? new ObjectId(branch) : null

        // Prepare the $match query
        const matchQuery: any = {
            $or: [
                { 'product_info.name': { $regex: regex } },
                { 'product_info.type': { $regex: regex } },
                { price: { $regex: regex } },
                { quantity: { $regex: regex } },
            ]
        }

        // Add branch_id to $match if branchId is valid
        if (branchId) {
            matchQuery.$and = [{ branch_id: branchId }]
        }

        const inventory = await InventoryModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            {
                $match: { year: '2024', month: 'Dec' },
            },
            {
                $lookup: {
                    from: 'products',  // The name of the Client collection
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product_info'
                }
            },
            { $unwind: '$product_info' },  // Unwind the client_info array
            {
                $addFields: {
                    product_id: '$product_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: matchQuery
            },
            { $sort: { quantity: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        console.log('arr length', inventory.length)

        const formatedInventory = inventory.map((invoice) => {
            return {
                ...invoice,
                _id: invoice?._id?.toString() || '',
            }
        })

        return deepClone(formatedInventory)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch Inventory.')
    }
}


export async function fetchLatestPurchasedItems(
    query: string,
    currentPage: number,

) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()

        const regex = new RegExp(query, 'i')

        // Build the search query with proper checks for different field types
        const purchasedItems: PurchasedItem[] = await PurchasedItemsModel.aggregate([
            {
                $lookup: {
                    from: 'items',  // The name of the Client collection
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_info'
                }
            },
            { $unwind: '$item_info' },  // Unwind the client_info array
            {
                $addFields: {
                    item_id: '$item_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: {
                    $or: [
                        { 'item_id.name': { $regex: regex } },
                        { 'item_id.type': { $regex: regex } },
                        { 'item_id.price': { $regex: regex } },
                        { quantity: { $regex: regex } }
                    ]
                }
            },
            { $sort: { year: 1, month: -1, purchase_transaction_id: -1, unit_price: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        const formatedPurchasedItems = purchasedItems.map(({ _id, item_id, purchase_transaction_id, quantity, unit_price }) => {
            return {
                item_id,
                purchase_transaction_id,
                quantity,
                unit_price,
                _id: _id?.toString() || '',
            }
        })

        return deepClone(formatedPurchasedItems)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch Inventory.')
    }
}

// export async function fetchTopSuppliers(
//     query: string,
//     currentPage: number,
// ) {
//     noStore()

//     const offset = (currentPage - 1) * ITEMS_PER_PAGE

//     try {
//         await connectDB()

//         const regex = new RegExp(query, 'i')

//         // Build the search query with proper checks for different field types
//         const purchasedItems: PurchasedItem[] = await PurchasedItemsModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'items',  // The name of the Client collection
//                     localField: 'item_id',
//                     foreignField: '_id',
//                     as: 'item_info'
//                 }
//             },
//             { $unwind: '$item_info' },  // Unwind the client_info array
//             {
//                 $addFields: {
//                     item_id: '$item_info'  // Replace client_id with the populated client_info
//                 }
//             },
//             {
//                 $match: {
//                     $or: [
//                         { 'item_id.name': { $regex: regex } },
//                         { 'item_id.type': { $regex: regex } },
//                         { 'item_id.price': { $regex: regex } },
//                         { quantity: { $regex: regex } }
//                     ]
//                 }
//             },
//             { $sort: { quantity: -1 } },
//             { $skip: offset },
//             { $limit: ITEMS_PER_PAGE }
//         ]);

//         console.log({ purchasedItems })
//         const formatedPurchasedItems = purchasedItems.map(({ _id, item_id, purchase_transaction_id, quantity, unit_price }) => {
//             return {
//                 item_id,
//                 purchase_transaction_id,
//                 quantity,
//                 unit_price,
//                 _id: _id?.toString() || '',
//             }
//         })

//         console.log({ formatedPurchasedItems })

//         return deepClone(formatedPurchasedItems)
//     }
//     catch (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch Inventory.')
//     }
// }

export async function fetchFilteredInventoryPages(
    { query, currentPage, branch }: {
        query: string,
        branch: string,
        currentPage: number,
    }
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ProductModel.find()

        const regex = new RegExp(query, 'i')
        const branchId = branch.length === 24 ? new ObjectId(branch) : null

        // Prepare the $match query
        const matchQuery: any = {
            $or: [
                { 'product_info.name': { $regex: regex } },
                { 'product_info.type': { $regex: regex } },
                { 'product_info.price': { $regex: regex } },
                { quantity: { $regex: regex } },
            ]
        }

        // Add branch_id to $match if branchId is valid
        if (branchId) {
            matchQuery.$and = [{ branch_id: branchId }]
        }

        // Build the search query with proper checks for different field types
        const totalDocuments = await InventoryModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            {
                $match: { year: '2024', month: 'Dec' },
            },
            {
                $lookup: {
                    from: 'products',  // The name of the Client collection
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product_info'
                }
            },
            { $unwind: '$product_info' },  // Unwind the client_info array
            {
                $addFields: {
                    product_id: '$product_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: matchQuery
            },
            { $count: 'total' }  // Instead of returning documents, just return the count
        ]);

        const totalResults = totalDocuments.length > 0 ? totalDocuments[0].total : 0;


        const totalPages = Math.ceil(Number(totalResults) / ITEMS_PER_PAGE)

        return totalPages
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoices.')
    }
}

export async function fetchClients() {
    noStore()

    try {
        connectDB()
        const data: Client[] = await ClientModel.find()

        return data.map(({ _id, name, contact, email, address }) => (
            { _id: _id?.toString(), name, contact, email, address }
        ))
    } catch (err) {
        console.error('Database Error:', err)
        throw new Error('Failed to fetch all clients.')
    }
}

export async function supplyChainCards() {
    noStore()

    try {
        connectDB()
        // Aggregate the inventory with product info to get the relevant data
        const inventory = await InventoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',  // The name of the products collection
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product_info'
                }
            },
            { $unwind: '$product_info' },  // Unwind the product_info array
            {
                $group: {
                    _id: null,  // We don't group by any specific field
                    totalMeatProducts: {
                        $sum: {
                            $cond: [
                                { $eq: ['$product_info.type', 'Meat Product'] },
                                '$quantity',
                                0
                            ]
                        }
                    },
                    totalGroceries: {
                        $sum: {
                            $cond: [
                                { $eq: ['$product_info.type', 'Grocery'] },
                                '$quantity',
                                0
                            ]
                        }
                    },
                    totalAmount: {
                        $sum: {
                            $multiply: ['$quantity', '$product_info.price']
                        }
                    }
                }
            }
        ]);

        // If aggregation returns no results, return default values
        const result = inventory[0] || { totalMeatProducts: 0, totalGroceries: 0, totalAmount: 0 };

        return {
            totalMeatProducts: result.totalMeatProducts,
            totalGroceries: result.totalGroceries,
            totalAmount: result.totalAmount
        };
    } catch (error) {
        console.error('Error calculating inventory totals:', error);
        throw new Error('Failed to calculate inventory totals.');
    }
}

export async function fetchOrdersAnalytics({ year }: { year: string }) {
    noStore()

    try {
        connectDB()
        // Aggregate the inventory with product info to get the relevant data
        let orders = await OrdersModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            {
                $match: { year }
            },
            {
                $group: { _id: ['$month', '$status',], total: { $count: {} } },
            },
        ])

        orders = orders.sort((a, b) => monthsShort.findIndex(val => val.toLowerCase() === a._id[0].toLowerCase()) - monthsShort.findIndex(val => val.toLowerCase() === b._id[0].toLowerCase()))

        const recordOfOrders = await OrdersModel.aggregate([
            {
                $addFields: {
                    year: { $dateToString: { format: '%Y', date: '$year' } }
                }
            },
            {
                $match: { year }
            },
            {
                $group: { _id: '$month', total: { $count: {} } },
            },
        ])

        let highestRecordOfOrders = 0

        for (let order of recordOfOrders) {
            highestRecordOfOrders = order.total > highestRecordOfOrders
                ? order.total : highestRecordOfOrders
        }

        const ordersFullfilmentRates: any[] = []

        console.log('percentage', calculatePercentage(20, 80))

        for (let order of orders) {

            const item = ordersFullfilmentRates.find(a => a.date === order._id[0])
            const monthlyOrders = recordOfOrders.find(a => a._id === order._id[0])
            console.log({ monthlyOrders })

            if (item) {
                item.issues.push({
                    status: capitalise(order._id[1]),
                    value: order.total,
                    percentage: calculatePercentage(order.total, monthlyOrders.total),
                })
            } else {
                ordersFullfilmentRates.push({
                    date: order._id[0],
                    issues: [
                        {
                            status: capitalise(order._id[1]),
                            value: order.total,
                            percentage: calculatePercentage(order.total, monthlyOrders.total),
                        },
                    ],
                })
            }
        }

        // console.log({ ordersFullfilmentRates: JSON.stringify(ordersFullfilmentRates) })

        return {
            ordersFullfilmentRates,
        };
    } catch (error) {
        console.error('Error calculating inventory totals:', error);
        throw new Error('Failed to calculate inventory totals.');
    }
}

interface FilterOptions {
    year?: number
    city?: string
}

export type MonthlyRevenuByMonth = { totalRevenue: number, city: string, month: string }

export async function getMonthlyRevenueByCity(filters: FilterOptions): Promise<MonthlyRevenuByMonth[]> {
    const { year, city } = filters

    try {
        const matchConditions: any = {}

        // Add filtering conditions based on the input
        if (year) {
            matchConditions.year = {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year + 1}-01-01`)
            }
        }

        if (city) {
            matchConditions['branch_info.city'] = city
        }

        // Aggregate to get monthly revenue by city
        const revenueByCityAndMonth = await RevenueModel.aggregate([
            {
                $lookup: {
                    from: 'branches',  // Lookup the Branch collection
                    localField: 'branch_id',
                    foreignField: '_id',
                    as: 'branch_info'
                }
            },
            { $unwind: '$branch_info' },  // Flatten the branch_info array
            {
                $match: matchConditions  // Apply filtering conditions
            },
            {
                $group: {
                    _id: {
                        city: '$branch_info.city',  // Group by city
                        month: '$month'  // Group by month
                    },
                    totalRevenue: { $sum: '$amount' }  // Sum the revenue for each city and month
                }
            },
            {
                $project: {
                    _id: 0,
                    city: '$_id.city',
                    month: '$_id.month',
                    totalRevenue: 1
                }
            },
            { $sort: { month: 1, city: 1 } }  // Sort by month and city
        ])

        // return []
        return revenueByCityAndMonth
    } catch (error) {
        console.error('Error calculating monthly revenue by city:', error)
        throw new Error('Failed to calculate monthly revenue by city.')
    }
}

export async function getTotalRevenueByCity(filters: FilterOptions) {
    const { year, city } = filters

    try {
        const matchConditions: any = {}

        // Add filtering conditions based on the input
        if (year) {
            matchConditions.year = {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year + 1}-01-01`)
            }
        }

        if (city) {
            matchConditions['branch_info.city'] = city
        }

        // Aggregate to get total revenue by city
        const revenueByCity = await RevenueModel.aggregate([
            {
                $lookup: {
                    from: 'branches',  // Lookup the Branch collection
                    localField: 'branch_id',
                    foreignField: '_id',
                    as: 'branch_info'
                }
            },
            { $unwind: '$branch_info' },  // Flatten the branch_info array
            {
                $match: matchConditions  // Apply filtering conditions
            },
            {
                $group: {
                    _id: '$branch_info.city',  // Group by city
                    totalRevenue: { $sum: '$amount' }  // Sum the revenue for each city
                }
            },
            {
                $project: {
                    _id: 0,
                    city: '$_id',
                    totalRevenue: 1
                }
            },
            { $sort: { totalRevenue: -1 } }  // Sort by total revenue in descending order
        ])

        return []
        // return revenueByCity
    } catch (error) {
        console.error('Error calculating total revenue by city:', error)
        throw new Error('Failed to calculate total revenue by city.')
    }
}

export async function getTopSuppliers() {
    const inventory = await PurchasedItemsModel.aggregate([
        {
            $lookup: {
                from: 'PurchaseTransaction',  // The name of the products collection
                localField: 'purchase_transaction_id',
                foreignField: '_id',
                as: 'purchase_transaction_info'
            }
        },
        { $unwind: '$purchase_transaction_info' },  // Unwind the product_info array
        {
            $group: {
                _id: null,  // We don't group by any specific field
                totalTransactios: {
                    $sum: {
                        $cond: [
                            { $eq: ['$product_info.type', 'Meat Product'] },
                            '$quantity',
                            0
                        ]
                    }
                },
                totalGroceries: {
                    $sum: {
                        $cond: [
                            { $eq: ['$product_info.type', 'Grocery'] },
                            '$quantity',
                            0
                        ]
                    }
                },
                totalAmount: {
                    $sum: {
                        $multiply: ['$quantity', '$product_info.price']
                    }
                }
            }
        }
    ]);
}

export const getTopPerformingSuppliers = async (limit: number = 10) => {
    try {
        const topSuppliers = await PurchasedItemsModel.aggregate([
            // Lookup PurchaseTransaction to get the supplier_id from purchase_transaction_id
            {
                $lookup: {
                    from: 'purchasetransactions', // Ensure the collection name is correct
                    localField: '_id',
                    foreignField: 'purchase_transaction_id',
                    as: 'transaction'
                }
            },
            // Unwind the transaction array (so we can access supplier_id)
            {
                $unwind: '$transaction'
            },
            // Group by supplier_id and count the occurrences (number of items per supplier)
            {
                $group: {
                    _id: '$transaction.supplier_id',
                    transactionCount: { $sum: 1 }
                }
            },
            // Sort by the transaction count in descending order
            {
                $sort: { transactionCount: -1 }
            },
            // Limit the number of suppliers returned
            {
                $limit: limit
            },
            // Optionally populate the supplier information
            {
                $lookup: {
                    from: 'suppliers', // Ensure this matches the name of your suppliers collection
                    localField: '_id',
                    foreignField: 'supplier_id',
                    as: 'supplierInfo'
                }
            },
            // Unwind the supplierInfo array
            {
                $unwind: '$supplierInfo'
            },
            // Project the fields you want in the result
            {
                $project: {
                    _id: 0, // Hide the default MongoDB _id field
                    supplier: '$supplierInfo',
                    transactionCount: 1
                }
            }
        ])

        console.log({ topSuppliers })

        return topSuppliers
    } catch (error) {
        console.error('Error fetching top-performing suppliers:', error)
        throw error
    }
}

export async function fetchReports(id: string): Promise<{ sent: any[], received: any[] }> {
    try {
        await connectDB()

        const sent: any[] = await ReportModel.find().where('from').equals(id).populate('to')
        const received: any[] = await ReportModel.find().where('to').equals(id).populate('from')

        let serializedSent: any = []
        if (sent.length) {
            serializedSent = sent.map(({ _id, title, to, documentName, downloadableUrl }) => (
                {
                    _id: _id?.toString(),
                    title,
                    to: { _id: to._id.toString(), email: to.email, role: to.role.toString(), username: to.username },
                    documentName,
                    downloadableUrl
                }
            ))
        }

        let serializedReceived: any[] = []
        if (received.length) {
            serializedReceived = received.map(({ _id, title, from, to, documentName, downloadableUrl }) => (
                {
                    _id: _id?.toString(),
                    title,
                    from: { _id: from._id.toString(), email: from.email, role: from.role.toString(), username: from.username },
                    documentName,
                    downloadableUrl
                }
            ))
        }

        return {
            sent: serializedSent.reverse(),
            received: serializedReceived.reverse(),
        }

    } catch (error) {
        console.log(error)

        throw error
    }
}

export async function fetchUsers(): Promise<User[]> {
    try {
        await connectDB()

        const users: User[] = await UserModel.find()

        return users.map(({ _id, username, role, email }) => ({ _id: _id.toString(), username, role, email }))
    } catch (error) {
        console.log(error)

        throw error
    }
}