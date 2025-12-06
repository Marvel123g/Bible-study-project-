"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function page() {
  const [question, setQuestion] = useState("");
  const [questionDetails, setQuestionDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [tick, setTick] = useState("");

  const clearForm = () => {
    setQuestion("");
    setQuestionDetails("");
    setName("");
    setEmail("");
    setCategory("");
  };

  const route = useRouter();

  const handlePostQuestions = async (e) => {
    e.preventDefault();

    const today = new Date();
    await addDoc(collection(db, "questions"), {
      question,
      questionDetails,
      name: tick ? "Anonymous" : name,
      email: tick ? "anonymous@gmail.com" : email,
      category,
      date: today.toLocaleDateString(),
      status: "pending",
      answer: "",
      answeredBy: "",
      answeredDate: "",
      // timestamp: Date.now(),
    });
    clearForm();
    route.push("/dashboard");
  };

  return (
    <>
      <NavBar />
      <div className="question-page d-flex flex-column align-center">
        <h1>Ask Your Question</h1>
        <p>
          We're to help you grow your faith. No question is too small or too
          big.
        </p>
        <form className="mt-2">
          <fieldset>
            <label htmlFor="your-question">Your Question</label>
            <input
              type="text"
              placeholder="What would you like to know?"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="question-details">Question Details(Optional)</label>
            <textarea
              type="text"
              placeholder="Please provide more details about your question..."
              value={questionDetails}
              onChange={(e) => setQuestionDetails(e.target.value)}
            />
          </fieldset>
          <section className="d-flex gap-2">
            <fieldset>
              <label htmlFor="your-name">Your Name</label>
              <input
                type="text"
                placeholder="Your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="your-email">Your Email</label>
              <input
                type="text"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </section>

          <div className="category">
            <label htmlFor="category">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" selected disabled>
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
          </div>

          <div className="checkbox-section d-flex gap-1 mt-1">
            <input
              type="checkbox"
              value={tick}
              onChange={(e) => setTick(e.target.checked)}
            />
            <span>Ask anonymously(your name won't be displayed)</span>
          </div>

          <div className="form-btns d-flex justify-center gap-1 mb-1">
            <button onClick={handlePostQuestions}>Submit Question</button>
            <button onClick={clearForm}>Clear Form</button>
          </div>
        </form>
      </div>
    </>
  );
}
