"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function page() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDocs(collection(db, "questions"));
      const list = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setQuestions(list);
    };

    fetchQuestions();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [finalSearch, setFinalSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredSearch = questions.filter((q) => {
    const search = finalSearch.toLowerCase();
    const matchesSearch = q.question.toLowerCase().includes(search);
    const matchesCategory =
      filterCategory === "all" || q.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <NavBar />
      <div className="browse-question-page">
        <h2 className="text-center">Browse Questions & Answers</h2>
        <div className="fields d-flex align-center gap-2">
          <div className="input-field rounded">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setFinalSearch(searchTerm)}>search</button>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all"> All Categories</option>
            <option value="bible-study">Bible Study</option>
            <option value="christian-doctrine">Christian Doctrine</option>
            <option value="prayer-life">Prayer & Spiritual Life</option>
            <option value="church-life">Church Life & Community</option>
            <option value="faith">Faith & Doubts</option>
            <option value="christian-living">Christian Living</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="question-grid">
          {filteredSearch.length > 0 ? (
            filteredSearch.map((question) => (
              <div
                className="question-card rounded mb-1 mt-2"
                key={question.id}
              >
                <b>{question.question}</b>
                <div className="sub-section d-flex align-center justify-space-between">
                  <p>{question.name}</p>
                  {question.answer === "" ? (
                    <p
                      className="rounded-1"
                      style={{ backgroundColor: "#d69e2e", color: "white" }}
                    >
                      Pending
                    </p>
                  ) : (
                    <p
                      className="rounded-1"
                      style={{ backgroundColor: "#38a169", color: "white" }}
                    >
                      {question.status}
                    </p>
                  )}
                </div>
                <div className="sub-section-1 d-flex align-center justify-space-between">
                  <p style={{ backgroundColor: "#d69e2e", color: "white" }}>
                    {question.category}
                  </p>
                  <span>{question.date}</span>
                </div>
                <p className="details mb-1">{question.questionDetails}</p>
              </div>
            ))
          ) : (
            <p className="not-found">Not Found</p>
          )}
        </div>
      </div>
    </>
  );
}
