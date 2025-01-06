import {
    Branch,
    Client,
    Employee,
    Invoice,
    Inventory,
    Item,
    PaymentMethod,
    Payment,
    Product,
    ProductSold,
    PurchasedItem,
    PurchaseTransaction,
    Supplier,
    Revenue,
    SalesTransaction,
    Salary,
    Notification
} from '@/types'
import {
    RevenueModel,
    InvoiceModel,
    BranchModel,
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
    SalaryModel,
    NotificationModel
} from '../db/models';
import { formatCurrency } from './utils';
import connectDB from '../db/config/connectDB';
import { ObjectId } from 'mongodb';

connectDB()

import { unstable_noStore as noStore } from 'next/cache';

export type FetchRevenueReturnType = {
    [K in keyof Revenue]: K extends 'revenue' ? string : Revenue[K]
}

export async function fetchRevenue(): Promise<FetchRevenueReturnType[]> {
    noStore();

    try {
        connectDB()
        const data: Revenue[] = await RevenueModel.find()

        return data.map(({ month, branch_id, amount, year }) => ({ month, amount, branch_id, year }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchBranches(): Promise<Branch[]> {
    noStore();

    try {

        connectDB()
        const data: Branch[] = await BranchModel.find()

        return data.map(({ _id, branch_type, address, city }) => (
            { _id: _id?.toString(), branch_type, address, city }
        ))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchClients(): Promise<Client[]> {
    noStore();

    try {

        connectDB()
        const data: Client[] = await ClientModel.find()

        return data.map(({ name, contact, address, email }) => ({ name, contact, address, email }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchItems(): Promise<Item[]> {
    noStore();

    try {

        connectDB()
        const data: Item[] = await ItemModel.find()

        return data.map(({ _id, name, type, }) => ({ _id: _id?.toString(), name, type }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchPaymentsMethods(): Promise<PaymentMethod[]> {
    noStore();

    try {

        connectDB()
        const data: PaymentMethod[] = await PaymentMethodModel.find()

        return data.map(({ name }) => ({ name }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchProducts(): Promise<Product[]> {
    noStore();

    try {

        connectDB()
        const data: Product[] = await ProductModel.find()

        return data.map(({ name, type, price }) => ({ name, type, price }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchSuppliers(): Promise<Supplier[]> {
    noStore();

    try {

        connectDB()
        const data: Supplier[] = await SupplierModel.find()

        return data.map(({ _id, name, contact, address }) => ({ _id: _id?.toString(), name, contact, address }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchInventory(): Promise<Inventory[]> {
    noStore();

    try {

        connectDB()
        const data: Inventory[] = await InventoryModel.find()

        return data.map(({ branch_id, product_id, quantity }) => ({ branch_id, product_id, quantity }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchImployees(): Promise<Employee[]> {
    noStore();

    try {

        connectDB()
        const data: Employee[] = await EmployeeModel.find()

        return data.map(({ _id, firstname, lastname, email, branch_id }) => ({ _id: _id?.toString(), firstname, lastname, email, branch_id: branch_id.toString() }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export type FecthInvoicesReturnType = {
    [K in keyof Invoice]: K extends 'amount' ? string : Invoice[K]
}
export async function fetchInvoices(): Promise<FecthInvoicesReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: Invoice[] = await InvoiceModel.find()

        return data.map(({ amount, client_id, status, due_date }) => ({ amount: formatCurrency(Number(amount)), client_id, status, due_date: due_date?.toLocaleString() }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

type FetchPaymentsReturnType = {
    [K in keyof Payment]: K extends 'amount' ? string : Payment[K]
}
export async function fetchPayments(): Promise<FetchPaymentsReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: Payment[] = await PaymentModel.find()

        return data.map(({ amount, client_id, invoice_id, payment_method_id }) => ({ amount: formatCurrency(Number(amount)), client_id, invoice_id, payment_method_id }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}


type FetchProductsSoldReturnType = {
    [K in keyof ProductSold]: K extends 'unit_price' ? string : ProductSold[K]
}
export async function fetchProductsSold(): Promise<FetchProductsSoldReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: ProductSold[] = await ProductSoldModel.find()

        return data.map(({ product_id, quantity, sales_transaction_id, unit_price }) => ({ product_id, quantity, sales_transaction_id, unit_price: formatCurrency(Number(unit_price)) }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

type FetchPurchasedItemsReturnType = {
    [K in keyof PurchasedItem]: K extends 'unit_price' ? string : PurchasedItem[K]
}
export async function fetchIPurchasedtems(): Promise<FetchPurchasedItemsReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: PurchasedItem[] = await PurchasedItemsModel.find()

        return data.map(({ item_id, purchase_transaction_id, quantity, unit_price, month, year }) => ({ item_id, purchase_transaction_id, quantity, unit_price: formatCurrency(Number(unit_price)), month, year }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

type FetchPurchaseTransactionsReturnType = {
    [K in keyof PurchaseTransaction]: K extends 'purchase_total' ? string : PurchaseTransaction[K]
}
export async function fetchPurchaseTransactions(): Promise<FetchPurchaseTransactionsReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: PurchaseTransaction[] = await PurchaseTransactionModel.find()

        return data.map(({ purchase_total, supplier_id, }) => ({ purchase_total: formatCurrency(Number(purchase_total)), supplier_id }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

type FetchISalesTransactionsReturnType = {
    [K in keyof SalesTransaction]: K extends 'purchase_total' ? string : SalesTransaction[K]
}
export async function fetchISalesTransactions(): Promise<FetchISalesTransactionsReturnType[]> {
    noStore();

    try {

        connectDB()
        const data: SalesTransaction[] = await SalesTransactionModel.find()

        return data.map(({ branch_id, purchase_total }) => ({ purchase_total: formatCurrency(Number(purchase_total)), branch_id }))
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export type FetchSalariesReturnType = {
    [K in keyof Salary]: K extends 'amount' ? string : Salary[K]
}
export async function fetchSalaries(): Promise<FetchSalariesReturnType[]> {
    noStore()

    try {
        connectDB()

        const data: Salary[] = await SalaryModel.find()

        const salaries = data.map(({ _id, amount, grade }) => (
            { _id: _id?.toString(), amount: formatCurrency(amount), grade }
        ))

        return salaries
    } catch (err) {
        console.error('Database Error:', err)
        throw new Error('Failed to fetch all customers.')
    }
}

export async function fetchNotifications(id: string): Promise<Notification[]> {
    try {
        connectDB()
        const notifications: Notification[] = await NotificationModel.find().where({ userId: new ObjectId(id) })

        return notifications
    } catch (error) {
        console.log('some error occured')

        throw new Error('failed to fetch notifications')
    }
}