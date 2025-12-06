"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function page() {
  const questions = [
    {
      id: "Q-SAMPLE-1",
      title: "What does the Bible say about prayer?",
      details:
        "I want to understand the biblical foundation for prayer and how I can improve my prayer life.",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      category: "prayer",
      isAnonymous: false,
      date: "2025-11-04",
      status: "answered",
      answer:
        'The Bible teaches that prayer is communication with God. Key verses include Philippians 4:6 ("Do not be anxious about anything, but in everything by prayer and petition, with thanksgiving, present your requests to God.") and 1 Thessalonians 5:17 ("Pray continually"). Prayer should be honest, persistent, and aligned with God\'s will.',
      answeredDate: "2025-11-04",
      answeredBy: "Pastor Femi",
    },
    {
      id: "Q-SAMPLE-2",
      title: "How can I get more involved in church ministry?",
      details:
        "I've been attending for a few months and want to serve more. What opportunities are available?",
      name: "Anonymous",
      email: "anonymous@email.com",
      category: "church-life",
      isAnonymous: true,
      date: "2025-11-04",
      status: "answered",
      answer:
        "We're excited you want to get involved! Start by attending our \"Discover Your Gifts\" workshop on the first Sunday of each month. Current ministry opportunities include: Children's Ministry, Worship Team, Hospitality Team, Small Group Leaders, and Community Outreach. Please stop by the Connect Center this Sunday after service.",
      answeredDate: "2025-11-04",
      answeredBy: "Pastor Femi",
    },
    {
      id: "Q-SAMPLE-3",
      title: "Understanding the Trinity",
      details:
        "I struggle with understanding how God can be three persons in one. Can you help explain this concept?",
      name: "David Martinez",
      email: "david.martinez@email.com",
      category: "doctrine",
      isAnonymous: false,
      date: "2025-11-04",
      status: "pending",
      answer: "",
      answeredDate: "",
      answeredBy: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [finalSearch, setFinalSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredSearch = questions.filter((q) => {
    const search = finalSearch.toLowerCase();
    const matchesSearch = q.title.toLowerCase().includes(search);
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
            <option value="prayer">Prayer & Spiritual Life</option>
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
                <b>{question.title}</b>
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
                <p className="details mb-1">{question.details}</p>
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
