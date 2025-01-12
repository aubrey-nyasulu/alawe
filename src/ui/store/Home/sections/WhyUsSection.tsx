import Image from "next/image";

import HalalImg from '@/../public/store/halal.jpeg'
import FiveStarImg from '@/../public/store/5 star.png'
import Fastdelivery from '@/../public/store/fast delivery.png'

export default function WhyUsSection() {
    return (
        <section
            id='about'
            className='w-[calc(100vw_-_8px)] mx-auto langingpage-container px-4 py-4 lg:px-16 lg:py-12 mt-20 flex flex-col items-center justify-center gap-12 pt-8 bg-white rounded-[32px] shadow-sm ring-4 ring-black/20 ring-offset-2'
        >
            <h2 className='text-3xl font-semibold '>Why Us?</h2>
            <div className='flex gap-8 md:gap-24 items-center md:flex-row flex-col justify-center'>
                <div>
                    <div className='w-40 h-fit rounded-full overflow-hidden'>
                        <Image
                            src={FiveStarImg}
                            alt='HalalImg image'
                            width={2000}
                            height={2000}
                            placeholder='blur'
                            className='w-full aspect-square'
                        />
                    </div>
                    <p className='pt-4 font-semibold text-center'>Best Quality</p>
                </div>

                <div className="w-[1px] h-10 md:h-40 bg-stone-600/40"></div>

                <div>
                    <div className='w-40 h-fit rounded-full overflow-hidden'>
                        <Image
                            src={HalalImg}
                            alt='HalalImg image'
                            width={2000}
                            height={2000}
                            placeholder='blur'
                            className='w-full aspect-square'
                        />
                    </div>
                    <p className='pt-4 font-semibold text-center'>Halaal Certified</p>
                </div>

                <div className="w-[1px] h-10 md:h-40 bg-stone-600/40"></div>

                <div>
                    <div className='w-40 h-fit rounded-full overflow-hidden'>
                        <Image
                            src={Fastdelivery}
                            alt='HalalImg image'
                            width={2000}
                            height={2000}
                            placeholder='blur'
                            className='w-full aspect-square'
                        />
                    </div>
                    <p className='pt-4 font-semibold text-center'>Fast Delivery</p>
                </div>
            </div>
        </section>
    )
}
