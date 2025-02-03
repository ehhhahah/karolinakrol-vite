import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import Bio from './components/Bio'
import List from './components/List'
import ArtworkContainer from './components/ArtworkContainer'
import { Artwork } from './types/components'
import Navigation from './components/Navigation'


// For JSON in public folder
const ARTWORK_DATA_URL = '/data/artworkData.json'

interface HomePageProps {
  isList: boolean
}

const HomePage: React.FC<HomePageProps> = ({ isList }) => {
  const modes = ['home', 'bio', 'posters', 'illustrations', 'publications']
  const [artwork, setArtwork] = useState<Artwork[]>([])
  const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()
  const currentMode = location.pathname.slice(1) || 'home'

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

  const handleModeChange = useCallback((newMode: string) => {
    if (isList) {
      const element = document.getElementById(newMode)
      element?.scrollIntoView({ behavior: 'smooth' })
    }

    if (newMode === currentMode) {
      newMode = 'home'
    }

    navigate(newMode === 'home' ? '/' : `/${newMode}`)
    setBurgerOpen(false)
  }, [isList, currentMode, navigate])

  const toggleBurgerMenu = useCallback(() => {
    setBurgerOpen(prev => !prev)
  }, [])

  return (
    <div id='home-page'>
      <Navigation
        modes={modes}
        isBurgerOpen={isBurgerOpen}
        onModeChange={handleModeChange}
        onToggleBurger={toggleBurgerMenu}
      />
      <Routes>
        <Route path="bio" element={<Bio />} />
        <Route
          path="*"
          element={
            isList ? (
              <List />
            ) : (
              <ArtworkContainer artwork={artwork} currentMode={currentMode} />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default HomePage