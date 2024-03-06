"use client"
import React, { useState } from 'react';
import VideoPlayer from "@/components/modules";
import { motion, AnimatePresence } from "framer-motion";

const Module = () => {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');


    return (
        <>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold my-4">Learning Modules</h1>
                <VideoPlayer />
            </div>
            <div className="container mx-auto px-4">
                <h1 className="text-lg font-bold my-4">An AI Enhanced Modules</h1>
                <h2 className="text-md my-4">Description</h2>
                <h3 className="my-4">
                    In this class, you'll learn the basics of storytelling, including how to build characters, develop a plot, and create a compelling narrative that will engage your audience. You'll also learn about different types of stories, such as horror, romance, 
                    and science fiction, and how to adapt your style to fit the genre. Whether you're an aspiring novelist or just want to improve your writing skills, this class will help you become a better storyteller.
                </h3>
                <motion.img
                    src="/aii.png"
                    alt="Descriptive text"
                    className="fixed bottom-0 right-0 mb-4 ml-4 w-24    "
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setInputVisible(!inputVisible)}
                />
                <AnimatePresence>
                    {inputVisible && (

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className="fixed bottom-0 right-0 mb-20 mr-4"
                        >
                            <input
                                type="text"
                                className="p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 text-black"
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className='flex justify-end items-end'>
                <button className='bg-purple-400 w-34 rounded-md p-2 '>
                    Quiz
                </button>
            </div>
        </>
    );
};

export default Module;
