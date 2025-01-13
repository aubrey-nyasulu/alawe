import Card from "./Card";
import sausageImg from '@/../public/store/sausage.jpg'
import Meance from '@/../public/store/meanced meat.jpg'
import Liver from '@/../public/store/liver.jpg'
import Wings from '@/../public/store/wings.jpg'
import { Button } from "@/tremorComponents/Button";
import Link from "next/link";

export default function FeaturedProductsSection() {
    return (
        <section
            id='about'
            className='w-[calc(100vw_-_8px)] mx-auto langingpage-container px-4 py-4 lg:px-8 lg:py-12 mt-20 flex flex-col items-center justify-center gap-12 pt-8 bg-white rounded-[32px] shadow-sm ring-4 ring-black/20 ring-offset-2'
        >
            <h2 className='text-3xl font-semibold text-center '>Explore our popular Products</h2>
            <div className='flex gap-8 items-center md:flex-row flex-col justify-center'>
                <Card {...{ image: sausageImg, name: 'Beef Sausages', price: 6500 }} />
                <Card {...{ image: Liver, name: 'Liver Beef', price: 4500 }} />
                <Card {...{ image: Meance, name: 'Minced Beef', price: 7500 }} />
                <Card {...{ image: Wings, name: 'Chicken Wings', price: 4500 }} />
            </div>

            <Link
                href='/products'
                className="w-fit h-fit"
            >
                <Button className='px-8 py-4 w-fit h-fit bg-primary rounded-full text-white ring ring-offset-2 ring-primary/30 hover:ring-orange-700' >More Products</Button>
            </Link>
        </section>
    )
}
