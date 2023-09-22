import { Alert } from "@/components/bootstrap";
import * as UnsplashApi from "@/services/api/unsplashApi";
import { Metadata } from "next";
// import { cache } from "react";

interface UserPageProps {
    params: { username: string, },
}

export async function generateMetadata({ params: { username } }: UserPageProps): Promise<Metadata> {
    const user = await UnsplashApi.getUserByUsername(username)
    return {
        title: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username,
    }
}

// Use cache if you are're not using the native fetch function
// const getCachedUser = cache(UnsplashApi.getUserByUsername)

export default async function UserPage({ params: { username } }: UserPageProps) {
    // Will get the value from the previous call by next js automatically
    const user = await UnsplashApi.getUserByUsername(username)

    return (
        <div>
            <Alert>
                This profile page uses <strong>generateMetadata</strong> to set the page title
                dynamically from the API response.
            </Alert>

            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={UnsplashApi.getUserPageInUnsplashByUsername(user.username)}>Unsplash profile</a>
        </div>
    )
}