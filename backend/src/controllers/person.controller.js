import responseHandler from '../handlers/response.handler.js'
import tmdbApi from '../tmdb/tmdb.api.js'

const personDetail = async (req, res) => {
	try {
		const { personId } = req.params

		const lng = req.headers['accept-language']
		const person = await tmdbApi.personDetail({ personId, lng })

		responseHandler.ok(res, person)
	} catch {
		responseHandler.error(res)
	}
}

const personMedias = async (req, res) => {
	try {
		const { personId } = req.params

		const lng = req.headers['accept-language']
		const medias = await tmdbApi.personMedias({ personId, lng })

		responseHandler.ok(res, medias)
	} catch {
		responseHandler.error(res)
	}
}

export default { personDetail, personMedias }
