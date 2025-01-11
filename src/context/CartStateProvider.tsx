'use client'

import { ReactElement, createContext, useReducer } from "react"

export type cartItemType = {
    name: string,
    price: number,
    quantity: number
}


const REDUCER_ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    RESET: 'RESET',
    SUBMIT: 'SUBMIT',
}

export type REDUCER_ACTIONS_TYPES = {
    type: string
    payload?: cartItemType
}

export type InitCartStateType = { cart: cartItemType[] }

const initCartState: CartContextType = {
    cart: [],
    Dispatch: () => { },
    totalItems: 0,
    totalPrice: 0,
    REDUCER_ACTIONS
}

function reducer(currentState: InitCartStateType, action: REDUCER_ACTIONS_TYPES) {
    const { payload } = action
    const { cart } = currentState

    switch (action.type) {
        case REDUCER_ACTIONS.ADD: {
            if (!payload || typeof payload !== 'object') return currentState

            const { name, price, quantity } = payload

            const itemexists = cart.find(item => item.name === name)

            if (!itemexists) return { ...currentState, cart: [...cart, { name, price, quantity }] }

            const updatedItemsLists = cart.map(item =>
                item.name === name ? { ...item, quantity: item.quantity + quantity } : item
            )

            return { ...currentState, cart: [...updatedItemsLists] }
        }

        case REDUCER_ACTIONS.REMOVE: {
            if (!payload || typeof payload !== 'object') return currentState

            const itemExist = cart.find(cartItem => cartItem.name === payload.name)

            if (!itemExist) return currentState

            const filteredList = cart.filter(cartItem => cartItem.name !== payload.name)

            return { ...currentState, cart: [...filteredList] }
        }

        case REDUCER_ACTIONS.QUANTITY: {
            if (!payload || typeof payload !== 'object') return currentState

            const { name, price, quantity } = payload

            if (quantity < 1) return currentState

            if (!cart.length) return { ...currentState, cart: [{ name, price, quantity }] }

            const updatedItemsLists = cart.map(item =>
                item.name === name ? { ...item, quantity } : item
            )

            return { ...currentState, cart: [...updatedItemsLists] }
        }

        case REDUCER_ACTIONS.RESET: {

            return {
                cart: [],
                Dispatch: () => { },
                totalItems: 0,
                totalPrice: 0,
                REDUCER_ACTIONS
            }
        }

        default: return currentState
    }
}

const useCartContext = (initCartState: InitCartStateType) => {
    const [state, Dispatch] = useReducer(reducer, initCartState)

    const { cart } = state

    const totalItems = cart.reduce((total, item) => { return total + item.quantity }, 0)

    const totalPrice = cart.reduce((total, item) => { return total + (item.quantity * item.price) }, 0)

    return {
        cart,
        Dispatch,
        totalItems,
        totalPrice,
        REDUCER_ACTIONS
    }
}

type CartContextType = ReturnType<typeof useCartContext>

const CartContext = createContext<CartContextType>(initCartState)

type CartContextProviderPropTypes = {
    children: ReactElement | ReactElement[]
}

export function CartContextProvider({ children }: CartContextProviderPropTypes) {

    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext