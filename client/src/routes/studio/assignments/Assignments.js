import { useEffect, useState } from "react";
import ProtectedRoute from "../../../utils/protectedRoute";
import Markdown from "../../../components/markdown/Markdown";
import { useAuth } from "../../../utils/authContext";
import { horsemernAPI } from "../../../utils/api";

import Table from "../components/table/Table";

import "./Assignments.scss";

function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getAssignments();
  }, [user]);

  const getAssignments = async () => {
    const response = horsemernAPI.get("/assignments");
    const data = (await response).data;
    console.log(data);
    const filteredAssignments = data.filter(
      (assignment) => assignment.author === user.name
    );

    setAssignments(filteredAssignments);
  };

  return (
    <div>
      <div className="title">
        <h1>Your Assignments</h1>
        <h2>Recommended to gallery</h2>
      </div>
      {assignments?.map((assignment) => (
        <Table
          title={assignment?.assignmentTitle}
          date={assignment?.assignmentTitle}
        />
        // <div className="assignment" key={assignment._id}>
        //   <div>
        //     <h2>{assignment?.assignmentTitle}</h2>
        //     <h6>{assignment?.moduleTitle}</h6>
        //     <Markdown>{assignment?.comment}</Markdown>
        //     <a href={assignment?.url}>{assignment?.url}</a>
        //   </div>
        // </div>
      ))}
    </div>
  );
}

export default ProtectedRoute(Assignments);
