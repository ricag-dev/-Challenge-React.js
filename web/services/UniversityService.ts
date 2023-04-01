import axios from "axios";

export default class UniversityService{
	static url = 'http://universities.hipolabs.com/'

	/**
	 *
	 * @param value
	 */
	static find = (value)=>{
		return axios.get(`${UniversityService.url}search?name=${value}`)
	}
}