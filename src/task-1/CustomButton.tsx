import React, { useState } from "react";

interface DropDownOptionProps{
    label : string;
    value : string;
}
interface DropDownProps{
    Label ? : string;
    defaultValue ? : DropDownOptionProps;
    options: Array<DropDownOptionProps>;
    onSelection : (option :DropDownOptionProps)=>void;
    className : string;

}
const Dropdown: React.FC<DropDownProps>  = ({Label,defaultValue ,options,onSelection,className  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      defaultValue ? defaultValue.label : "Select an option"
    );
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionSelect = (option: DropDownOptionProps) => {
      setSelectedValue(option.label);
      setIsOpen(false);
      if (onSelection) {
        onSelection(option);
      }
    };
  
    return (
      <div className={`dropdown ${className}`}>
        <button className="btn btn-secondary" onClick={toggleDropdown}>
          {Label || selectedValue}
        </button>
        {isOpen && (
          <ul className="list-unstyled">
            {options.map((option, index) => (
              <li key={index} className="dropdown-item pe-auto" onClick={() => handleOptionSelect(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      ); 
}

export default Dropdown;