import { useEffect, useState } from "react";

import Markdown from "../../../components/markdown/Markdown";
import { useStores } from "../../../stores";

import "./Assignments.scss";

export default function Assignments(params) {
	const { userStore } = useStores();
	const [assignments, setAssignments] = useState([]);

	useEffect(() => {
		getAssignments();
	}, []);

	const getAssignments = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_SERVER}/assignments`
		);
		const data = await response.json();
		const filteredAssignments = data.filter(
			(assignment) => assignment.author == userStore.name
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
