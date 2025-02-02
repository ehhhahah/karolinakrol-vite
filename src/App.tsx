import React from 'react'
import './App.css'
import logo from './assets/texts/logo.png'
import HomePage from './HomePage'

const App = () => {
  return (
    <div>
      <HomePage />

      <div className='logo'>
        <img src={logo} alt='Karolina Król logo' />
      </div>
    </div>
  )
}

export default App
