import { ProgressSpinner } from 'primereact/progressspinner';
const Loading = (prop:{mesage: ""}) =>{
	const message = prop.mesage ? (
		<div
			className="flex justify-content-center flex-wrap card-container p-2"
		>
			<span className="loading-text">{prop.mesage}</span>
		</div>
	) : <></>;

	return (
		<div className="loading-screen flex justify-content-center flex-column">
			<ProgressSpinner />
			{message}
		</div>
	);
}

export default Loading;