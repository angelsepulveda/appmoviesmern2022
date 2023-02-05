const baseUrl = process.env.TMDB_BASE_URL
const key = process.env.TMDB_KEY

const getUrl = (endpoint, params, lng) => {
	const qs = new URLSearchParams(params)
	return `${baseUrl}${endpoint}?api_key=${key}&${qs}&language=${lng}`
}

export default { getUrl }
