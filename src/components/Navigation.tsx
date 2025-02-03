import React, { memo } from 'react'
import { motion } from 'framer-motion'
import burgerIcon from './../assets/burger.png'
import getModePicture from './../utils/getModePicture'


const Navigation = memo(({
    modes,
    isBurgerOpen,
    onModeChange,
    onToggleBurger
}: {
    modes: string[]
    isBurgerOpen: boolean
    onModeChange: (mode: string) => void
    onToggleBurger: () => void
}) => {
    return (
        <header className='navbar'>
            <motion.div
                className={`burger-menu-container ${isBurgerOpen ? 'burger-open' : ''}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <div className='burger-button' onClick={onToggleBurger}>
                    <img src={burgerIcon} alt='burger-menu' width={50} />
                </div>
                {isBurgerOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {modes.map((mode) => (
                            <img
                                key={mode}
                                className='menu-item'
                                onClick={() => onModeChange(mode)}
                                src={getModePicture(mode)}
                                alt={mode}
                            />
                        ))}
                    </motion.div>
                )}
            </motion.div>
            <nav></nav>
        </header>
    )
})

export default Navigation