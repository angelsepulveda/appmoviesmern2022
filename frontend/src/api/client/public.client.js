import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'https://appmoviesmern2022-api.vercel.app/api/v1'

const publicClient = axios.create({
	baseURL,
	paramsSerializer: {
		encode: params => queryString.stringify(params)
	}
})

publicClient.interceptors.request.use(async config => {
	config.headers['Accept-Language'] = localStorage.getItem('language')
	config.headers['Content-Type'] = 'application/json'

	return config
})

publicClient.interceptors.response.use(
	response => {
		if (response && response.data) return response.data
		return response
	},
	err => {
		throw err.response.data
	}
)

export default publicClient
