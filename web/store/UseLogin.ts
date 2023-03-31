import { useEffect, useState } from 'react';

const local = 'Login';
const useLogin = () => {
	const [login, setLogin] = useState(() => {
		const saved = localStorage.getItem(local);
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});

	useEffect(() => {
		localStorage.setItem(local, JSON.stringify(login));
	}, [login]);

	return [login, setLogin];
};

export default useLogin;