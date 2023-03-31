import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './styles.css'
import { Button } from 'primereact/button';


export function App() {
	return (
		<div className="app">
			<h1>Hello world!</h1>
			<div className="card flex justify-content-center">
				<Button label="Check" icon="pi pi-check" />
			</div>
		</div>
)
}
