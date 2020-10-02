import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InterviewShow() {
  let { interviewId } = useParams();

  const [interview, setInterview] = useState({
    id: "",
    interview_date: "",
    start_time: "",
    end_time: "",
    interviewer: {
      name: "",
      email: "",
    },
    candidate: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    async function fetchInterview() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/interviews/${interviewId}`
        );
        const data = await response.json();
        setInterview(data.interview);
      } catch (error) {
        console.log(error);
      }
    }

    fetchInterview();
  }, [interviewId]);

  return (
    <div>
      <h1>Interview Details</h1>
      <p>
        Date: {interview.interview_date} <br />
        Start Time: {interview.start_time} <br />
        End Time: {interview.end_time}
      </p>

      <h2>Interviewer Details</h2>
      <p>
        Name: {interview.interviewer.name} <br />
        Email: {interview.interviewer.email}
      </p>

      <h2>Candidate Details</h2>
      <p>
        Name: {interview.candidate.name} <br />
        Email: {interview.candidate.email}
      </p>
    </div>
  );
}

export default InterviewShow;
