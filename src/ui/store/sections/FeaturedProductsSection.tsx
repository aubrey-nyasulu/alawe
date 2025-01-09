import Card from "./Card";
import sausageImg from '@/../public/store/sausage.jpg'
import Meance from '@/../public/store/meanced meat.jpg'
import Liver from '@/../public/store/liver.jpg'
import Wings from '@/../public/store/wings.jpg'
import { Button } from "@/tremorComponents/Button";

export default function FeaturedProductsSection() {
    return (
        <section
            id='about'
            className='langingpage-container px-4 lg:p-16 mt-20 flex flex-col items-center justify-center gap-12 pt-8 bg-white rounded-[32px]'
        >
            <h2 className='text-3xl font-semibold '>Explore our popular Products</h2>
            <div className='flex gap-8 items-center'>
                <Card {...{ image: sausageImg, name: 'Sausage', price: 5200 }} />
                <Card {...{ image: Liver, name: 'Liver', price: 4000 }} />
                <Card {...{ image: Meance, name: 'Meance', price: 7500 }} />
                <Card {...{ image: Wings, name: 'Wings', price: 4500 }} />
            </div>

            <Button className="px-8 py-4 rounded-full">More Products</Button>
        </section>
    )
}
