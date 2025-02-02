import React, { useState, useEffect } from 'react'
import DraggableImage from './components/DraggableImage'
import Bio from './components/Bio'

// Import images correctly using relative paths
import burgerIcon from './assets/burger.png'
import aboutIcon from './assets/texts/about.png'
import publicationsIcon from './assets/texts/publications.png'
import illustrationsIcon from './assets/texts/illustrations.png'
import postersIcon from './assets/texts/posters.png'
import homeIcon from './assets/texts/home.png'

import './App.css'
import List from './components/List'

// For JSON in public folder
const ARTWORK_DATA_URL = '/data/artworkData.json'

interface Artwork {
  src: string
  alt: string
  category: string
  description: string
}
interface HandleModeChange {
  (newMode: string): void
}
interface ModePictureMap {
  [key: string]: string
}

interface HomePageProps {
  isAnimated: boolean
}

const HomePage: React.FC<HomePageProps> = ({ isAnimated }) => {
  const modes: string[] = ['home', 'bio', 'posters', 'illustrations', 'publications']
  const [mode, setMode] = useState<string>('home')
  const [artwork, setArtwork] = useState<Artwork[]>([])
  const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

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

  const handleModeChange: HandleModeChange = (newMode) => {
    if (newMode === mode) {
      newMode = 'home'
    }
    setMode(newMode)
    setBurgerOpen(false)
  }

  const toggleBurgerMenu = () => {
    setBurgerOpen(!isBurgerOpen)
  }

  const getModePicture = (mode: string): string => {
    const modePictureMap: ModePictureMap = {
      bio: aboutIcon,
      posters: postersIcon,
      illustrations: illustrationsIcon,
      publications: publicationsIcon,
      home: homeIcon
    }

    return modePictureMap[mode] || homeIcon
  }

  const createNav = () => {
    return (
      <header className='navbar'>
        <div className='burger-menu-container'>
          <div className='burger-button' onClick={toggleBurgerMenu}>
            <img src={burgerIcon} alt='burger-menu' width={50} />
          </div>
          {isBurgerOpen && (
            <div className='menu'>
              {modes.map((mode_) => (
                <img
                  key={mode_}
                  className={`${mode_ === mode ? 'nav-selected menu-item' : 'menu-item'}`}
                  onClick={() => handleModeChange(mode_)}
                  src={getModePicture(mode_)}
                  alt={mode_}
                />
              ))}
            </div>
          )}
        </div>
        <nav></nav>
      </header>
    )
  }

  return (
    <div id='home-page'>
      {createNav()}
      {mode === 'bio' && <Bio />}
      {isAnimated ? (
        <div className='artwork-container'>
          {artwork.map((image, index) => (
            <DraggableImage
              key={index}
              src={image.src}
              alt={image.alt}
              description={image.description}
              isVisible={image.category === mode || mode === 'home'}
              index={index}
            />
          ))}
        </div>
      ) : (
        <List />
      )}
    </div>
  )
}

export default HomePage
