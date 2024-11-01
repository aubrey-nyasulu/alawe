import Image from 'next/image';
import sectionImg from '@/../public/store/bulk.jpg'
import ClientApply from '../components/Clientapply';

export default function SectionFour() {
    return (
        <section
            id='bulk-order'
            className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-8 pt-8'
        >
            <div className='w-full flex-[3] rounded-xl overflow-hidden border-2 border-black border-dotted p-[2px] '>
                <Image
                    src={sectionImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-[5/3] w-full rounded-md'
                />
            </div>
            <div className='w-full flex-[2] flex flex-col gap-2'>
                <h2 className='text-xl md:text-3xl font-extrabold'>Bulk Discounts</h2>
                <p>We offer discounts for bulk purchases to large stores and organizations. Reach out to our sales team through the website for more details on pricing and terms.</p>
                <div className=' space-x-2'>
                    <ClientApply />
                </div>
            </div>
        </section>
    )
}
