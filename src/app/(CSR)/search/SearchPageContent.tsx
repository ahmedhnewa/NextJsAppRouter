"use client"

import { UnsplashImage } from "@/models/unsplashImage";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import Image from 'next/image'
import styles from './SearchPage.module.css'

const SearchPageContent = () => {
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchQuery = formData.get('searchQuery')?.toString().trim()

        if (!searchQuery) return
        try {
            setSearchResults(null)
            setErrorMessage(null)
            setIsLoading(true)

            const response = await fetch(`/api/search?q=${searchQuery}`)
            const images: UnsplashImage[] = await response.json()

            setSearchResults(images)
        } catch (error) {
            console.error(error)
            setErrorMessage((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Alert>
                This page fetches data <strong>client-side</strong>. In order to not leak
                API Credentials, this request is sent to NextJs <strong>route handler </strong>
                that runs on the server. This route handler then fetches the data from
                the Unsplash API and returns it to the client.
            </Alert>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="searchInput">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control
                        name="searchQuery"
                        placeholder="Enter a search query..."
                    />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={isLoading}>
                    Search
                </Button>
            </Form>

            <div className="d-flex flex-column align-items-center">
                {isLoading &&
                    <Spinner animation="border" />
                }
                {errorMessage && <p>Unknown error: {errorMessage}, please try again or contact the support</p>}
                {searchResults?.length === 0 &&
                    <p>Nothing found. please try a different query.</p>
                }
            </div>

            {searchResults &&
                <>
                    {
                        searchResults.map(image => (
                            <Image
                                key={image.urls.raw}
                                src={image.urls.raw}
                                width={250}
                                height={250}
                                alt={image.description}
                                className={styles.image}
                            />
                        ))
                    }
                </>
            }
        </div>
    );
}

export default SearchPageContent;