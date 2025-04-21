import React, { memo } from 'react'
import DraggableImage from './DraggableImage'
import { Artwork } from '../types/components'


const ArtworkContainer = memo(({ artwork, currentMode }: { artwork: Artwork[], currentMode: string }) => (
    <div className='artwork-container'>
        {artwork.map((image, index) => (
            <DraggableImage
                key={index}
                src={image.thumbnail}
                other_srcs={image.src}
                alt={image.alt}
                description={image.description}
                isVisible={image.category === currentMode || (currentMode === 'home' && image.isOnHomepage)}
                index={index}
                allow_delay={currentMode === 'home'}
            />
        ))}
    </div>
))

export default ArtworkContainer