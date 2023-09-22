"use client"

import { Button } from "react-bootstrap"

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <div>
            <h1>Unknown error</h1>
            {/* Not good for production */}
            <p>Something went wrong, error message: {error.message}</p>
            <Button onClick={reset}>
                Hi
            </Button>
        </div>
    )
}