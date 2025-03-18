import { Schema } from 'mongoose'
import {
    string, ObjectId
} from 'mongoose'

export type BranchType = "Office" | "Shop" | "Factory" | "Storage"

type defaults = {
    _id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
}

export interface Branch extends defaults {
    address?: string
    city?: string
    branch_type: BranchType
}

export type UserRole = 'Admin' | 'Company Manager' | "Supply Chain Manager" | "Branch Manager" | "Procurement Manager"

export interface User extends defaults {
    _id: string
    username: string
    email: string
    role: UserRole | string // ObjectId
}


export interface UserRoleOBJ extends defaults {
    role: UserRole
}


export interface Client extends defaults {
    name: string
    address?: string
    email: string
    contact: string
}

export interface Employee extends defaults {
    firstname: string
    lastname: string
    job_title?: string
    email: string
    salary?: number
    reports_to?: string //ObjectId
    branch_id: string //ObjectId
}


export type NotificationType = "hire approved" | "new hire" | "security alert" | "hire declined" | "new report"

export interface Notification extends defaults {
    userId: string //ObjectId
    message: string
    type: NotificationType
    target?: string
}

export interface Inventory extends defaults {
    branch_id: string //ObjectId
    product_id: string //ObjectId
    quantity: number
}

export interface Invoice extends defaults {
    client_id: string //ObjectId
    amount: number
    due_date?: string | Date
    status: 'paid' | 'pending'
}

export interface Item extends defaults {
    name: string
    type: string
    price?: number
}

export interface PaymentMethod extends defaults {
    name: 'Mpamba' | 'Airtel Money' | 'Bank' | 'Cash'
}

export interface Payment extends defaults {
    amount: number
    invoice_id: string //ObjectId
    client_id: string //ObjectId
    payment_method_id: string //ObjectId
}

export interface Product extends defaults {
    name: string
    type: 'Meat Product' | 'Grocery'
    price: number
}

export interface ProductSold extends defaults {
    sales_transaction_id: string //ObjectId
    quantity: number
    unit_price: number
    product_id: string //ObjectId
}

export interface PurchasedItem extends defaults {
    purchase_transaction_id: string //ObjectId
    quantity: number
    unit_price: number
    year: string
    month: string
    item_id: string //ObjectId
}

export interface PurchaseTransaction extends defaults {
    purchase_total: number
    supplier_id: string //ObjectId
    year?: string
    month?: string
}

export interface Revenue extends defaults {
    branch_id: string,
    month: string,
    year: string,
    amount: number
}

export interface SalesTransaction extends defaults {
    purchase_total: number,
    branch_id: string //ObjectId,
}

export interface Supplier extends defaults {
    name: string
    contact: string
    address?: string
}

export interface Salary extends defaults {
    amount: number
    grade: string
}

export interface Report extends defaults {
    title: string
    documentName: string
    downloadableUrl: string
    from: string
    to: string
}

export type TilaweDatabaseEntity = Branch | Client | Employee | Invoice | Inventory | Item | PaymentMethod | Payment | Product | ProductSold | PurchasedItem | PurchaseTransaction | Supplier | Revenue | SalesTransaction | Salaries | User | UserRole | UserRoleOBJ | Notification | Report