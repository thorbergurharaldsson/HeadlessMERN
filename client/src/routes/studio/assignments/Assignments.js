import { useEffect, useState } from "react";
import ProtectedRoute from "../../../utils/protectedRoute";
import Markdown from "../../../components/markdown/Markdown";
import { useAuth } from "../../../utils/authContext";

import "./Assignments.scss";

function Assignments(params) {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getAssignments();
  }, [user]);

  const getAssignments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HORSEMERN_API}/assignments`
    );
    const data = await response.json();
    const filteredAssignments = data.filter(
      (assignment) => assignment.author == user.name
    );

    setAssignments(filteredAssignments);
  };

  return (
    <div>
      <div className="title">
        <h1>Your Assignments</h1>
      </div>
      {assignments?.map((assignment) => (
        <div className="assignment" key={assignment._id}>
          <div>
            <h2>{assignment?.title}</h2>
            <h3>{assignment.author}</h3>
            <Markdown>{assignment?.description}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProtectedRoute(Assignments);
