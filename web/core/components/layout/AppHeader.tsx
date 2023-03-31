import { Menubar } from 'primereact/menubar';
import logoImg from '../../../assets/img/logo.png';
import useLogin from '../../../store/UseLogin'
import { useEffect, useState } from 'react';

const AppHeader = ()=>{
	const [ login, _ ] = useLogin()

	const [ menu, setMenu ] = useState([]);

	useEffect(() => {
		setMenu(login ? [
			{
				label: 'Search',
				url: '/search'
			},
			{
				label: 'Profile',
				url: '/profile'
			},
			{
				label: 'Logout',
				url: '/logout'
			}
		] : [])
	}, []);


	const logo = <a href="/"><img alt="logo" src={logoImg} height="40" className="mr-2"/></a>;


	return (
		<Menubar model={menu} start={logo} className="shadow-4 border-noround"/>
	)
}

export default AppHeader;