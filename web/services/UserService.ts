import axios from "axios";

export default class UserService{
	static register = (input)=>{
		return axios.post('http://localhost:3004/users', input)
	}

	static login = (input)=>{
		return axios.get(`http://localhost:3004/users?email_like=${input.email}&pass_like=${input.pass}`)
	}
}