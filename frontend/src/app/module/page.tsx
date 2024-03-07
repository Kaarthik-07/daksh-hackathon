"use client"
import React, { useState } from 'react';
import VideoPlayer from "@/components/modules";
import { motion, AnimatePresence } from "framer-motion";

const Module = () => {
    const [chatVisible, setChatVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]); // Array to store messages

    const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage(''); // Clear the input field after sending a message
        }
    };

    return (
        <>
            <div className="container mx-auto px-8 py-4">
                <h1 className="text-2xl font-bold my-4">Learning Modules</h1>
                <VideoPlayer />
            </div>
            <div className="container mx-auto px-8 py-4">
                <h1 className="text-lg font-bold my-4">An AI Enhanced Modules</h1>
                <p className="my-4 px-4">
                    In this class, you'll learn the basics of storytelling...
                </p>
                <motion.img
                    src="/aii.png" // Make sure you have a chat icon image at this path
                    alt="Chat icon"
                    className="fixed bottom-0 right-0 mb-24 mr-4 w-12 h-12 cursor-pointer"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setChatVisible(!chatVisible)}
                />
                <AnimatePresence>
                    {chatVisible && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed bottom-0 right-0 mb-20 mr-4 bg-white shadow-lg rounded-lg p-4 w-80"
                        >
                            <div className="overflow-y-auto h-64 mb-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className="p-2 bg-gray-100 my-2 rounded text-black">
                                        {msg}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="p-2 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 text-black"
                                autoFocus
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleSendMessage}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Module;
