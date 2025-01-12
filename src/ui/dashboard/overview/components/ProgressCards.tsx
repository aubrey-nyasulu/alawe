"use client"

import { useOnWindowResize } from '@/customHooks/useOnWindowResize';
import { cx } from '@/lib/utils';
import { Button } from '@/tremorComponents/Button';
import { Card } from '@/tremorComponents/Card';
import { ProgressCircle } from '@/tremorComponents/ProgressCircle';
import { RiArrowRightSLine, RiArrowLeftSLine } from '@remixicon/react';
import { useRef, useState } from 'react';

type variantType = "success" | "default" | "warning" | "error" | "neutral" | undefined

export const ProgressCards = ({ data }: { data: { cardTitle: string, percentValue?: number, numalator?: string | number, denominator?: string | number, invert?: boolean, fair?: boolean }[], }) => {
    const [parentDivWidhth, setParentDivWidth] = useState<number>(0)
    const [cardsDivWith, setCardsDivWidth] = useState<number>(0)
    const [cardwidth, setCardWidth] = useState<number>(0)
    const [cardsDivPosition, setCardsDivPosition] = useState(0)
    const [numberOfCards, setNumberOfCards] = useState(0)

    const parentDivRef = useRef<HTMLDivElement | null>(null)
    const cardsDivRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<HTMLDivElement | null>(null)

    useOnWindowResize(() => {
        if (parentDivRef.current && cardsDivRef.current && cardsRef.current) {
            setParentDivWidth(parentDivRef.current.getBoundingClientRect().width)
            setCardsDivWidth(cardsDivRef.current.getBoundingClientRect().width)
            setCardWidth(cardsRef.current.getBoundingClientRect().width)
            setNumberOfCards(cardsDivRef.current.children.length)
        }
    })

    const translateLeft = () => {
        if (cardsDivRef.current && parentDivRef.current) {
            const moveTo = cardsDivPosition - (cardwidth - 16)

            cardsDivRef.current.style.transform = `translateX(${moveTo}px)`

            setCardsDivPosition(moveTo)
        }
    }

    const translateRight = () => {
        if (cardsDivRef.current && parentDivRef.current) {
            const moveTo = cardsDivPosition + (cardwidth - 16)

            cardsDivRef.current.style.transform = `translateX(${moveTo}px)`

            setCardsDivPosition(moveTo)
        }
    }

    return (
        <div
            ref={parentDivRef}
            className='w-full relative'
        >
            <div className='absolute w-full z-30 top-[50%] translate-y-[-50%] flex items-center justify-between '>
                <Button
                    variant='custom'
                    onClick={translateLeft}
                    disabled={
                        cardsDivWith <= parentDivWidhth || cardsDivWith < (Math.abs(cardsDivPosition) + (cardwidth + (numberOfCards * 16)))}
                    className={cx('p-0 absolute -right-3 shadow-none bg-[#0001] dark:bg-[#fff1] rounded-full', cardsDivWith <= parentDivWidhth && 'opacity-0', cardsDivWith < (Math.abs(cardsDivPosition) + (cardwidth + (numberOfCards * 16))) && 'opacity-0')}
                >
                    <RiArrowRightSLine className={'size-10 text-[#0009] dark:text-[#fff9]'} />
                </Button>
                <Button
                    variant='custom'
                    onClick={translateRight}
                    disabled={cardsDivWith <= parentDivWidhth || cardsDivPosition >= 0}
                    className={cx('p-0 absolute -left-3 shadow-none bg-[#0001] dark:bg-[#fff1] rounded-full', cardsDivPosition >= 0 && 'opacity-0', cardsDivWith <= parentDivWidhth && 'opacity-0')}
                >
                    <RiArrowLeftSLine className={'size-10 text-[#0009] dark:text-[#fff9]'} />
                </Button>
            </div>
            <div
                ref={cardsDivRef}
                className='w-fit min-w-full flex gap-4 items-center transition-transform duration-500'
            >
                {
                    data.map(({ cardTitle, percentValue, numalator, denominator, invert, fair }, index) => {
                        let variant: variantType
                        if (percentValue) {
                            if (invert) {
                                variant = percentValue <= 25 ? "success" : percentValue <= 50 ? "default" : percentValue <= 75 ? "warning" : "error"
                            }
                            else if (fair) {
                                variant = percentValue <= 10 ? "error" : percentValue <= 30 ? "warning" : percentValue <= 50 ? "default" : "success"
                            }
                            else {
                                variant = percentValue <= 25 ? "error" : percentValue <= 50 ? "warning" : percentValue <= 75 ? "default" : "success"
                            }
                        }

                        return (
                            < Card
                                key={cardTitle + index}
                                ref={cardsRef}
                            >
                                <div
                                    className="flex h-full w-fit items-center justify-center gap-x-5 text-nowrap"
                                >
                                    {
                                        (percentValue && variant) &&
                                        <ProgressCircle
                                            value={percentValue}
                                            variant={variant}>
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">

                                                {percentValue}%
                                            </span>
                                        </ProgressCircle>
                                    }
                                    <div>
                                        {
                                            (numalator && denominator) &&
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {numalator}/{denominator}
                                            </p>
                                        }
                                        {
                                            (numalator && !denominator) &&
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 pb-2">
                                                {numalator}
                                            </p>
                                        }
                                        <p className={cx("text-sm text-gray-500 dark:text-gray-500", (!numalator || !denominator) && 'text-xl font-semibold')}>
                                            {cardTitle}
                                        </p>
                                        {
                                            (!numalator && denominator) &&
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 pt-2">
                                                {denominator}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}