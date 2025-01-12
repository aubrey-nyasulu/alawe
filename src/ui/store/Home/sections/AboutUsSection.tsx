import Image from 'next/image';
import sectionImg from '@/../public/logo img.jpg'

export default function AboutUsSection() {
    return (
        <section
            id='about'
            className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col md:flex-row items-center justify-between gap-16 pt-8 text-center md:text-start'
        >
            <div className='w-full flex flex-col gap-2'>
                <h2 className='text-xl md:text-3xl font-extrabold'>About Us</h2>
                <p>We are a family-owned meat processing company dedicated to providing the highest quality, ethically sourced meat products. At Alawe Meat Merchants, we are committed to providing the highest quality halal meat products. Our dedication to excellence begins with sourcing live animals from trusted farms, ensuring that every step of our processing meets strict halal standards.</p>
            </div>

            <div className='w-full px-0 rounded-3xl overflow-hidden ring-4 ring-primary/20 ring-offset-2'>
                <Image
                    src={sectionImg}
                    alt='hero image'
                    width={2000}
                    height={2000}
                    className='aspect-[5/4] w-full'
                    placeholder='blur'
                />
            </div>
        </section>
    )
}
