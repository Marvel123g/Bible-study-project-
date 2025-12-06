"use client";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Home() {
  // const questions = [
  //   {
  //     id: "Q-SAMPLE-1",
  //     title: "What does the Bible say about prayer?",
  //     details:
  //       "I want to understand the biblical foundation for prayer and how I can improve my prayer life.",
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@email.com",
  //     category: "prayer",
  //     isAnonymous: false,
  //     date: "2025-11-04",
  //     status: "answered",
  //     answer:
  //       'The Bible teaches that prayer is communication with God. Key verses include Philippians 4:6 ("Do not be anxious about anything, but in everything by prayer and petition, with thanksgiving, present your requests to God.") and 1 Thessalonians 5:17 ("Pray continually"). Prayer should be honest, persistent, and aligned with God\'s will.',
  //     answeredDate: "2025-11-04",
  //     answeredBy: "Pastor Femi",
  //   },
  //   {
  //     id: "Q-SAMPLE-2",
  //     title: "How can I get more involved in church ministry?",
  //     details:
  //       "I've been attending for a few months and want to serve more. What opportunities are available?",
  //     name: "Anonymous",
  //     email: "anonymous@email.com",
  //     category: "church-life",
  //     isAnonymous: true,
  //     date: "2025-11-04",
  //     status: "answered",
  //     answer:
  //       "We're excited you want to get involved! Start by attending our \"Discover Your Gifts\" workshop on the first Sunday of each month. Current ministry opportunities include: Children's Ministry, Worship Team, Hospitality Team, Small Group Leaders, and Community Outreach. Please stop by the Connect Center this Sunday after service.",
  //     answeredDate: "2025-11-04",
  //     answeredBy: "Pastor Femi",
  //   },
  //   {
  //     id: "Q-SAMPLE-3",
  //     title: "Understanding the Trinity",
  //     details:
  //       "I struggle with understanding how God can be three persons in one. Can you help explain this concept?",
  //     name: "David Martinez",
  //     email: "david.martinez@email.com",
  //     category: "doctrine",
  //     isAnonymous: false,
  //     date: "2025-11-04",
  //     status: "pending",
  //     answer: "",
  //     answeredDate: "",
  //     answeredBy: "",
  //   },
  // ];

  const [questions, setQuestions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDocs(collection(db, "questions"));
      const list = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setQuestions(list);
    };

    fetchQuestions();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const totalCategory = new Set(questions.map((q) => q.category)).size;
  const filterAnswered = questions.filter((q) => q.status === "answered");
  return (
    <>
      <NavBar handleRefresh={handleRefresh} />
      <div className="user-page">
        <div className="welcome-section d-flex flex-column gap-1 align-center text-center rounded">
          <h1>Welcome to Our Church Q&A Platform</h1>
          <p>
            Find answers to your faith questions, share your doubts, and grow in
            spritual journey
          </p>
          <div className="cta-btn d-flex gap-1 mt-1">
            <Link className="text-decoration-none" href="/ask-questions">
              <button className="rounded-1">Ask Questions</button>
            </Link>
            <button className="rounded-1">Browse Questions</button>
          </div>
        </div>

        <div className="stats mt-2">
          <div className="stat-card d-flex flex-column align-center rounded">
            <b>{questions.length}</b>
            <span>Questions Asked</span>
          </div>
          <div className="stat-card d-flex flex-column align-center rounded">
            <b>{filterAnswered.length}</b>
            <span>Question Answered</span>
          </div>
          <div className="stat-card d-flex flex-column align-center rounded">
            <b>{totalCategory}</b>
            <span>Categories</span>
          </div>
        </div>

        <div className="questionsWrapper">
          {questions.map((q) => (
            <div className="question-card rounded mb-1" key={q.id}>
              <b>{q.question}</b>
              <p className="details mb-1">{q.questionDetails}</p>
              <section className="d-flex justify-space-between align-center">
                <small>Date: {q.date}</small>
                {q.answer === "" ? (
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
                    {q.status}
                  </p>
                )}
              </section>
              {q.answer !== "" && (
                <div className="answer-section rounded">
                  <h3>Answer:</h3>
                  <p>{q.answer}</p>
                  <div className="footer d-flex gap-2">
                    <span>
                      <strong>Answered By:</strong> {q.answeredBy}
                    </span>
                    <span>
                      <strong>Date:</strong> {q.answeredDate}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
