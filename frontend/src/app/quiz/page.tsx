"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import QuizComponent from '@/components/quizcomponent';

type Question = {
  question: string;
  options: Record<string, string>;
  
};
const Quiz: React.FC = () => {
  const [moduleId, setmoduleId] = useState<number>(0);
  const [submoduleId, setsubmoduleId] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Question[]>([]);
  const searchParams = useSearchParams();
  const info = searchParams.get('info');

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (info) {
          const { moduleid, submoduleid } = JSON.parse(info);
          setmoduleId(moduleid);
          setsubmoduleId(submoduleid);
          const response = await axios.get(`http://localhost:6969/quiz/${moduleid}/${submoduleid}`);
          if (response.data && response.data.data && response.data.data.length > 0) {
           // console.log(response.data.data[0].questions.questions);
            
            setQuestions(response.data.data[0].questions.questions);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [info]);
  
  
  const handleClick = async () => {
    try {
      const res = await axios.get(`http://localhost:6969/quiz/results/${moduleId}/${submoduleId}/4`);
      if (res && res.data) {
        setResults(res.data.data);
       // setResults(res.data.data);
        //console.log(typeof res.data.data);

      }
    } catch (err) {
      console.error(err);
    }
  };
  
console.log(typeof questions);

  return (
    <div>
      {moduleId && submoduleId ? (
        <div>
          <h1>Module ID: {moduleId}</h1>
          <h2>Submodule ID: {submoduleId}</h2>
        </div>
      ) : null}
      <div>
        <h1>Quiz</h1>
        {
          questions && 
          (
          <div>
    <h2>Quiz Questions</h2>
    {/* <div>
      <h3>{questions.question}</h3>
      <ul>
        {Object.values(questions.options).map((option, optionIndex) => (
          <li key={optionIndex}>{optionIndex}</li>
        ))}
      </ul>
    </div> */}
    {questions.map((ele) => {

      return (<>
        <h1>{ele.question}</h1>
        <p>{'a. ' + ele.options['a']}</p>
        <p>{'b. ' + ele.options['b']}</p>
        <p>{'c. ' + ele.options['c']}</p>
        <p>{'d. ' + ele.options['d']}</p>
      </>)
    })}
    
  </div>
          )
        }
      </div>
      <button onClick={handleClick}>Get Results</button>
      {

      }
    </div>
  );
};

export default Quiz;
