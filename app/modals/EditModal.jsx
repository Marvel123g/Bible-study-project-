"use client";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export default function EditModal({
  question,
  setOpenEditModal,
  refreshTrigger,
}) {
  const [title, setTitle] = useState(question ? question.question : "");
  const [details, setDetails] = useState(
    question ? question.questionDetails : ""
  );
  const [questionCategory, setQuestionCategory] = useState(
    question ? question.category : ""
  );

  const handleEditSubmit = async () => {
    try {
      await updateDoc(doc(db, "questions", question.id), {
        question: title,
        questionDetails: details,
        category: questionCategory,
      });
    } catch (error) {
      alert(error);
    }
    refreshTrigger();
    setOpenEditModal(false);
  };
  return (
    <div
      className="edit-Wrapper d-flex align-center justify-center"
      onClick={() => setOpenEditModal(false)}
    >
      <div className="edit-content" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>Edit Question</h2>
        </div>
        <div className="fields">
          <fieldset className="d-flex flex-column">
            <label htmlFor="question">Question Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="details">Question Details</label>
            <textarea
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </fieldset>

          <fieldset className="d-flex flex-column">
            <label htmlFor="category">Category:</label>
            <select
              value={questionCategory}
              onChange={(e) => setQuestionCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="bible-study">Bible Study</option>
              <option value="christian-doctrine">Christian Doctrine</option>
              <option value="prayer-life">Prayer & Spiritual Life</option>
              <option value="church-life">Church Life & Community</option>
              <option value="faith">Faith & Doubts</option>
              <option value="christian-living">Christian Living</option>
              <option value="others">Others</option>
            </select>
          </fieldset>

          <div className="cta-btns d-flex gap-1">
            <button onClick={() => setOpenEditModal(false)}>Cancel</button>
            <button onClick={handleEditSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
