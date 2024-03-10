"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import Framer Motion
import LoadingSpinner from '@/components/loading';
import ChatModule from '../../components/chat'; 

// Define animations
const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

// Define types and interfaces
type Question = {
  question: string;
  options: Record<string, string>;
};

interface Result {
  options: {
    [key: string]: string;
  };
  question: string;
}

interface Props {
  questions: Result[];
}

// Define Results component


// Your component
const Quiz: React.FC = () => {
  const [moduleId, setmoduleId] = useState<number>(0);
  const [submoduleId, setsubmoduleId] = useState<number>(0);
  const [moduleName , setmoduleName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [score , setscore] = useState<number>(0);
  const [count , setcount] = useState(0);
  const [totalscore , settotalscore] = useState(0);
  const [loading , setloading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const info = searchParams.get('info');
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (info) {
          console.log(info);
          
          const { moduleid, submoduleid  , moduleName} = JSON.parse(info);

          setmoduleId(moduleid);
          setsubmoduleId(submoduleid);
          setmoduleName(moduleName);
          const response = await axios.get(`http://localhost:6969/quiz/${moduleid}/${submoduleid}`);
          if (response.data && response.data.data && response.data.data.length > 0) {
            setQuestions(response.data.data[0].questions.questions);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [info]);

  const handleClick = async (score:number) => {
    setcount(count + 1);
    if (count >= 2) {
      if (totalscore >= 20) {
        router.push('/sucess');
      } else {
        router.push('/notsucess');
      }
      return;
    }
    setloading(true);

    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:6969/quiz/results/${moduleId}/${submoduleId}/${score}`);
        if (response && response.data) {
          setResults(response.data.data[0].questions.questions);
          settotalscore(totalscore + score);
          setscore(0);
          setloading(false);
        }
      } catch (err) {
        console.error(err);
        setscore(0);
        setloading(false);
      }
    }, 6000);
  };

  return (
    <motion.div 
      className='container'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className='flex justify-center items-center flex-col'>
          <p className='text-center font-bold '>YOUR SCORE IS {score}</p>
          {score >= 7 ? (
            <>
              <p className='text-center font-semibold'>you seem to be smart, get ready for a harder one. Are you ready?</p>
              <video src="rizz.mp4"  autoPlay controls className="mx-auto mt-4 w-80 h-90" /> 
              <LoadingSpinner/>
            </>
          ) : (
            <>
              <p className='text-center font-semibold'>Better luck next time, try the next one.</p>
              <video src="crying.mp4"  autoPlay controls className="mx-auto mt-4 w-80 h-90" /> 
              <LoadingSpinner/>
            </>
          )}
        </div>
      ) : (
        <motion.div 
          className='quiz-container'
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {questions.length > 0 && (
            <div className=''>

              <h1 className ='text-center'>MODULE NAME : {moduleName}</h1>
              <h2 className='text-right'>Submodule ID: {submoduleId}</h2>

              <div className='p-14 '>
                <div className='flex flex-col justify-center items-center'>

                  <motion.h2
                    className='font-bold'
                    initial={{ x: -100, opacity: 0, rotate: -30 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Quiz Questions
                  </motion.h2>
                  <img src='/aii.png' className='left-0 top-0 ' style={{ width: '60px' }} />                  
                  <motion.h2
                    initial={{ y: -100, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    ROUND {count}

                  </motion.h2>
                 

                </div>
                {results.length > 0 ? (
                  <>
                    {results.map((ele) => (
                      <div className='bg-white divide-y divide-black rounded-xl' key={ele.question}>
                        <h3 className='bg-white text-black'>{'Q.'+ele.question}</h3>
              <p className={`text-black rounded p-3 hover:bg-slate-400 hover:cursor-pointer m-2`} onClick={() =>setscore(score+1)}>{'a. ' + ele.options['a']}</p>
              <p className={`text-black rounded p-3 hover:bg-slate-400 hover:cursor-pointer m-2 `} onClick={() =>setscore(score+2)}>{'b. ' + ele.options['b']}</p>
              <p className={`text-black rounded p-3 hover:bg-slate-400 hover:cursor-pointer m-2 `} onClick={() =>setscore(score+3)}>{'c. ' + ele.options['c']}</p>
              <p className={`text-black rounded p-3 hover:bg-slate-400 hover:cursor-pointer m-2 `} onClick={() =>setscore(score+4)}>{'d. ' + ele.options['d']}</p>
            </div>
                    ))}
                  </>
                ) : (
                  <>
                    {questions.map((ele, index) => (
                      <motion.div
                        key={ele.question}
                        className='bg-white divide-y divide-black rounded-xl'
                        variants={itemVariants}
                        custom={index}
                      >
                        <h1 className='text-black font-bold rounded p-3 hover:cursor-pointer m-2 hover:text-black'>{'Q.' + ele.question}</h1>
                        {Object.entries(ele.options).map(([key, value], index) => (
                          <motion.p
                            key={key}
                            className='text-black rounded p-3 hover:bg-black hover:text-white hover:cursor-point  m-2 hover:cursor-pointer'
                            variants={itemVariants}
                            custom={index}
                            onClick={() => { setscore(score + (index * 2)) }}
                          >
                            {key + '. ' + value}
                          </motion.p>
                        ))}
                      </motion.div>
                    ))}
                  </>
                )}
                <div className='flex justify-center items-center'>
                  <motion.button
                    className='p-4 bg-violet-500 rounded-md'
                    onClick={() => handleClick(score)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Get Results: {score}
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
      <ChatModule />  
    </motion.div>
  );
};

export default Quiz;
