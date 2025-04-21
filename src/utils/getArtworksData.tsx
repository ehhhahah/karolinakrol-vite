import { Artwork } from "../types/components"

const ARTWORK_DATA_URL = '/data/artworkData.json'

// Cache for sorted artwork data
let cachedArtworks: Artwork[] | null = null

const getArtworksData = async (): Promise<Artwork[]> => {
    if (cachedArtworks) {
        return cachedArtworks
    }

    try {
        const response = await fetch(ARTWORK_DATA_URL)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Artwork[] = await response.json()

        // Add unique id to each artwork object and sort once
        cachedArtworks = data.map((artwork, index) => ({
            ...artwork,
            id: `artwork-${index}`
            // Shuffle artworks
        })).sort(() => Math.random() - 0.5)

        return cachedArtworks
    } catch (error) {
        console.error('Error fetching or processing artwork data:', error)
        throw error
    }
}

export default getArtworksData