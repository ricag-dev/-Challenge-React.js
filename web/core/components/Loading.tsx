import { ProgressSpinner } from 'primereact/progressspinner';
const Loading = (loadingMessage) =>{
	const isLoading = false;
	const message = loadingMessage!=null ? (
		<div
			className="flex justify-content-center flex-wrap card-container"
		>
			<span className="loading-text">{loadingMessage}</span>
		</div>
	) : <></>;

	return isLoading ? (
		<div className="loading-screen">
			<ProgressSpinner />
			{message}
		</div>
	) : <></>
}

export default Loading;