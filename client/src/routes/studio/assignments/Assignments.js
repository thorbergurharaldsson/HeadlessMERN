import { useEffect, useState } from "react";

import Markdown from "../../../components/markdown/Markdown";
import getUserInfo from "../../../stores/getUserInfo";

import "./Assignments.scss";

export default function Assignments(params) {
  const [assignments, setAssignments] = useState([]);

  const [user, setUser] = useState({
    name: "",
    id: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo);
  }, []);

  useEffect(() => {
    getAssignments();
  }, [user]);

  const getAssignments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/assignments`
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
