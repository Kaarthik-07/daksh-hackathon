
// Import necessary modules and components
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import QuizComponent from '@/components/quizcomponent';
import ChatModule from '../../components/chat'; // Import the ChatModule component

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
const Results: React.FC<Props> = ({ questions }) => {
  return (
    <div>
      {/* Render results */}
    </div>
  );
};

// Define Quiz component
const Quiz: React.FC = () => {
  // Define state variables
  const [moduleId, setmoduleId] = useState<number>(0);
  const [submoduleId, setsubmoduleId] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [score , setscore] = useState<number>(0);
  const [count , setcount] = useState(0);
  const [totalscore , settotalscore] = useState(0);
  const [loading , setloading] = useState<boolean>(false);

  // Get search parameters and router
  const searchParams = useSearchParams();
  const info = searchParams.get('info');
  const router = useRouter();

  // Fetch quiz data on component mount
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (info) {
          const { moduleid, submoduleid } = JSON.parse(info);
          setmoduleId(moduleid);
          setsubmoduleId(submoduleid);
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

  // Handle click event for getting results
  const handleClick = async (score:number) => {
    setcount(count + 1);
    if (count >= 2) {
      if (totalscore >= 20) {
        router.push('/success');
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

  // Render Quiz component JSX
  return (
    <>
      {loading ? (
        <>
          <p>YOUR SCORE IS {score}</p>
          {score >= 7 ? (
            <p>you seem to be smart, get ready for a harder one. Are you ready?</p>
          ) : (
            <p>Better luck next time, try the next one.</p>
          )}
        </>
      ) : (
        <>
          <div>
            {moduleId && submoduleId ? (
              <div>
                <h1>Module ID: {moduleId}</h1>
                <h2>Submodule ID: {submoduleId}</h2>
              </div>
            ) : null}
            <div>
              {questions && (
                <div className='p-14'>
                <div >
                  <h2>Quiz Questions</h2>
                  </div>
                  {questions.map((ele) => (
                    <>
                    <div className='bg-white divide-y divide-black '>  
                      <h1 className='text-black font-bold rounded p-3  hover:cursor-pointer m-2 hover:text-blacck'>{'Q.'+ele.question}</h1>
                      <p className='text-black rounded p-3  hover:bg-slate-400 hover:cursor-point hover:text-black m-2' onClick={() => {setscore(score+ 3)}}>{'a. ' + ele.options['a']}</p>
                      <p className='text-black  rounded p-3  hover:bg-slate-400 hover:cursor-pointer  hover:text-black  m-2' onClick={() => {setscore(score+ 1)}}>{'b. ' + ele.options['b']}</p>
                      <p className='text-black  rounded p-3 hover:cursor-pointer  hover:bg-slate-400 hover:text-black  m-2' onClick={() => {setscore(score + 5)}}>{'c. ' + ele.options['c']}</p>
                      <p className='text-black rounded p-3 hover:cursor-pointer  hover:bg-slate-400 hover:text-black  m-2' onClick={() => {setscore(score + 0)}}>{'d. ' + ele.options['d']}</p>
                    </div>
                    </>

                  ))}
                </div>
              )}
            </div>
            <div className='flex justify-center items-center  '>
            <button 
            className ='p-4 bg-violet-500 rounded-md'
            onClick={() => handleClick(score)}>Get Results: {score}</button>
            </div>
          </div>
          <div className='p-14'>
            {results && (
              <>
                {results.map((ele) => (
                  <>
                  <div className='bg-white divide-y divide-black rounded-md'>
                    <h1 className='text-black font-bold rounded p-3  hover:cursor-pointer m-2 hover:text-black'>{'Q.'+ele.question}</h1>
                    <p className='text-black  rounded p-3  hover:cursor-pointer m-2 hover:text-black' onClick={() => {setscore(score+ 3)}}>{'a. ' + ele.options['a']}</p>
                    <p className='text-black  rounded p-3  hover:cursor-pointer m-2 hover:text-black' onClick={() => {setscore(score+ 1)}}>{'b. ' + ele.options['b']}</p>
                    <p className='text-black  rounded p-3  hover:cursor-pointer m-2 hover:text-black' onClick={() => {setscore(score + 5)}}>{'c. ' + ele.options['c']}</p>
                    <p className='text-black rounded p-3  hover:cursor-pointer m-2 hover:text-black' onClick={() => {setscore(score + 0)}}>{'d. ' + ele.options['d']}</p>
                    </div>
                  </>

                ))}
              </>
            )}
          </div>
        </>
      )}
      <ChatModule /> {/* Use the ChatModule component */}
    </>
  );
};

export default Quiz;