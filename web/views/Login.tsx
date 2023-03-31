import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useLogin from '../store/UseLogin'
import { useEffect, useState } from 'react';
import { redirect, Link } from 'react-router-dom';
const Login = (props)=>{
	const [ login, setLogin ] = useLogin()
	const [ input, setInput ] = useState({email:"",pass:""})

	const { register } = props

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(input => ({...input, [name]: value}))
		console.log(input)
	}

	useEffect(() => {
		if(login){
			redirect("/profile");
		}
	}, []);

	const handleSubmit = (event)=>{

		event.preventDefault();
	}

	return (
		<div className="flex justify-content-center p-8">
			<Card className="w-full md:w-5 flex flex-column align-items-s justify-content-center">
				<form onSubmit={handleSubmit}>
					<div className="p-2">
						<label htmlFor="email">Email</label>
						<br />
						<InputText id="email" type="email" required name="email" className="w-full" onChange={handleChange}/>
					</div>
					<div className="p-2">
						<label htmlFor="password">Password</label>
						<br />
						<InputText id="password" type="password" name="pass" required className="w-full" onChange={handleChange}/>
					</div>
					<div className="p-2">
						<Button label={register ? "Register" : "Login"} icon="pi pi-arrow-right" className="w-full" iconPos="right"></Button>
						<p>
							<Link to={register ? "/" : "/register"}>Go to {register ? "Login" : "Register"}</Link>
						</p>
					</div>
				</form>
			</Card>
		</div>
	)
}

export default Login;