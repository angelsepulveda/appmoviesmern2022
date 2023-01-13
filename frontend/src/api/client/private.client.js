import axios from 'axios'
import queryString from 'query-string'

const baseUrl = '127.0.0.1:5000/api/v1'

const privateClient = axios.create({
	baseUrl,
	paramsSerializer: {
		encode: params => queryString.stringify(params)
	}
})

privateClient.interceptors.request.use(async config => {
	return {
		...config,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	}
})

privateClient.interceptors.response.use(
	response => {
		if (response && response.data) return response.data
		return response
	},
	err => {
		throw err.response.data
	}
)

export default privateClient
