import { useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomButton from './task-1/CustomButton'
import QuestionForm from './task-2/QuestionForm';
function App() {
  const [show,setShow] = useState(true)
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const [userOption,setUserOption] = useState()

  const handleOptionSelection = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
    setUserOption(selectedOption.value)
  };
  return (
    <div className="App">
      <button onClick={()=>setShow(!show)}>Switch task</button>
       <div className={show? 'd-block' : 'd-none'} >
        <h4>Custom Button</h4>
      <CustomButton
        Label="Select an option"
        defaultValue={options[0]}
        options={options}
        onSelection={handleOptionSelection}
        className="anystyle"
      />
      {userOption? `you selected ${userOption}` :''}
      </div>
       <div className={show? 'd-none' : 'd-block'}>
        <QuestionForm/>
       </div> 
      
    
    </div>
  );
}

export default App;
