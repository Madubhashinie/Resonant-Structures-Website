import React from 'react';
import './Quiz.css';

function Quiz({ molecule }) {
  return (
    <section className="quiz-container">
      <h2 className="quiz-title">Quick Quiz</h2>
      <p className="quiz-question">
        Which of these is a valid resonance structure for {molecule}?
      </p>
      <div className="quiz-options">
        <button className="quiz-option">Option A</button>
        <button className="quiz-option">Option B</button>
        <button className="quiz-option">Option C</button>
      </div>
      <p className="quiz-note">
        Note: This is a placeholder. Add actual quiz questions and logic for interactivity.
      </p>
    </section>
  );
}

export default Quiz;
