'use client';
import { useRouter } from 'next/router';
import axios from 'axios';
import { error } from 'console';
import { motion } from 'framer-motion'; // Import Framer Motion
import { useEffect , useState } from 'react';
import { on } from 'stream';
import Link from 'next/link';
interface Module {
  id: number;
  title: string;
  videoSrc: string;
}
interface CourseData {
  id: number;
  name: string;
  description: string;
  course_title: string;
  detailed_course_outline: {
    modules: any[]; // You can define a type for modules if needed
  };
  skills_you_ll_gain: string[];
  what_you_ll_learn: string[];
  earned_points: number;
}

interface ModuleData {
  id: number;
  moduleID: number;
  name: string;
  description: string;
  animations: string[];
  content: {
    topics: any;
    introduction: string;
    module_title: string;
    module_number: number;
  };
}
interface ID{
  moduleid : string,
  onC : ()=>void,
}
const modules: Module[] = [
  { id: 1, title: 'Module 1', videoSrc: "https://example.com/module-1.mp4" },
  { id: 2, title: 'Module 2', videoSrc: 'https://example.com/module-2.mp4' },
  { id: 3, title: 'Module 3', videoSrc: 'https://example.com/ai.mp4' },
  // Corrected the IDs and video sources for uniqueness
];

const VideoPlayer: React.FC<ID> = ({moduleid , onC}) => {
  const [currentVideo, setCurrentVideo] = useState<string>(modules[0].videoSrc);
  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [courseData, setCourseData] = useState<CourseData | null>(null);

  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:6969/modules/${moduleid}`);
      if(res ){
       // console.log(res);
        setCourseData(res.data.data[0]);
        
        
       // setCourseData(res.data[0]);
       
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
  const buttonVariants = {
    hover: { scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  };
  const fetchSubmodules = async (id:number) =>{
   try{
    if(courseData){
    const res = await axios.get(`http://localhost:6969/modules/submodules/${courseData.id}`);
    if(res){
       console.log(res.data.data);
       setModuleData(res.data.data);
    }
    }
   }
   catch(err){
    console.error(err);
   }
  }
  
  const ids = {
    moduleid : courseData?.id,
    submoduleid : 3
  }
 
 
  return (
    <>
      <div className="flex flex-row">
        <div className="w-full lg:w-2/4">
          <motion.video controls className="w-full" src={currentVideo} layout transition={{ duration: 0.5 }} />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col">
          {courseData && 
          <div>
            <motion.button
              key={courseData.id}
              className="p-6 text-left hover:text-black hover:bg-gray-100 rounded-md"
              onClick={() => {}}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {courseData.name}
              
            </motion.button>
            <button className="p-6 text-left hover:text-black hover:bg-gray-100 rounded-md" onClick={() => fetchSubmodules(courseData.id)}>
               SUBMODULES
            </button>
            </div>
          }
         <div>
      {moduleData.map((module) => (
        <div key={module.id}>
          <button className="p-6 text-left text-yellow-300 hover:text-black hover:bg-gray-100 rounded-md">
            {module.name}
          </button>
          
          
          
          {/* Render other properties as needed */}
        </div>
      ))}
    </div>
        </div>
      </div>
      <div className='flex justify-center items-center p-8'>
        
          <Link href={
            {
              pathname : '/quiz',
              query : {info : JSON.stringify(ids)}
            }

          } className='bg-purple-400 w-34 rounded-md p-6 m-8'
          >Quiz</Link>
          
              
          
      
      </div>
      <div>
      {courseData && (
        <div className='text-white'>
          <h1>{courseData.name}</h1>
          <p>{courseData.description}</p>
         
        </div>
      )}
    </div>
    </>
  );
};

export default VideoPlayer;
