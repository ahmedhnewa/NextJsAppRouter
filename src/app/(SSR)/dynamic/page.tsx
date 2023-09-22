import * as UnsplashApi from "@/services/api/unsplashApi";
import type { Metadata } from 'next'
import ImageView from "@/components/image";

export const metadata: Metadata = {
    title: 'Dynamic fetching'
}

// export const revalidate = 0

const DynamicPage = async () => {
    const unsplashImage = await UnsplashApi.getRandomPhoto({
        // cache: 'no-cache', // no-store also works,
        next: {
            revalidate: 0,
        }
    })

    return (
        <ImageView image={unsplashImage}>
            This page <strong>fetches data dynamically</strong>.
            Every time you refresh the page, you get a new image from the Api.
        </ImageView>
    );
}

export default DynamicPage;