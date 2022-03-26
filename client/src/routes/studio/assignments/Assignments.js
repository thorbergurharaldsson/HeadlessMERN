/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProtectedRoute from "../../../utils/protectedRoute";
import { useAuth } from "../../../utils/authContext";
import { horsemernAPI } from "../../../utils/api";
import dateParts from "../../../utils/dateParts";
import Table from "../components/table/Table";

function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getAssignments();
  }, [user]);

  const getAssignments = async () => {
    const response = horsemernAPI.get("/assignments");
    const data = (await response).data;

    const filteredAssignments = data.filter(
      (assignment) => assignment.author === user.name
    );

    setAssignments(filteredAssignments);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <h5>Assignments</h5>
            </th>
            <th></th>
            <th className="p3">View</th>
            <th className="p3">Publish</th>
          </tr>
        </thead>
        <tbody>
          {assignments?.map((assignment) => (
            <Table
              key={assignment.uniqueID}
              title={assignment.assignmentTitle}
              date={(() => {
                const d = dateParts(assignment.createdAt);
                return `${d.month} ${d.day}, ${d.year}`;
              })()}
              viewUrl={assignment?.url}
              published={assignment.published}
              type="assignments"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProtectedRoute(Assignments);
