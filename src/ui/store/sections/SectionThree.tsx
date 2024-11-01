import Image from "next/image";
import halImg from '@/../public/store/halal.jpeg'

export default function SectionThree() {
    return (
        <section
            className="relative mt-20 w-screen bgpic h-fit min-h-[50vh] grid place-content-center py-8">
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0"></div>
            <div className="z-10 relative w-full max-w-[640px] h-full px-4 ">
                <div className="flex flex-col gap-4 md:gap-8 md:flex-row items-center">
                    <div className="w-24 h-24 md:w-40 md:h-40 rounded-md overflow-hidden bg-red-500">
                        <Image
                            src={halImg}
                            alt="halal img"
                            width={1024}
                            height={1024}
                            className="w-full"
                        />
                    </div>
                    <p className="text-center md:text-left flex-1 text-gray-50 text-2xl font-semibold">Rest assured, all our meat products are 100% halal-certified, meeting the highest standards of halal compliance from farm to table.</p>
                </div>
            </div>
        </section>
    )
}
