import React, { forwardRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import burgerIcon from './../assets/burger.png'
import getModePicture from './../utils/getModePicture'


const Navigation = memo(
    forwardRef<HTMLDivElement, {
        modes: string[]
        isBurgerOpen: boolean
        onModeChange: (mode: string) => void
        onToggleBurger: () => void
    }>(
        ({ modes, isBurgerOpen, onModeChange, onToggleBurger }, ref) => {
            const initial_animation = {
                opacity: 0,
                filter: 'brightness(2)'
            }
            const final_animation = {
                opacity: 1,
                filter: 'none'
            }
            const exit_animation = {
                opacity: 0,
                transition: { duration: 0.3 }
            }
            const button_initial = {
                rotate: 0,
                opacity: 1
            }
            const button_final = {
                opacity: 0,
                rotate: 5
            }
            const button_exit = {
                rotate: 0,
                opacity: 1
            }
            const transition = {
                duration: 0.5,
                ease: 'easeInOut'
            }

            return (
                <header className='navbar' ref={ref}>
                    <motion.div
                        className={`burger-menu-container ${isBurgerOpen ? 'burger-open' : ''}`}
                        initial={initial_animation}
                        animate={final_animation}
                        exit={exit_animation}
                        transition={transition}
                    >
                        <AnimatePresence>
                            <div
                                className="burger-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleBurger()
                                }}
                            >
                                <motion.img
                                    initial={button_initial}
                                    animate={isBurgerOpen ? button_final : button_initial}
                                    exit={button_exit}
                                    onClick={(e) => {
                                        isBurgerOpen && e.stopPropagation();
                                    }}
                                    transition={{ duration: 1 }} src={burgerIcon} alt='burger-menu' width={50} />
                            </div>
                        </AnimatePresence>
                        <AnimatePresence>
                            {isBurgerOpen && (
                                <motion.div
                                    className='menu'
                                    initial={initial_animation}
                                    animate={final_animation}
                                    exit={exit_animation}
                                    transition={transition}
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
                        </AnimatePresence>
                    </motion.div>
                </header>
            )
        })
)
export default Navigation