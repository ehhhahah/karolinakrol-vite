import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import Bio from './components/Bio'
import List from './components/List'
import ArtworkContainer from './components/ArtworkContainer'
import { Artwork } from './types/components'
import Navigation from './components/Navigation'
import getArtworksData from './utils/getArtworksData'


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

  const navigationRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Only run this when isBurgerOpen is true (menu is open)
    if (!isBurgerOpen) return;

    if (navigationRef.current || (navigationRef.current !== event.target)) {
      setBurgerOpen(false)
    }
  }, [isBurgerOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    const loadArtwork = async () => {
      setIsLoading(true)
      try {
        const data = await getArtworksData()
        setArtwork(data)
      } catch (error) {
        console.error('Error loading artwork data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArtwork()

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside])

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
    setBurgerOpen(!isBurgerOpen);
  }, [isBurgerOpen]);

  return (
    <div id='home-page'>
      <Navigation
        modes={modes}
        isBurgerOpen={isBurgerOpen}
        onModeChange={handleModeChange}
        onToggleBurger={toggleBurgerMenu}
        ref={navigationRef}
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