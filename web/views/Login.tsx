import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useLogin from '../store/UseLogin';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';
import Loading from '../core/components/Loading';
import { Toast } from 'primereact/toast';
import { useUpdateEffect } from 'primereact/hooks';
import AppHeader from '../core/components/layout/AppHeader';

const initInput = { email: '', pass: '' };
const Login = (props) => {
	const toast = useRef(null);
	const navigate = useNavigate();
	const [login, setLogin] = useLogin();
	const [input, setInput] = useState(initInput);
	const [load, setLoad] = useState(false);

	const { register } = props;

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(input => ({ ...input, [name]: value }));
	};

	useUpdateEffect(() => {
		if (login) {
			navigate('/profile');
		}
		if (!load) {
			setInput(initInput);
		}
	}, [login, load]);

	const handleSubmit = (event) => {
		setLoad(true);
		if (register) {
			UserService.register(input).then(({ data }) => {
				setLoad(false);
				setLogin(data);
			});
		} else {
			UserService.login(input).then(({ data }) => {
				if (!data.length) {
					toast.current.show({ severity: 'error', summary: 'Error', detail: 'User not Found!', life: 3000 });
				}
				if (data.length) {
					setLogin(data[0]);
				}
				setLoad(false);
			});
		}
		event.preventDefault();
	};

	return (
		<>
			<AppHeader />
			<div className='flex justify-content-center p-8'>
				<Toast position='top-center' ref={toast} />
				<Card className='w-full md:w-5 flex flex-column align-items-s justify-content-center'>
					<form onSubmit={handleSubmit}>
						<div className='p-2'>
							<label htmlFor='email'>Email</label>
							<br />
							<InputText id='email' type='email' value={input.email} required name='email' className='w-full'
												 onChange={handleChange} />
						</div>
						<div className='p-2'>
							<label htmlFor='password'>Password</label>
							<br />
							<InputText id='password' type='password' value={input.pass} name='pass' required className='w-full'
												 onChange={handleChange} />
						</div>
						<div className='p-2'>
							{load ? (<div className='w-2'><Loading mesage={null} /></div>) : (
								<>
									<Button type='submit' label={register ? 'Register' : 'Login'} icon='pi pi-arrow-right'
													className='w-full' iconPos='right'></Button>
									<p>
										<Link to={register ? '/' : '/register'}>Go to {register ? 'Login' : 'Register'}</Link>
									</p>
								</>
							)}
						</div>
					</form>
				</Card>
			</div>
		</>
	);
};

export default Login;