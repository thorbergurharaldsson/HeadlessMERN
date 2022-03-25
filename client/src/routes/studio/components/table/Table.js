function Table(props) {
  const { title, date, published } = props;
  return (
    <div>
      <div className="title">
        <h1>Your Assignments</h1>
        <h2>Recommended to gallery</h2>
      </div>
      <table>
        <tr>
          <td>{title}</td>
          <td>{date}</td>
          <td>EYE</td>
          <td>PEN</td>
          <td>CAN</td>
          <td>{published}</td>
        </tr>
      </table>
      {/* {assignments?.map((assignment) => (
        <div className="assignment" key={assignment._id}>
          <div>
            <h2>{assignment?.assignmentTitle}</h2>
            <h6>{assignment?.moduleTitle}</h6>
            <Markdown>{assignment?.comment}</Markdown>
            <a href={assignment?.url}>{assignment?.url}</a>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Table;
