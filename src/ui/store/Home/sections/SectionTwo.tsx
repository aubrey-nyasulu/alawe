import Image from 'next/image';
import sectionImg from '@/../public/store/section1.jpg'
import { Button } from '@/tremorComponents/Button';

export default function SectionTwo() {
    return (
        <section className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-8'>
            <div className='w-full flex-[2] flex flex-col gap-2'>
                <h2 className='text-xl md:text-3xl font-extrabold'>Craving a taste of Malawi?</h2>
                <p>Your favorite local eateries are now available in multiple branches throughout the all cities across Malawi. Enjoy Sausages, Plony, and more.</p>
                <Button
                    variant='secondary'
                    className='px-8 py-4 w-fit h-fit mt-8'
                >
                    Visit Our Stores
                </Button>
            </div>
            <div className='w-full flex-[3] rounded-xl overflow-hidden border-4 border-[#323232] border-dashed p-[2px]'>
                <Image
                    src={sectionImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-[5/3] w-full rounded-md'
                />
            </div>
        </section>
    )
}
