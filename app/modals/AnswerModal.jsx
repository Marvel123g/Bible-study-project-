"use client";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import React, { useState } from "react";

export default function AnswerModal({
  question,
  setOpenAnswerModal,
  refreshTrigger,
}) {
  const [answerInput, setAnswerInput] = useState("");
  const [pastorName, setPastorName] = useState("");

  const handleAnswerQuestion = async (e) => {
    // e.preventDefault();
    try {
      const today = new Date();
      await updateDoc(doc(db, "questions", question.id), {
        answer: answerInput,
        answeredBy: pastorName,
        answeredDate: today.toLocaleDateString(),
        status: "answered",
      });
    } catch (err) {
      alert(err.message);
    }

    setOpenAnswerModal(false);
    refreshTrigger();
  };
  return (
    <div
      className="answerWrapper d-flex align-center justify-center"
      onClick={() => setOpenAnswerModal(false)}
    >
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <div className="heading">
          <h2>Answer Question</h2>
        </div>
        <div className="content">
          <h3>{question.question}</h3>
          <div className="details d-flex  align-center">
            <p>From: {question.name}</p>
            <p>Date: {question.date}</p>
            <p>{question.category}</p>
          </div>

          <div className="answer-question-section">
            <fieldset className="d-flex gap-1 align-center">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                placeholder="Pastor John"
                onChange={(e) => setPastorName(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="your-answer">Your Answer:</label>
              <textarea
                placeholder="Write your answer here"
                onChange={(e) => setAnswerInput(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="ctas d-flex align-center justify-center">
            <button onClick={() => setOpenAnswerModal(false)}>Cancel</button>
            <button onClick={handleAnswerQuestion}>Submit Answer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
