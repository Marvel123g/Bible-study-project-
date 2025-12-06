import React from "react";
import NavBar from "../components/NavBar";

export default function page() {
  return (
    <>
      <NavBar />
      <div className="about d-flex flex-column">
        <h2 className="text-center">About Our Q&A Platform</h2>
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            This Q&A platform is designed to create a safe and supportive
            environment where members of our church community can ask questions
            about faith, doctrine, and Christian living. We believe that asking
            questions is an important part of spiritual growth.
          </p>
        </div>
        <div className="card">
          <h3>How it Works</h3>
          <div className="list">
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>
                <strong>Ask Questions:</strong> Submit your questions
                anonymously or with your name
              </p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>
                <strong>Get Answers:</strong> Church leadership and
                knowledgeable members provide thoughtful answers
              </p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>
                <strong>Browse & Learn:</strong> Search through existing
                questions and answers
              </p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>
                <strong>Grow together:</strong> Learn from others' questions and
                insights
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Guildlines</h3>
          <div className="list">
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>Be respectful and courteous in all questions and answers</p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>Ask genuine questions seeking understanding</p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>
                Keep questions focused on faith, doctrine, and Christian living
              </p>
            </div>
            <div className="item d-flex gap-1 mt-1">
              <div className="circle"></div>
              <p>Be patient as we work to provide thoughtful responses</p>
            </div>
          </div>
        </div>

        <div className="contact-us text-center mt-2 rounded d-flex flex-column">
          <h2>Contact Us</h2>
          <p>
            If you have about this platform or need additional support, please
            contact:
          </p>
          <span>
            <strong>Email:</strong> questions@gracecommunitychurch.org
          </span>
          <span>
            <strong>Phone:</strong> (555) 123-4567
          </span>
        </div>
      </div>
    </>
  );
}
