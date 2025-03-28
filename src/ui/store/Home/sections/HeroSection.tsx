import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/tremorComponents/Button"

import heroImg from '@/../public/store/hero.png'

export default function HeroSection() {
    return (
        <section className='langingpage-container mt-24 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-start px-4 py-8 lg:px-0 lg:py-0 '>
            <div className='w-full flex-1 flex flex-col gap-2 items-start'>
                <h1 className='text-3xl md:text-5xl font-semibold'>
                    Welcome to <span className='text-primary'>Alawe Meat Merchants</span>
                </h1>

                <p className='text-gray-600 pt-2'>At Alawe Meat Merchants, we are committed to providing the highest quality halal meat products.</p>

                <Link href="#bulk-order" className='w-fit h-fit'>
                    <Button className='px-8 py-4 w-fit h-fit bg-primary rounded-full text-white mt-8 ring ring-offset-2 ring-primary/30 hover:ring-orange-700' >
                        Discover More
                    </Button>
                </Link>
            </div>

            <div className='w-full flex-1 rounded-3xl overflow-hidden ring-4 ring-primary/20 ring-offset-2'>
                <Image
                    src={heroImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-[5/4] w-full'
                    placeholder='blur'
                />
            </div>
        </section >
    )
}
