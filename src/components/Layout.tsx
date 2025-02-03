import React from 'react'
import './../styles/App.css'
import logo from './../assets/texts/logo.png'
import kot from './../assets/kot.png'
import useSound from 'use-sound'

const SOUND_CAR_URL = 'sounds/729027.mp3'


const Layout = ({ children }: { children: React.ReactNode }) => {
    const [playCat] = useSound(SOUND_CAR_URL)

    return (
        <>
            {children}
            <div className='logo' onClick={() => playCat()}>
                <img src={logo} alt='Karolina Król logo' />
            </div>
            <div className='cat' onClick={() => playCat()}>
                <img src={kot} alt='cat' onClick={() => playCat()} />
            </div>
        </>
    )
}

export default Layout