import React, { useState, useEffect } from 'react'
import './List.css'
import Modal from './Modal' // assuming you have a Modal component
import getModePicture from '../utils/getModePicture'

const ARTWORK_DATA_URL = '/data/artworkData.json'

type Artwork = {
  src: string[]
  alt: string
  category: string
  description: string
}

const ArtworkList: React.FC = () => {
  const [artworks, setArtwork] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  useEffect(() => {
    const loadArtwork = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(ARTWORK_DATA_URL)
        const data = await response.json()
        setArtwork(data)
      } catch (error) {
        console.error('Error loading artwork data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArtwork()
  }, [])

  // Group artworks by category
  const groupedArtworks = artworks.reduce((groups, artwork) => {
    if (!groups[artwork.category]) {
      groups[artwork.category] = []
    }
    groups[artwork.category].push(artwork)
    return groups
  }, {} as Record<string, Artwork[]>)

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArtwork(null)
  }

  const getCategoryGroup = (category: string) => {
    const src = getModePicture(category)
    return <img
      className='category-image'
      key={category}
      src={src}
      alt={category}
      id={category}
    />
  }

  return (
    <div className='artwork-list'>
      {isLoading && <div>Loading...</div>}

      {Object.keys(groupedArtworks).map((category) => (
        <div key={category} className='category-group'>
          {getCategoryGroup(category)}
          <div className='artworks'>
            {groupedArtworks[category].map((artwork, index) => (
              <div
                key={index}
                className={`artwork-item ${artwork.category}`}
                onClick={() => handleArtworkClick(artwork)}>
                <div className='artwork-thumbnail'>
                  <img src={artwork.src[0]} alt={artwork.alt} loading='lazy' className='thumbnail' />
                  <span className='artwork-count'>{artwork.src.length} images</span>
                </div>
                <div className='artwork-info'>
                  <span className='artwork-title'>{artwork.alt}</span> -{' '}
                  <span className='artwork-description'>{artwork.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && selectedArtwork && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          description={selectedArtwork.description}
          images={selectedArtwork.src}
        />
      )}
    </div>
  )
}

export default ArtworkList
