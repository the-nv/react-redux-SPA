import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function InterviewDelete() {
  let { interviewId } = useParams();

  useEffect(() => {
    async function deleteInterview() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/interviews/${interviewId}`,
          { method: "DELETE" }
        );

        console.log(response);

        window.location = "http://localhost:3006/#/interviews";
      } catch (error) {
        console.log(error);
      }
    }

    deleteInterview()
  });

  return null;
}

export default InterviewDelete;
