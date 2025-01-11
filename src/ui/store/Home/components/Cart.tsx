import { CartIcon } from '@/assets/SVGComponents';
import React, { useContext, useState } from 'react';
import { CartDrawer } from './CartDrawer';
import { Button } from '@/tremorComponents/Button';
import { setConfig } from 'next/config';
import CartContext from '@/context/CartStateProvider';

export default function Cart() {
    const [showModel, setShowModel] = useState(false)

    const { totalItems } = useContext(CartContext)

    return (
        <div className="relative">
            <div className='absolute right-0 bg-primary text-white w-6 h-6 rounded-full grid place-content-center z-40'>
                <small>{totalItems}</small>
            </div>

            <Button
                className='bg-transparent shadow-none'
                onClick={() => setShowModel(prevState => !prevState)}
            >
                <CartIcon />
            </Button>

            <CartDrawer {...{ showModel, setShowModel }} />
        </div>
    )
}
