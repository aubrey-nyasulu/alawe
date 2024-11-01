import { list } from '@vercel/blob';
import Image from 'next/image';

export default async function Images() {
    async function allImages() {
        const blobs = await list();
        return blobs;
    }
    const images = await allImages();

    return (
        <section>
            hey
            {images.blobs.map((image) => (
                <a href={image.downloadUrl} key={image.downloadUrl}>{image.pathname}</a>
                // <Image
                //     priority
                //     key={image.pathname}
                //     src={image.url}
                //     alt="Image"
                //     width={200}
                //     height={200}
                // />
            ))}
        </section>
    );
}