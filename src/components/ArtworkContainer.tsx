import React, { memo } from 'react'
import DraggableImage from './DraggableImage'
import { Artwork } from '../types/components'


const ArtworkContainer = memo(({ artwork, currentMode }: { artwork: Artwork[], currentMode: string }) => (
    <div className='artwork-container'>
        {artwork.map((image, index) => (
            <DraggableImage
                key={index}
                src={image.src[0]}
                other_srcs={image.src.slice(1)}
                alt={image.alt}
                description={image.description}
                isVisible={image.category === currentMode || currentMode === 'home'}
                index={index}
            />
        ))}
    </div>
))

export default ArtworkContainer