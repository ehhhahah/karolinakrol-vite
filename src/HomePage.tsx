import React, { useState, useEffect } from 'react'
import DraggableImage from './components/DraggableImage'
import { motion } from 'framer-motion'

import Bio from './components/Bio'

// Import images correctly using relative paths
import burgerIcon from './assets/burger.png'

import './App.css'
import List from './components/List'
import getModePicture from './utils/getModePicture'

// For JSON in public folder
const ARTWORK_DATA_URL = '/data/artworkData.json'

interface Artwork {
  src: string[]
  alt: string
  category: string
  description: string
}
interface HandleModeChange {
  (newMode: string): void
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
    if (!isAnimated) {
      // move to id of newMode
      const element = document.getElementById(newMode)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    if (newMode === mode) {
      newMode = 'home'
    }
    setMode(newMode)
    setBurgerOpen(false)
  }

  const toggleBurgerMenu = () => {
    setBurgerOpen(!isBurgerOpen)
    // add to burger-menu-container a blur effect if opened
    // const burgerMenuContainer = document.querySelector('.burger-menu-container')
    // if (burgerMenuContainer) {
    //   burgerMenuContainer.classList.toggle('blur-open')
    // }
  }

  const createNav = () => {
    return (
      <header className='navbar'>
        <motion.div
          className='burger-menu-container'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className='burger-button' onClick={toggleBurgerMenu}>
            <img src={burgerIcon} alt='burger-menu' width={50} />
          </div>
          {isBurgerOpen && (
            <motion.div
              // className='burger-menu-container'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {modes.map((mode_) => (
                <img
                  key={mode_}
                  className={`${mode_ === mode ? 'nav-selected menu-item' : 'menu-item'}`}
                  onClick={() => handleModeChange(mode_)}
                  src={getModePicture(mode_)}
                  alt={mode_}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
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
              src={image.src[0]}
              other_srcs={image.src.slice(1)}
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
