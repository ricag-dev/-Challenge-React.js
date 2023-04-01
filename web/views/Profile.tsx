import useLogin from '../store/UseLogin';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../core/components/layout/AppHeader';

const Profile = () => {
	const [login, _] = useLogin();
	const navigate = useNavigate();
	if (!login) {
		navigate('/');
	}
	return (
		<>
			<AppHeader />
			<h1>Profile</h1>
		</>
	);
};

export default Profile;