const response = [
  {
    questions: [
      '{"question": "What is the purpose of traffic rules?", "options": ["A) To create chaos on the roads", "B) To ensure safety and order for all road users", "C) To make driving more fun", "D) To ignore while driving"], "answer": "B) To ensure safety and order for all road users"}',
      '{"question": "What do red traffic lights indicate?", "options": ["A) Speed up", "B) Slow down and proceed with caution", "C) Stop", "D) Ignore and drive through"], "answer": "C) Stop"}',
      '{"question": "Who has the right of way at a roundabout?", "options": ["A) Vehicles entering the roundabout", "B) Vehicles already in the roundabout", "C) Pedestrians crossing the roundabout", "D) Honking vehicles"], "answer": "B) Vehicles already in the roundabout"}',
      '{"question": "Why is it important to wear seatbelts while driving?", "options": ["A) To look cool", "B) To avoid fines", "C) To protect yourself in case of an accident", "D) To break traffic laws"], "answer": "C) To protect yourself in case of an accident"}'
    ]
  }
];

const formattedQuestions:any = [];

response.forEach(item => {
  item.questions.forEach(q => {
    const parsedQuestion = JSON.parse(q);
    const formattedQuestion = `${parsedQuestion.question}\n${parsedQuestion.options.join('\n')}\n`;
    formattedQuestions.push(formattedQuestion);
  });
});

formattedQuestions.forEach((question:string, idx:any) => {
  console.log(`${idx + 1}. ${question}`);
});

//if needed we can use