import React from "react";

import './questionBox.css';

const QuestionBox = ({question}) => (
  <div className='question-container'>
    <p className='question-text'>{question}</p>
  </div>
);

export default QuestionBox;
