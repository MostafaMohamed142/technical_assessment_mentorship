import React, { useState } from 'react';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isMultiChoice,setIsMultiChoice] = useState(false)
  const[task,setTask] = useState([])

  const addChoice = (choice) => {
    setAnswerOptions([...answerOptions, choice]);
    setAnswers('');
  };

  const handleCheckboxChange = (index, isChecked) => {
    if (isChecked) {
      
      setCorrectAnswers([...correctAnswers, answerOptions[index]]);
    } else {
      
      setCorrectAnswers(correctAnswers.filter((answer) => answer !== answerOptions[index]));
    }
    const numOfSelections = correctAnswers.length + (isChecked ? 1 : -1);
    console.log(numOfSelections)
   
      setIsMultiChoice(numOfSelections > 1);
    
  };
  const handleSubmit =()=>{
    let answersIndex = correctAnswers.map((ans)=> answerOptions.indexOf(ans))
    let field = {
      title: question,
      choices:answerOptions,
      validAnswers:answersIndex
    }
    console.log(field)
    setQuestion('')
    setTask(field)
  }

  return (
    <div>
      <h3>Enter a Question</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a question"
      />
      <h3>Answers</h3>
      <input
        type="text"
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
      />
      <button onClick={() => addChoice(answers)}>Add a Choice</button>

      <h3>Correct Answers</h3>
      <ul>
        {answerOptions.map((ans, index) => (
          <li key={index}>
            {ans}
            <input
              type={isMultiChoice ? 'checkbox' : 'radio'}
              checked={correctAnswers.includes(ans)}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>submit</button>
       {task && (
        <div>
        <span>questionTitle{task.title}</span><br/>
        <span>choices:{task.choices}</span><br/>
        <span>Valid Answers: {task.validAnswers}</span>
        </div>
      )
      } 
    </div>
  );
};

export default QuestionForm;
