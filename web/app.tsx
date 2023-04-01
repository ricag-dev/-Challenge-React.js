import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import './styles.css'

import { RouterProvider } from "react-router-dom";
import { Panel } from 'primereact/panel';
import router from './router';


export function App() {
	return (
		<div className="min-h-screen">
			<Panel className="">
				<RouterProvider router={router} />
			</Panel>
		</div>
)
}



// <router-view  @isAuthenticated="onAuthenticationStatusChanged"/>