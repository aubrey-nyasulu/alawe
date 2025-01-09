import Image from 'next/image';
import sectionImg from '@/../public/logo.webp'

export default function SectionOne() {
    return (
        <section
            id='about'
            className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-8'
        >
            <div className='w-full flex-[2] px-0 rounded-full overflow-hidden border-2 border-primary border-dotted'>
                <Image
                    src={sectionImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-square w-full'
                />
            </div>

            <div className='w-full flex-[3] flex flex-col gap-2'>
                <h2 className='text-xl md:text-3xl font-extrabold'>About Us</h2>
                <p>We are a family-owned meat processing company dedicated to providing the highest quality, ethically sourced meat products. At Alawe Meat Merchants, we are committed to providing the highest quality halal meat products. Our dedication to excellence begins with sourcing live animals from trusted farms, ensuring that every step of our processing meets strict halal standards.</p>
            </div>
        </section>
    )
}
