import {createBrowserRouter} from "react-router-dom";

import Loading from '../core/components/Loading';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Search from '../views/Search';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		loader: Loading,
	},
	{
		path: "/register",
		element: <Login register={true}/>,
		loader: Loading,
	},
	{
		path: "/profile",
		element: <Profile />,
		loader: Loading
	},
	{
		path: "/search",
		element: <Search />,
		loader: Loading
	},
	{
		path: "/logout",
		element: <Login />,
	},
]);

export default router;

