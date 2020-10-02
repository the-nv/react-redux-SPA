import React, { useState, useEffect } from "react";
import { serialize } from "object-to-formdata";
import { useParams } from "react-router-dom";

async function fetchInterview(interviewId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/interviews/${interviewId}`
    );

    const data = await response.json();

    return data.interview;
  } catch (error) {
    console.log(error);
  }
}

function InterviewEdit() {
  let { interviewId } = useParams();

  const initialState = {
    interviews_users_attributes: {
      0: {
        users: {
          name: "",
          email: "",
        },
      },
      1: {
        users: {
          name: "",
          email: "",
          resume: "",
        },
      },
      interview_date: "2020-03-2020",
      start_time: "12:00",
      end_time: "",
      id: ""
    },
  };

  const [interview, setInterview] = useState(initialState);

  useEffect(() => {
    async function get() {
      const init = await fetchInterview(interviewId);

      console.log(init)

      setInterview({
        interviews_users_attributes: {
          0: {
            users: {
              name: init.interviewer.name,
              email: init.interviewer.email,
            },
          },
          1: {
            users: {
              name: init.candidate.name,
              email: init.candidate.email,
              resume: "",
            },
          },
          interview_date: "2020-03-20",
          start_time: init.start_time,
          end_time: init.end_time,
          id: interviewId
        },
      });
    }

    get();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById(
      "interview_interviews_users_attributes_1_users_resume"
    );
    console.log(fileInput.files[0]);

    const update = { interview: interview };
    const formData = serialize(update);
    formData.set(
      "interview[interviews_users_attributes][1][users][resume]",
      fileInput.files[0],
      interview.interviews_users_attributes[1].users.resume.replace(
        "C://fakepath//",
        ""
      )
    );

    try {
      const response = await fetch(`http://localhost:3000/api/v1/interviews/${interviewId}`, {
        method: "PATCH",
        body: formData,
      });

      console.log(response);
      window.location = "http://localhost:3006/#/interviews/";
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case "interviewer_name":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: e.target.value,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: interview.end_time,
          id: interviewId
        });
        break;

      case "interviewer_email":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: e.target.value,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: interview.end_time,
          id: interviewId
        });
        break;

      case "candidate_name":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: e.target.value,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: interview.end_time,
          id: interviewId
        });
        break;

      case "candidate_email":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: e.target.value,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: interview.end_time,
          id: interviewId
        });
        break;

      case "candidate_resume":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: e.target.value,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: interview.end_time,
          id: interviewId
        });
        break;

      case "start_time":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          end_time: interview.end_time,
          start_time: e.target.value,
          id: interviewId
        });
        break;

      case "interview_date":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: e.target.value,
          end_time: interview.end_time,
          start_time: interview.start_time,
          id: interviewId
        });
        break;

      case "end_time":
        setInterview({
          interviews_users_attributes: {
            0: {
              users: {
                name: interview.interviews_users_attributes[0].users.name,
                email: interview.interviews_users_attributes[0].users.email,
              },
            },
            1: {
              users: {
                name: interview.interviews_users_attributes[1].users.name,
                email: interview.interviews_users_attributes[1].users.email,
                resume: interview.interviews_users_attributes[1].users.resume,
              },
            },
          },
          interview_date: interview.interview_date,
          start_time: interview.start_time,
          end_time: e.target.value,
          id: interviewId
        });
        break;
      default:
        setInterview({ ...interview });
    }
  };

  return (
    <div>
      <h1>NEW Interview</h1>

      <form
        className="simple_form new_interview"
        id="new_interview"
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="authenticity_token"
          value="Qp/tpOIf5lmsd0MAr0b/FNJHza204kHVQvy8EOikF7IZbru1xfR9Pt00KquU3/Yek7zT/4+JfXN5yVmw4LK10A=="
        ></input>

        <h3>Interviewer Details</h3>
        <p>
          <label htmlFor="interview_interviews_users_attributes_0_users_Name">
            <abbr title="required">*</abbr> Name
          </label>
          <input
            type="text"
            name="interviewer_name"
            value={interview.interviews_users_attributes[0].users.name}
            onChange={onChange}
            id="interview_interviews_users_attributes_0_users_name"
          ></input>

          <label htmlFor="interview_interviews_users_attributes_0_users_Email">
            <abbr title="required">*</abbr> Email
          </label>
          <input
            type="text"
            name="interviewer_email"
            value={interview.interviews_users_attributes[0].users.email}
            onChange={onChange}
            id="interview_interviews_users_attributes_0_users_email"
          ></input>
        </p>

        <h3>Candidate Details</h3>

        <p>
          <label htmlFor="interview_interviews_users_attributes_1_users_Name">
            <abbr title="required">*</abbr> Name
          </label>
          <input
            type="text"
            name="candidate_name"
            value={interview.interviews_users_attributes[1].users.name}
            onChange={onChange}
            id="interview_interviews_users_attributes_1_users_name"
          ></input>

          <label htmlFor="interview_interviews_users_attributes_1_users_Email">
            <abbr title="required">*</abbr> Email
          </label>
          <input
            type="text"
            name="candidate_email"
            value={interview.interviews_users_attributes[1].users.email}
            onChange={onChange}
            id="interview_interviews_users_attributes_1_users_email"
          ></input>

          <label htmlFor="interview_interviews_users_attributes_1_users_resume">
            <abbr title="required">*</abbr> Resume
          </label>
          <input
            type="file"
            name="candidate_resume"
            value={interview.interviews_users_attributes[1].users.resume}
            onChange={onChange}
            id="interview_interviews_users_attributes_1_users_resume"
          ></input>
        </p>

        <h3>Interview Details</h3>

        <p>
          <label htmlFor="interview_Date">Date</label>
          <input
            type="date"
            name="interview_date"
            value={interview.interview_date}
            onChange={onChange}
            id="interview_interview_date"
          ></input>

          <label htmlFor="interview_start_time">
            <abbr title="required">*</abbr> Start time
          </label>
          <input
            type="time"
            name="start_time"
            value={interview.start_time}
            onChange={onChange}
            id="interview_start_time"
          ></input>

          <label htmlFor="interview_end_time">
            <abbr title="required">*</abbr> End time
          </label>
          <input
            type="time"
            name="end_time"
            value={interview.end_time}
            onChange={onChange}
            id="interview_end_time"
          ></input>
        </p>

        <div className="actions">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default InterviewEdit;
