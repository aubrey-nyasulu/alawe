'use client'

import { useContext, useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import { Button } from '@/tremorComponents/Button'

import CartContext from '@/context/CartStateProvider'
import CardSelect from './CardSelect'

export default function Card({ image, name, price }: { image: StaticImageData, name: string, price: number }) {
    const [value, setValue] = useState(0)

    const { Dispatch, cart } = useContext(CartContext)

    const card = cart.find(item => item.name === name)

    return (
        <div className='md:max-w-[250px] md:min-w-[200px] flex-1'>
            <div className='flex-1 w-full h-fit rounded-[12px] overflow-hidden ring-1 ring-black/20 ring-offset-2 '>
                <Image
                    src={image}
                    alt={name + ' image'}
                    width={2000}
                    height={2000}
                    placeholder='blur'
                    className='w-full aspect-[4/3] hover:scale-110'
                />
            </div>

            <div className='pt-4 px-2 flex gap-4 items-center justify-between'>
                <p className=''>{name}</p>
                <p>MK{price}</p>
            </div>

            <div className='p-1 flex gap-4 items-center justify-between mt-2 '>
                <Button
                    variant='secondary'
                    className='rounded-full'
                    onClick={() => {
                        setValue(prevValue => prevValue += 1)
                        Dispatch({ type: 'ADD', payload: { quantity: 1, name, price } })
                    }}
                >
                    Add to Cart
                </Button>

                <div className='w-fit'>
                    <CardSelect {...{
                        data: (!card?.quantity || card?.quantity < 19)
                            ? Array.from({ length: 20 }, (_, i) => (i).toString())
                            : Array.from(
                                { length: 20 },
                                (_, i) => {
                                    const val = (i + Math.floor(card.quantity / 2)) + 1

                                    return (val).toString()
                                }
                            ),
                        value: card?.quantity?.toString() || '0',
                        OnValueChange: (newValue) => {
                            Dispatch({
                                type: 'ADD',
                                payload: {
                                    quantity: Number(newValue) - value,
                                    name,
                                    price
                                }
                            })

                            setValue(Number(newValue))
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}
