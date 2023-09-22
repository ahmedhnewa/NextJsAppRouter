import { NextRequest, NextResponse } from "next/server"
import * as UnsplashApi from "@/services/api/unsplashApi";

export async function GET(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('q')

    if (!searchQuery) {
        return NextResponse.json({
            error: 'No query provided.',
        }, { status: 400 })
    }

    const photos = await UnsplashApi.searchForPhotos(searchQuery)

    return NextResponse.json(photos)
}