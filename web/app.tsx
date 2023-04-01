import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import './styles.css'

import { RouterProvider } from "react-router-dom";
import router from './router';


export function App() {
	return (
		<div className="min-h-screen">
			<RouterProvider router={router} />
		</div>
)
}



// <router-view  @isAuthenticated="onAuthenticationStatusChanged"/>