"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ChatModule = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
      setChatVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      setMessages([...messages, message]);
      const res = await axios.post('http://localhost:6969/quiz/doubt', {
        prompt: message
      });
      setMessages([...messages, res.data.ans]);
      setMessage('');
    }
  };

  return (
    <div ref={chatRef}>
      <motion.img
        src="/aii.png"
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
  );
};

export default ChatModule;
