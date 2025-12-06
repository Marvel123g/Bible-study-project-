import React from "react";

export default function ViewModal({ question, setOpenViewModal }) {
  return (
    <div
      className="viewWrapper d-flex align-center justify-center"
      onClick={() => setOpenViewModal(false)}
    >
      <div className="container rounded">
        <h3>Question: {question.title}</h3>
        <section className="d-flex flex-column">
          <span>From: {question.name}</span>
          <span>Date: {question.date}</span>
          <span>Category: {question.category}</span>
        </section>
        <p>Details: {question.questionDetails}</p>
        <section className="answer">
          {question.answeredBy === "" || question.answeredDate === "" ? (
            <p>This question has not been answered yet</p>
          ) : (
            <>
              <p>Answer: {question.answer}</p>
              <div className="answer-details">
                <p>Answered by: {question.answeredBy}</p>
                <p>Answered on: {question.answeredDate}</p>
              </div>
            </>
          )}
        </section>

        <button onClick={() => setOpenViewModal(false)}>Close</button>
      </div>
    </div>
  );
}
