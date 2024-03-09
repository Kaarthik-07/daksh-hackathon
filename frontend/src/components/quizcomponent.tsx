
  type Question = {
    question: string;
    options: Record<string, string>;
    
  };
  export interface QuizComponentProps {
    questions: Question[];
    question : string;
  }

const QuizComponent: React.FC<QuizComponentProps> = ({ questions }:any) => {
    return (
<>
<div>
    <h2>Quiz Questions</h2>
    <div>
      <h3>{questions.question}</h3>
      <ul>
        {Object.values(questions.options).map((option, optionIndex) => (
          <li key={optionIndex}>{optionIndex}</li>
        ))}
      </ul>
    </div>
  </div>

  
</>
    );
  };

  export default QuizComponent;