import { Menubar } from 'primereact/menubar';
import logoImg from '../../../assets/img/logo.png';
import UseLogin from '../../../store/UseLogin'


const AppHeader = ()=>{
	const [ login, _ ] = UseLogin()

	const menu = [
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
	]

	const logo = <a href="/"><img alt="logo" src={logoImg} height="40" className="mr-2"/></a>;

	return <Menubar model={login ? menu : null} start={logo} className="shadow-4 border-noround"/>
}

export default AppHeader;