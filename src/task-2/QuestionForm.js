
import { useState } from "react";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionForm = function () {
    var _a = (0, useState)(''), question = _a[0], setQuestion = _a[1];
    var _b = (0, useState)(''), answers = _b[0], setAnswers = _b[1];
    var _c = (0, useState)([]), answerOptions = _c[0], setAnswerOptions = _c[1];
    var _d = (0, useState)(), selectedAnswer = _d[0], setSelectedAnswer = _d[1];
    var _e = (0, useState)([]), correctAnswers = _e[0], setCorrectAnswers = _e[1];
    var _f = (0, useState)(false), isMultiChoice = _f[0], setIsMultiChoice = _f[1];
    var _g = (0, useState)(null), submittedData = _g[0], setSubmittedData = _g[1];
    var addChoice = function (choice) {
        setAnswerOptions(__spreadArray(__spreadArray([], answerOptions, true), [choice], false));
        setAnswers('');
    };
    var handleChoiceChange = function (index, isChecked) {
        if (isMultiChoice) {
            // Handle multiple choice (checkboxes)
            if (isChecked) {
                setCorrectAnswers(__spreadArray(__spreadArray([], correctAnswers, true), [answerOptions[index]], false));
            }
            else {
                setCorrectAnswers(correctAnswers.filter(function (answer) { return answer !== answerOptions[index]; }));
            }
        }
        else {
            // Handle single choice (radio buttons)
            setSelectedAnswer(answerOptions[index]);
        }
    };
    var handleSubmit = function () {
        var answersIndex = correctAnswers.map(function (ans) { return answerOptions.indexOf(ans); });
        var singleAnswerIndex = answerOptions.indexOf(selectedAnswer);
        var field = {
            title: question,
            choices: answerOptions,
            validAnswers: isMultiChoice ? answersIndex : singleAnswerIndex,
        };
        console.log(field);
        setSubmittedData(field);
        setQuestion('');
        setAnswerOptions([]);
        setCorrectAnswers([]);
    };
    return (<div className='question-form'>
      <h3>Enter a Question</h3>
      <div className='d-flex justify-content-center' style={{ width: 'fit-content',
            padding: '10px' }}>
        <input type="text" value={question} onChange={function (e) { return setQuestion(e.target.value); }} placeholder="Enter a question"/>
      <button className={isMultiChoice ? "btn btn-primary ms-2 pressed" : "btn btn-primary ms-2"} onClick={function () { return setIsMultiChoice(!isMultiChoice); }}>Multi</button>
      </div>
      
      <h3>Answers</h3>
      <div className='d-flex justify-content-center' style={{ width: 'fit-content',
            padding: '10px' }}>
         <input type="text" value={answers} onChange={function (e) { return setAnswers(e.target.value); }}/>
      <button onClick={function () { return addChoice(answers); }} className='btn btn-primary ms-2'>Add a Choice</button>
      </div>
     

      <h3>Correct Answers</h3>
      <ul className='list-unstyled'>
        {answerOptions.map(function (ans, index) { return (<li key={index} className='fs-5 p-2'>
            {ans}
            {isMultiChoice ? (<input type='checkbox' checked={correctAnswers.includes(ans)} onChange={function (e) { return handleChoiceChange(index, e.target.checked); }}/>) : (<input type='radio' checked={selectedAnswer === ans} onChange={function () { return handleChoiceChange(index); }}/>)}
          </li>); })}
      </ul>
      <button onClick={handleSubmit} className='btn bg-dark text-white ms-5 mb-1'>submit</button>
      {submittedData && (<div className='answers'>
          <span>questionTitle: <span className='text-dark'>{submittedData.title}</span></span><br />
          <span>choices: <span className='text-dark'>{submittedData.choices.join(', ')}</span></span><br />
          <span>
            Valid Answers:{' '}
            <span className='text-dark'>{submittedData.validAnswers}</span>
            
          </span>
        </div>)}
    </div>);
};
const _default = QuestionForm;
export { _default as default };
