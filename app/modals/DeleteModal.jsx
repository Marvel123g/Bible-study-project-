"use client";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function DeleteModal({
  question,
  setOpenDeleteModal,
  refreshTrigger,
}) {
  const handleCloseDeletion = () => {
    setOpenDeleteModal(false);
  };

  const handleDeletion = async () => {
    await deleteDoc(doc(db, "questions", question.id));
    handleCloseDeletion();
    refreshTrigger();
  };
  return (
    <div
      className="delete-Wrapper d-flex align-center justify-center"
      onClick={handleCloseDeletion}
    >
      <div className="delete-content d-flex flex-column align-center">
        <FiAlertCircle size={50} color="red" className="mb-1" />
        <p>Are you sure you want this question?</p>
        <p>This action cannot be undone.</p>

        <div className="btns">
          <button onClick={handleCloseDeletion}>Cancel</button>
          <button onClick={handleDeletion}>Delete</button>
        </div>
      </div>
    </div>
  );
}
