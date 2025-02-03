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
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <div className='burger-button' onClick={onToggleBurger}>
                    <img src={burgerIcon} alt='burger-menu' width={50} />
                </div>
                {isBurgerOpen && (
                    <motion.div
                        className='menu'
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
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
        </header>
    )
})

export default Navigation