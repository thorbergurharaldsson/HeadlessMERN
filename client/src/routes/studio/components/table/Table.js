import view from "../../../../img/Icon/View.svg";
import trashCan from "../../../../img/Icon/Delete.svg";
import edit from "../../../../img/Icon/Edit.svg";
import publish from "../../../../img/Icon/Publish.svg";
import notPublish from "../../../../img/Icon/notPublish.svg";
import { useNavigate } from "react-router-dom";

import "./Table.scss";

function Table(props) {
  const navigate = useNavigate();
  const {
    title,
    date,
    published,
    type,
    deleteFunc,
    editUrl,
    publishFunc,
    viewUrl,
  } = props;

  return (
    <tr>
      <td>{title}</td>
      <td className="p3">{date}</td>
      <td>
        <img
          src={view}
          alt="View"
          onClick={() => window.open(viewUrl, "_blank").focus()}
        />
      </td>
      <td>
        <img
          src={published ? publish : notPublish}
          alt="Published"
          onClick={publishFunc}
        />
      </td>
      {type === "assignments" ? null : (
        <>
          <td>
            <img src={edit} alt="edit" onClick={() => navigate(editUrl)} />
          </td>
          <td>
            <img src={trashCan} alt="Delete" onClick={deleteFunc} />
          </td>
        </>
      )}
    </tr>
  );
}

export default Table;
