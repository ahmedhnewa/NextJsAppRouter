import * as UnsplashApi from "@/services/api/unsplashApi";
import Image from 'next/image'
import styles from './TopicPage.module.css'
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";
import { capitalizeFirstLetter } from "@/utils/String";

// export const dynamicParams = false
// export const revalidate = 0

interface TopicPageProps {
    params: {
        // got from [topic]
        topic: string,
        // searchParams: { [key: string]: string | string[] | undefined },
    }
}

export function generateStaticParams() {
    return UnsplashApi.staticTopics.map(slug => ({
        topic: slug,
    }))
}

export function generateMetadata({ params: { topic } }: TopicPageProps): Metadata {
    return {
        title: capitalizeFirstLetter(topic),
    }
}

const TopicPage = async ({ params: { topic } }: TopicPageProps) => {
    const unsplashImages = await UnsplashApi.getRandomPhotosBySearchQuery(topic)

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages
                at build time, even though the URL has a dynamic parameter. Pages that are not included
                in generateStaticParams will be fetched & rendered on first access and then
                <strong>cached for subsequent requests</strong> (this can be disabled)
            </Alert>
            <h1>{capitalizeFirstLetter(topic)}</h1>
            {
                unsplashImages.map(image => (
                    <Image
                        key={image.urls.raw}
                        src={image.urls.raw}
                        alt={image.description}
                        width={250}
                        height={250}
                        className={`rounded shadow ${styles.image}`}
                    />
                ))
            }
        </div>
    );
}

export default TopicPage;