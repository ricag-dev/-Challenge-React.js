import { useEffect } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';

import Loading from '../core/components/Loading';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Search from '../views/Search';
import useLogin from '../store/UseLogin';
import AppHeader from '../core/components/layout/AppHeader';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Login register={true}/>,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/search",
		element: <Search />,
	},
	{
		path: "/logout",
		Component:()=>{
			const navigate = useNavigate();
			const [ login, setLogin ] = useLogin()
			useEffect(() => {
				if(login){
					setLogin(null);
				}
				setTimeout(()=> navigate("/"),800)
			}, [login]);
			return <>
				<AppHeader />
				<Loading mesage={"Logout..."}/>
			</>
		},
	},
]);

export default router;

