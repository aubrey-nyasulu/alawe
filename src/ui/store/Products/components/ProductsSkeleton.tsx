import { cx } from "@/lib/utils"

export default function ProductsSkeleton() {
    return (
        <div className='w-full flex flex-col items-center gap-8'>
            <div className='w-full flex flex-wrap gap-8 items-center md:flex-row flex-col justify-center bg-white p-4 rounded-[32px]'>
                {
                    Array.from({ length: 12 }, (_, i) => i).map((i) => (
                        <Card key={i} />
                    ))
                }
            </div>
        </div>
    )
}


function Card() {

    return (
        <div className={cx('w-full md:max-w-[250px] md:min-w-[200px] flex-1 animate-pulse')}>
            <div className='flex-1 w-full rounded-[12px] overflow-hidden ring-1 ring-black/20 ring-offset-2 aspect-[4/3]  '>
            </div>
            <div className='pt-4 px-2 flex gap-4 items-center justify-between'>
                <p className='bg-stone-200 w-24 h-5'></p>

                <p className='bg-stone-200 w-20 h-6'></p>
            </div>

            <div className='p-1 flex gap-4 items-center justify-between mt-2 '>
                <div className="w-20 h-8 bg-stone-200 rounded-full"></div>

                <div className="w-16 h-8 bg-stone-200 rounded-md"></div>
            </div>
        </div>
    )
}