import * as UnsplashApi from "@/services/api/unsplashApi";
import type { Metadata } from 'next'
import ImageView from "@/components/image";

export const metadata: Metadata = {
    title: 'Static fethcing'
}

const StaticPage = async () => {
    const unsplashImage = await UnsplashApi.getRandomPhoto()

    return (
        <ImageView image={unsplashImage}>
            This page <strong>fetches and caches data at build time.</strong> Even though the 
                The Api always returns a new image, we see the same image after refreshing the page
                until we compile the project again.
        </ImageView>
    );
}

export default StaticPage;