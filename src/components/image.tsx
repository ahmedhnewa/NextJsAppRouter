import { UnsplashImage } from "@/models/unsplashImage";
import { Alert } from "@/components/bootstrap";
import Image from 'next/image'
import Link from "next/link";
import { ReactNode } from "react";

interface ImageViewProps {
    image: UnsplashImage,
    children: ReactNode
}

const ImageView = ({ image, children }: ImageViewProps) => {
    const width = Math.min(500, image.width)
    const height = (width / image.width) * image.height
    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                {children}
            </Alert>
            <Image
                src={image.urls.raw}
                alt={image.description}
                height={height}
                width={width}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={`/users/${image.user.username}`}>
                {image.user.username}
            </Link>
        </div>
    );
}

export default ImageView;