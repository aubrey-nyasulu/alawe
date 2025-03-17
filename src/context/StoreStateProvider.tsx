'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

import { Product } from "@/types";
import { fetchStoreProducts } from "@/actions/fetchStoreProductsActions";

type UpdateStoreStateParams = ({ category?: string, query?: string, currentPage?: number })

type StoreContextTypes = {
    filtersOpen: boolean
    setFiltersOpen: Dispatch<SetStateAction<boolean>>
    products: Product[]
    setProducts: Dispatch<SetStateAction<Product[]>>
    categories: { category: string }[],
    setCategories: Dispatch<SetStateAction<{ category: string }[]>>
    currentCategory: string,
    setCurrentCategory: Dispatch<SetStateAction<string>>
    totalPages: number,
    setTotalPages: Dispatch<SetStateAction<number>>
    query: string,
    autoFillData: {
        email: string,
        password: string
    },
    setAutoFillData: Dispatch<SetStateAction<{
        email: string,
        password: string
    }>>
    setQuery: Dispatch<SetStateAction<string>>
    updateStoreState: (params: UpdateStoreStateParams) => any
}

const initialState: StoreContextTypes = {
    filtersOpen: false,
    setFiltersOpen: () => null,
    products: [],
    setProducts: () => null,
    categories: [],
    setCategories: () => null,
    currentCategory: '',
    setTotalPages: () => null,
    totalPages: 0,
    setCurrentCategory: () => null,
    query: '',
    setQuery: () => null,
    autoFillData: {
        email: '',
        password: ''
    },
    setAutoFillData: () => null,
    updateStoreState: () => null
}

const StoreContext = createContext<StoreContextTypes>(initialState)

export function StoreContextProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<{ category: string }[]>([])
    const [currentCategory, setCurrentCategory] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [query, setQuery] = useState('')
    const [autoFillData, setAutoFillData] = useState({ email: '', password: '' })
    const [filtersOpen, setFiltersOpen] = useState(false)

    const updateStoreState = async ({ category, query, currentPage }: { category?: string, query?: string, currentPage?: number }) => {
        const { products, categories, totalPages } = await fetchStoreProducts({ category, query, currentPage })

        setProducts([...products])
        setCategories([...categories])
        setTotalPages(totalPages)
    }

    useEffect(() => {
        if (!window) return

        updateStoreState({ category: '', query: '', currentPage: 1 })
    }, [])

    return (
        <StoreContext.Provider value={{
            filtersOpen,
            products,
            categories,
            currentCategory,
            totalPages,
            query,
            setFiltersOpen,
            setProducts,
            setCategories,
            setCurrentCategory,
            setTotalPages,
            setQuery,
            autoFillData,
            setAutoFillData,
            updateStoreState
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext