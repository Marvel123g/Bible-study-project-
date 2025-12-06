"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ViewModal from "../modals/ViewModal";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import AnswerModal from "../modals/AnswerModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const Button = styled.button`
  background-color: ${(props) => props.bg};
  color: white;
  border: none;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function page() {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAnswerModal, setOpenAnswerModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [question, setQuestion] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenViewModal = (selectedQuestion) => {
    setOpenViewModal(true);
    setSelectedCard(selectedQuestion);
  };
  const handleOpenEditModal = (selectedQuestion) => {
    setOpenEditModal(true);
    setSelectedCard(selectedQuestion);
  };
  const handleOpenDeleteModal = (selectedQuestion) => {
    setOpenDeleteModal(true);
    setSelectedCard(selectedQuestion);
  };
  const handleOpenAnswerModal = (selectedQuestion) => {
    setOpenAnswerModal(true);
    setSelectedCard(selectedQuestion);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDocs(collection(db, "questions"));
      const list = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setQuestion(list);
      console.log(list);
    };
    fetchQuestions();
  }, [refreshTrigger]);

  const refreshQuestions = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const filterPending = question.filter((q) => q.status === "pending");
  const filterAnswered = question.filter((q) => q.status === "answered");

  return (
    <div className="admin-page">
      <nav className="d-flex justify-space-between align-center">
        <div className="item d-flex align-center">
          <img src="./images/rcf-logo-white.png" alt="" />
          <h1>RCF Q&A Admin Panel</h1>
        </div>
        <button>Logout</button>
      </nav>

      <div className="stats d-flex align-center gap-2">
        <div className="stat-card rounded d-flex flex-column align-center gap-1">
          <p className="number">{question.length}</p>
          <span>Total Questions</span>
        </div>
        <div className="stat-card rounded d-flex flex-column align-center gap-1">
          <p className="number">{filterPending.length}</p>
          <span>Pending Answers</span>
        </div>
        <div className="stat-card rounded d-flex flex-column align-center gap-1">
          <p className="number">{filterAnswered.length}</p>
          <span>Answered Questions</span>
        </div>
      </div>

      <div className="action-section d-flex gap-2">
        <div className="input-section rounded">
          <input type="text" placeholder="Search Question" />
          <button>search</button>
        </div>

        <select>
          <option value="all">All Questions</option>
          <option value="pending">Pending Only</option>
          <option value="answered">Answered Only</option>
        </select>

        <select>
          <option value="all">All Categories</option>
          <option value="bible-study">Bible Study</option>
          <option value="christian-doctrine">Christian Doctrine</option>
          <option value="prayer">Prayer & Spiritual Life</option>
          <option value="church-life">Church Life & Community</option>
          <option value="faith">Faith & Doubts</option>
          <option value="christian-living">Christian Living</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="question-wrapper rounded">
        {question.map((q) => (
          <div className="card rounded" key={q.id}>
            <div className="question d-flex justify-space-between align-start">
              <div className="question-content">
                <h3>{q.question}</h3>
                <div className="sub-section d-flex align-center justify-space-between">
                  <div className="section-left d-flex gap-2">
                    <p>
                      <strong>From:</strong> {q.name}
                    </p>
                    <p>
                      <strong>Date:</strong> {q.date}
                    </p>
                  </div>
                  {q.answer === "" ? (
                    <p
                      className="rounded-1"
                      style={{
                        backgroundColor: "#d69e2e",
                        color: "white",
                        padding: "2px 6px",
                      }}
                    >
                      Pending
                    </p>
                  ) : (
                    <p
                      className="rounded-1"
                      style={{
                        backgroundColor: "#38a169",
                        color: "white",
                        padding: "2px 6px",
                      }}
                    >
                      {q.status}
                    </p>
                  )}
                </div>
                <p className="details mb-1">{q.questionDetails}</p>
              </div>

              {q.answer === "" ? (
                <div className="actions d-flex gap-1">
                  <Button bg="#38a169" onClick={() => handleOpenAnswerModal(q)}>
                    Answer
                  </Button>
                  <Button bg="#2c5282" onClick={() => handleOpenEditModal(q)}>
                    Edit
                  </Button>
                  <Button bg="#919191ff" onClick={() => handleOpenViewModal(q)}>
                    View
                  </Button>
                  <Button
                    bg="rgba(252, 64, 64, 1)"
                    onClick={() => handleOpenDeleteModal(q)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="actions d-flex gap-1">
                  <Button bg="#2c5282" onClick={() => handleOpenEditModal(q)}>
                    Edit
                  </Button>
                  <Button bg="#919191ff" onClick={() => handleOpenViewModal(q)}>
                    View
                  </Button>
                  <Button
                    bg="rgb(252, 64, 64)"
                    onClick={() => handleOpenDeleteModal(q)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {q.answer !== "" && (
              <div className="answer-section rounded">
                <h3>Answer:</h3>
                <p className="answer">{q.answer}</p>
                <div className="answer-footer d-flex gap-2">
                  <p>
                    <strong>Answered by:</strong> {q.answeredBy}
                  </p>
                  <p>
                    <strong>Date:</strong> {q.answeredDate}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {openViewModal && (
        <ViewModal
          question={selectedCard}
          setOpenViewModal={setOpenViewModal}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          question={selectedCard}
          setOpenDeleteModal={setOpenDeleteModal}
          refreshTrigger={refreshQuestions}
        />
      )}
      {openEditModal && (
        <EditModal
          question={selectedCard}
          setOpenEditModal={setOpenEditModal}
          refreshTrigger={refreshQuestions}
        />
      )}
      {openAnswerModal && (
        <AnswerModal
          question={selectedCard}
          setOpenAnswerModal={setOpenAnswerModal}
          refreshTrigger={refreshQuestions}
        />
      )}
    </div>
  );
}
