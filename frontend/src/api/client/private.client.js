import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'https://appmoviesmern2022-api.vercel.app/api/v1'

const privateClient = axios.create({
	baseURL,
	paramsSerializer: {
		encode: params => queryString.stringify(params)
	}
})

privateClient.interceptors.request.use(async config => {
	config.headers['Accept-Language'] = localStorage.getItem('language')
	config.headers['Content-Type'] = 'application/json'
	// eslint-disable-next-line dot-notation
	config.headers['Authorization'] = `Bearer ${localStorage.getItem('actkn')}`
	return config
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
