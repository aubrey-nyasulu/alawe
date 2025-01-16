'use server'

import connectDB from "@/db/config/connectDB"
import { ProductModel } from "@/db/models"
import { fetchProducts } from "@/lib/data"

export async function fetchStoreProducts({ category, currentPage, query }: { category?: string, currentPage?: number, query?: string, }) {
    try {
        connectDB()

        const { products, categories, totalPages } = await fetchProducts({ category, currentPage, query })

        return { products, categories, totalPages }
    } catch (error) {
        console.log('failed to approve user', error)
        return { products: [], categories: [], totalPages: 0 }
    }
}