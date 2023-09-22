import * as UnsplashApi from "@/services/api/unsplashApi";
import type { Metadata } from 'next'
import ImageView from "@/components/image";

export const metadata: Metadata = {
    title: 'Incremental Static Regeneration'
}

// export const revalidate = 0

const IsrPage = async () => {
    const secondsDuration = 30
    const unsplashImage = await UnsplashApi.getRandomPhoto({
        next: {
            revalidate: secondsDuration,
        }
    })

    return (
        <ImageView image={unsplashImage}>
            This page uses <strong>incremental static regeneration</strong>. A new
            image is fetched every {secondsDuration} seconds (after refreshing the page) and then served from the cache for that duration.
        </ImageView>
    );
}

export default IsrPage;