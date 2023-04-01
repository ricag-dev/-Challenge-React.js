import axios from "axios";

export default class UserService{
	static url = 'http://localhost:3004/users'

	/**
	 *
	 * @param input
	 */
	static register = (input)=>{
		return new Promise((resolve, reject)=>{
			UserService.login(input).then(({ data })=>{
				if(!data.length){
					input.universities = []
					axios.post(UserService.url, input)
						.then((data)=> resolve(data))
				}else{
					reject(false)
				}
			})
		})
	}

	/**
	 *
	 * @param input
	 */
	static login = (input)=>{
		return axios.get(`${UserService.url}?email_like=${input.email}&pass_like=${input.pass}`)
	}

	static getUser(id){
		return axios.get(`${UserService.url}/${id}`)
	}

	static addUniversity = (item, id)=>{
		return new Promise((resolve, reject)=>{
			UserService.getUser(id).then(({ data })=>{
				data.universities.push(item)
				axios.put(`${UserService.url}/${id}`, data).then(e=> resolve(e))
			})
		})
	}
}