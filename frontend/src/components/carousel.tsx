"use client"
import Image from 'next/image';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CarouselProps {
    image: string;
}

const Carousel: React.FC<CarouselProps> = ({ image }) => {
    const [showOverlay, setShowOverlay] = React.useState(true); 

    return (
        <motion.div
            className='relative overflow-hidden h-[200px] min-w-[200px] bg-slate-400 rounded-xl flex justify-cente items-center r'
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className='absolute inset-0 z-10 flex justify-center items-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className='absolute bg-black pointer-events-none opacity-50 h-full' />
                        <motion.h1
                            className='bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap[0.5 ch] hover:opacity-75'
                            initial={{ y: 10 }}
                            animate={{ y: 0 }}
                            exit={{ y: 10 }}
                        >
                            <a href="/about" className='text-black'>Explore now</a>
                            <img src="/arrow.png" className='w-4 h-4' alt="Arrow" />
                        </motion.h1>

                    </motion.div>
                )}
            </AnimatePresence>
            <Image src={image} alt={image} fill style={{ objectFit: 'cover', opacity: showOverlay ? 0.5 : 1 }} />
        </motion.div>
    );
}

export default Carousel;
