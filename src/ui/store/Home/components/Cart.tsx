import { CartIcon } from '@/assets/SVGComponents';
import React, { useContext, useEffect, useState } from 'react';
import { CartDrawer } from './CartDrawer';
import { Button } from '@/tremorComponents/Button';
import { setConfig } from 'next/config';
import CartContext from '@/context/CartStateProvider';

export default function Cart() {
    const [showModel, setShowModel] = useState(false)

    const { totalItems } = useContext(CartContext)

    useEffect(() => {
        if (!window) return

        const element = document.querySelector('.bpFab') as HTMLDivElement

        if (element) {
            if (showModel) {
                element.style.opacity = '0'
            } else {
                element.style.opacity = '1'
            }
        }
    })

    return (
        <div className="relative">
            <Button
                className='bg-transparent shadow-none h-full'
                onClick={() => setShowModel(prevState => !prevState)}
            >
                <div className='absolute top-0 right-0 bg-primary text-white w-6 h-6 rounded-full grid place-content-center z-40'>
                    <small>{totalItems}</small>
                </div>

                <CartIcon {...{ width: '2.2em', height: '2.2em' }} />
            </Button>

            <CartDrawer {...{ showModel, setShowModel }} />
        </div>
    )
}
