// components/VideoPlayer.tsx
"use client"
import React, { useState } from 'react';


interface Module {
  id: number;
  title: string;
  videoSrc: string;
}

const modules: Module[] = [
  { id: 1, title: 'Module 1', videoSrc: "/ai.mp4" },
  { id: 2, title: 'Module 2', videoSrc: 'path/to/your/second/video.mp4' },
  // Add more modules as needed
];

const VideoPlayer: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string>(modules[0].videoSrc);

  return (
    <div className="flex flex-row">
      <div className="w-full lg:w-2/4">
        <video controls className="w-full" src={currentVideo} />
      </div>
      <div className="w-full lg:w-1/4 flex flex-col">
        {modules.map((module) => (
          <button
            key={module.id}
            className="p-4 text-left hover:text-black hover:bg-gray-100"
            onClick={() => setCurrentVideo(module.videoSrc)}
          >
            {module.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
