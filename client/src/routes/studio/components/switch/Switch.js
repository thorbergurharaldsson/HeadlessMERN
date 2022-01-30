import Switch from "react-switch";

export default function SwitchToggle(props) {
	const { checked, onChange } = props;

	return (
		<Switch
			onColor="#2F981E"
			borderRadius={2}
			onChange={onChange}
			checked={checked}
		/>
	);
}
