"use client"
import React, { useState ,useEffect,useRef} from 'react';
import VideoPlayer from "@/components/modules";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useRouter } from 'next/router';
interface ID{
    moduleid:string
}

const Module = () => {
    
    const [chatVisible, setChatVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]); // Array to store messages
   // const router = useRouter();
    const handleSendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && message.trim() !== '') {
            setMessages([...messages, message]);
             const res = await axios.post('http://localhost:6969/quiz/doubt' ,{
                prompt : message
             } );
             setMessages([...messages , res.data.ans]);
             console.log(res);
             
            setMessage(''); // Clear the input field after sending a message
        }
    };
  const  handleClick = () =>{
    //   const info = {moduleId : 2 , submoduleId : 1};
    //   router.push({
    //     pathname : '/quiz',
    //     query : info
    //   });
  }
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

    return (
        <>
            <div className="container mx-auto px-8 py-4 bg-black">
                <h1 className="text-2xl font-bold my-4">Child Modules</h1>
                <VideoPlayer moduleid='2' onC = {handleClick}  />
            </div>
            <div className="container mx-auto px-8 py-4" ref={chatRef}>
                
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
