// components/Quiz.tsx
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answerOptions: AnswerOption[];
}

interface Module {
  moduleName: string;
  questions: Question[];
}

const modules: Module[] = [
  {
    moduleName: "Module 1: Quiz for Introduction to Child Labour",
    questions: [
      {
        questionText: "What is the definition of child labour?",
        answerOptions: [
          { answerText: "Children working in safe environments", isCorrect: false },
          { answerText: "Children working within legal limits", isCorrect: false },
          { answerText: "Children engaging in work that is harmful to their health and development", isCorrect: true },
          { answerText: "Children volunteering their time to gain experience", isCorrect: false },
        ],
      },
      {
        questionText: "How prevalent is child labour globally?",
        answerOptions: [
          { answerText: "It only affects a small number of children in developing countries", isCorrect: false },
          { answerText: "It is a rare occurrence in modern societies", isCorrect: false },
          { answerText: "It impacts millions of children around the world", isCorrect: true },
          { answerText: "It is a problem of the past", isCorrect: false },
        ],
      },
      // More questions as needed
    ],
  },
  // More modules as needed
];

const Quiz: React.FC = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < modules[currentModuleIndex].questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className='app w-full max-w-md px-4 py-8 bg-gray-100 text-black shadow-md rounded-lg'>
        {showScore ? (
          <div className='score-section'>You scored {score} out of {modules[currentModuleIndex].questions.length}</div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{modules[currentModuleIndex].questions.length}
              </div>
              <div className='question-text'>{modules[currentModuleIndex].questions[currentQuestion].questionText}</div>
            </div>
            <div className='answer-section grid grid-cols-1 gap-4'>
              {modules[currentModuleIndex].questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={index}
                  onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
                  className='bg-blue-500 text-white p-4 rounded-lg flex justify-center items-center'
                >
                  {answerOption.answerText}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
