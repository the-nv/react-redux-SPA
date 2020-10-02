import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function InterviewRow({ interview }) {
    let {path, url} = useRouteMatch()

  return (
    <>
      <tbody>
        <tr>
          <td>{interview.interview_date}</td>
          <td>{interview.start_time}</td>
          <td>{interview.end_time}</td>
          <td>{interview.interviewer.name}</td>
          <td>{interview.interviewer.email}</td>
          <td>{interview.candidate.name}</td>
          <td>{interview.candidate.email}</td>
          <td>
            <Link to={`${url}/${interview.id}`}>show</Link>
          </td>
          <td>
            <Link to={`${url}/${interview.id}/edit`}>edit</Link>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default InterviewRow;
