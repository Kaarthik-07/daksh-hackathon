import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

interface Module {
  id: number;
  title: string;
  videoSrc: string;
}

const modules: Module[] = [
  { id: 1, title: 'Module 1', videoSrc: "https://example.com/module-1.mp4" },
  { id: 2, title: 'Module 2', videoSrc: 'https://example.com/module-2.mp4' },
  { id: 3, title: 'Module 3', videoSrc: 'https://example.com/ai.mp4' },
  // Corrected the IDs and video sources for uniqueness
];

const VideoPlayer: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string>(modules[0].videoSrc);

  const buttonVariants = {
    hover: { scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-full lg:w-2/4">
          <motion.video controls className="w-full" src={currentVideo} layout transition={{ duration: 0.5 }} />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col">
          {modules.map((module) => (
            <motion.button
              key={module.id}
              className="p-6 text-left hover:text-black hover:bg-gray-100 rounded-md"
              onClick={() => setCurrentVideo(module.videoSrc)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {module.title}
            </motion.button>
          ))}
        </div>
      </div>
      <div className='flex justify-center items-center p-8'>
        <motion.a href="/quiz" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button className='bg-purple-400 w-34 rounded-md p-6 m-8'>
              Quiz
          </button>
        </motion.a>
      </div>
    </>
  );
};

export default VideoPlayer;
