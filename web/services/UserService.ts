import axios from "axios";

export default class UserService{
	static url = 'http://localhost:3004/users'
	static register = (input)=>{
		return new Promise((resolve, reject)=>{
			UserService.login(input).then(({ data })=>{
				if(!data.length){
					axios.post(UserService.url, input)
						.then((data)=> resolve(data))
				}else{
					reject(false)
				}
			})
		})
	}

	static login = (input)=>{
		return axios.get(`${UserService.url}?email_like=${input.email}&pass_like=${input.pass}`)
	}
}