import { Artwork } from "../types/components"


const ARTWORK_DATA_URL = '/data/artworkData.json'


const getArtworksData = async (): Promise<Artwork[]> => {
    try {
        const response = await fetch(ARTWORK_DATA_URL)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Artwork[] = await response.json()

        // Add unique id to each artwork object
        return data.map((artwork, index) => ({
            ...artwork,
            id: `artwork-${index}`
        })).sort(() => Math.random() - 0.5)
    } catch (error) {
        console.error('Error fetching or processing artwork data:', error)
        throw error
    }
}

export default getArtworksData