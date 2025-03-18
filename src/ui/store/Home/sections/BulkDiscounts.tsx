import Image from 'next/image';

import sectionImg from '@/../public/store/bulk discounts.png'
import ClientApplicationHandler from '../components/ClientApplicationHandler';

export default function BulkDiscounts() {
    return (
        <section
            id='bulk-order'
            className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-16 pt-8 text-center md:text-left'
        >
            <div className='w-full rounded-3xl overflow-hidden ring-4 ring-primary/20 ring-offset-2 '>
                <Image
                    src={sectionImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-[4/3] w-full rounded-md'
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <h2 className='text-xl md:text-3xl font-extrabold'>
                    Bulk Discounts
                </h2>

                <p>
                    We offer discounts for bulk purchases to large stores and organizations. Reach out to our sales team through the website for more details on pricing and terms.
                </p>

                <div className=' space-x-2'>
                    <ClientApplicationHandler />
                </div>
            </div>
        </section>
    )
}
