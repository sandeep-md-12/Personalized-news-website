import React, { useState } from 'react';
import './Riddle.css';

const questions = [
  {
    question: 'What has keys but can’t open locks?',
    options: ['Keyboard', 'Piano', 'Car', 'Safe'],
    answer: 0
  },
  {
    question: 'What has a heart that doesn’t beat?',
    options: ['Robot', 'Artichoke', 'Zombie', 'Vampire'],
    answer: 1
  },
  {
    question: 'What starts with an E, ends with an E, but only contains one letter?',
    options: ['Envelope', 'Eagle', 'Eve', 'Erase'],
    answer: 0
  },
  {
    question: 'What is so fragile that saying its name breaks it?',
    options: ['Glass', 'Bubble', 'Silence', 'Heart'],
    answer: 2
  },
  {
    question: 'What goes through cities and fields, but never moves?',
    options: ['Road', 'River', 'Airplane', 'Train'],
    answer: 0
  }
];

const Riddle = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextClick = () => {
    if (selectedOptionIndex === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleTryAgainClick = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="riddle">
      <h1 className="heading">RIDDLE</h1>
      <div className="container3">
        <div className="progress-bar">
          {questions.map((_, index) => (
            <div key={index} className={`progress-item ${index <= currentQuestionIndex ? (index < currentQuestionIndex ? (index < score ? 'correct' : 'incorrect') : '') : ''}`}></div>
          ))}
        </div>
        {showScore ? (
          <div className="score">
            <div>You scored {score} out of {questions.length}!</div>
            {score === questions.length ? (
              <div>Congratulations! 🎉</div>
            ) : (
              <button onClick={handleTryAgainClick}>Try Again</button>
            )}
          </div>
        ) : (
          <>
            <div className="question-number">{currentQuestionIndex + 1}/{questions.length}</div>
            <div className="question">{questions[currentQuestionIndex].question}</div>
            <div className="options">
  {questions[currentQuestionIndex].options.map((option, index) => (
    <div key={index} className={`option card ${index === selectedOptionIndex ? 'selected' : ''}`}>
      <div className="card-body" onClick={() => handleOptionClick(index)}>
        {option}
      </div>
    </div>
  ))}
</div>


            <button className="next" onClick={handleNextClick}>Next</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Riddle;
