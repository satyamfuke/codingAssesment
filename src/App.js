import React, { useState } from "react";
import {QUESTIONS} from './questions.ts'
import './App.css'; 

const questionKeys = Object.keys(QUESTIONS).map(Number);
const App = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(Array(questionKeys.length).fill(null));
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    const newSelectedAnswer = [...selectedAnswer];
    newSelectedAnswer[index] = answer;
    setSelectedAnswer(newSelectedAnswer);
  };

  const calculateScore = () => {
    const yesCount = answers.filter(answer => answer === 'Yes').length;
    const calculatedScore = (yesCount / questionKeys.length) * 100;
    setScore(calculatedScore);

    // Calculate average score
    const totalScore = localStorage.getItem('totalScore') ? parseFloat(localStorage.getItem('totalScore')) : 0;
    const totalRuns = localStorage.getItem('totalRuns') ? parseInt(localStorage.getItem('totalRuns')) : 0;
    const newTotalScore = totalScore + calculatedScore;
    const newTotalRuns = totalRuns + 1;
    const newAverageScore = newTotalScore / newTotalRuns;
    localStorage.setItem('totalScore', newTotalScore);
    localStorage.setItem('totalRuns', newTotalRuns);
    setAverageScore(newAverageScore.toFixed(2));
  };

  const resetState = () => {
    setAnswers([]);
    setSelectedAnswer(Array(questionKeys.length).fill(null));
    setScore(null);
  };

  return (
    <div>
      {score !== null ? (
        <div>
          <p>Your score: {score.toFixed(2)}%</p>
          <p>Average score: {averageScore}%</p>
          <button onClick={resetState}>Restart</button>
        </div>
      ) : (
        <div>
          <h2>Answer Yes or No to the following questions:</h2>
          {questionKeys.map((key, index) => (
            <div key={key}>
              <p>{QUESTIONS[key]}</p>
              <div>
                <button
                  className={`answer-button ${selectedAnswer[index] === 'Yes' ? 'selected-yes' : ''}`}
                  onClick={() => handleAnswer(index, 'Yes')}
                >
                  Yes
                </button>
                <button
                  className={`answer-button ${selectedAnswer[index] === 'No' ? 'selected-no' : ''}`}
                  onClick={() => handleAnswer(index, 'No')}
                >
                  No
                </button>
              </div>
            </div>
          ))}
          <button onClick={calculateScore}>Calculate Score</button>
        </div>
      )}
    </div>
  );
};

export default App;
