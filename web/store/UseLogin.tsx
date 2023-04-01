import { useLocalStorage } from 'primereact/hooks';

const local = 'Login';

const UseLogin = () => {
	return useLocalStorage('', local);
};

export default UseLogin;
