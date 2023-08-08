import React, { useState } from 'react';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer,setSelectedAnswer] =useState() 
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isMultiChoice,setIsMultiChoice] = useState(false)
  const [submittedData,setSubmittedData] = useState(null)


  const addChoice = (choice) => {
    setAnswerOptions([...answerOptions, choice]);
    setAnswers('');
  };

  const handleChoiceChange = (index, isChecked) => {
    if (isMultiChoice) {
      // Handle multiple choice (checkboxes)
      if (isChecked) {
        setCorrectAnswers([...correctAnswers, answerOptions[index]]);
      } else {
        setCorrectAnswers(correctAnswers.filter((answer) => answer !== answerOptions[index]));
      }
    } else {
      // Handle single choice (radio buttons)
      setSelectedAnswer(answerOptions[index]);
    }
  };
    
    // const numOfSelections = correctAnswers.length + (isChecked ? 1 : -1);
    // console.log(numOfSelections)
   
    //   setIsMultiChoice(numOfSelections > 1);
    
  
  const handleSubmit =()=>{
    let answersIndex = correctAnswers.map((ans)=> answerOptions.indexOf(ans));
    let singleAnswerIndex = answerOptions.indexOf(selectedAnswer)
    let field = {
      title: question,
      choices:answerOptions,
      validAnswers:isMultiChoice?answersIndex:singleAnswerIndex
    }
    console.log(field)
    setSubmittedData(field)
    setQuestion('')
    setAnswerOptions([]);
    setCorrectAnswers([]);
  }

  return (
    <div className='question-form'>
      <h3>Enter a Question</h3>
      <div className='d-flex justify-content-center' style={{width: 'fit-content',
  padding: '10px'}}>
        <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a question"
      />
      <button className={isMultiChoice? "btn btn-primary ms-2 pressed" : "btn btn-primary ms-2"} onClick={()=>setIsMultiChoice(!isMultiChoice)}>Multi</button>
      </div>
      
      <h3>Answers</h3>
      <div className='d-flex justify-content-center'style={{width: 'fit-content',
  padding: '10px'}} >
         <input
        type="text"
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
      />
      <button onClick={() => addChoice(answers)} className='btn btn-primary ms-2'>Add a Choice</button>
      </div>
     

      <h3>Correct Answers</h3>
      <ul className='list-unstyled'>
        {answerOptions.map((ans, index) => (
          <li key={index} className='fs-5 p-2'>
            {ans}
            {isMultiChoice ? (
              <input
                type='checkbox'
                checked={correctAnswers.includes(ans)}
                onChange={(e) => handleChoiceChange(index, e.target.checked)}
              />
            ) : (
              <input
                type='radio'
                checked={selectedAnswer === ans}
                onChange={() => handleChoiceChange(index)}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className='btn bg-dark text-white ms-5 mb-1'>submit</button>
      {submittedData && (
        <div className='answers'>
          <span>questionTitle: <span className='text-dark'>{submittedData.title}</span></span><br />
          <span>choices: <span className='text-dark'>{submittedData.choices.join(', ')}</span></span><br />
          <span>
            Valid Answers:{' '}
            <span className='text-dark'>{isMultiChoice
              ? submittedData.validAnswers
              : submittedData.validAnswers}</span>
            
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;


