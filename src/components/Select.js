import React, { useState } from "react";

const Select = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Pass the selected option to the parent component
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div
        className={`select-control ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption || "Select Sex"}
        <i className="arrow-icon">&#9660;</i>
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option, index) => (
            <li
              className="option"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
