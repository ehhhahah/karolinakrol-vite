import React, { useState } from 'react'
import './App.css'
import logo from './assets/texts/logo.png'
import kot from './assets/kot.png'
import HomePage from './HomePage'
import useSound from 'use-sound'

const SOUND_1_URL = 'sounds/469066.wav'

const App = () => {
  const [isAnimated, setIsAnimated] = useState(true)
  const [play] = useSound(SOUND_1_URL)

  return (
    <div>
      <HomePage isAnimated={isAnimated} />
      <div className='logo'>
        <img src={logo} alt='Karolina Król logo' />
      </div>
      <div className='cat' onClick={() => play()}>
        <img src={kot} alt='cat' />
      </div>
      <div className='toggle-animations'>
        <label>
          <input type='checkbox' checked={isAnimated} onChange={(e) => setIsAnimated(e.target.checked)} />
          Animate
        </label>
      </div>
    </div>
  )
}

export default App
