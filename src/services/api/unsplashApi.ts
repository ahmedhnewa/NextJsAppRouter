import { UnsplashImage, UnsplashSearchResponse } from "@/models/unsplashImage"
import { UnsplashUser } from "@/models/unsplashUser"
import { notFound } from "next/navigation"

const baseUrl = 'https://api.unsplash.com'
const webpageUrl = 'https://unsplash.com'

// Hardcoded + Not the best solution and not even good
export const staticTopics = [
    'health',
    'fitness',
    'coding',
]

export async function getRandomPhoto(init?: RequestInit) {
    const response = await fetch(`${baseUrl}/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, init)
    const image: UnsplashImage = await response.json()
    return image
}


export async function getRandomPhotosBySearchQuery(searchQuery: string, init?: RequestInit) {
    const response = await fetch(`${baseUrl}/photos/random?query=${searchQuery}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`, init)
    const images: UnsplashImage[] = await response.json()
    return images
}

export async function getUserByUsername(username: string, init?: RequestInit) {
    const response = await fetch(`${baseUrl}/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, init)
    if (response.status === 404) {
        // Bad solution but again the porpuse of this project is to try the app router in next js
        notFound()
    }
    const user: UnsplashUser = await response.json()
    return user
}

export function getUserPageInUnsplashByUsername(username: string) {
    return `${webpageUrl}/${username}`
}

export async function searchForPhotos(searchQuery: string,) {
    const response = await fetch(`${baseUrl}/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const searchResponse: UnsplashSearchResponse = await response.json()
    return searchResponse.results
}