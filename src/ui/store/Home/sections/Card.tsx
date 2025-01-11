import Image, { StaticImageData } from 'next/image'
import { Button } from '@/tremorComponents/Button'

export default function Card({ image, name, price }: { image: StaticImageData, name: string, price: number }) {
    return (
        <div className='md:max-w-[250px] flex-1'>
            <div className='flex-1 w-full h-fit rounded-[12px] overflow-hidden '>
                <Image
                    src={image}
                    alt='sausage image'
                    width={2000}
                    height={2000}
                    placeholder='blur'
                    className='w-full aspect-[4/3]'
                />
            </div>
            <p className='pt-2 px-2'>{name}</p>

            <div className='px-2 flex gap-4 items-center justify-between pt-4'>
                <Button variant='secondary' className='rounded-full'>Order Now</Button>
                <p>MK{price}.00</p>
            </div>
        </div>
    )
}
