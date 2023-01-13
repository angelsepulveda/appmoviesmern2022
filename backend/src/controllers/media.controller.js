import responseHandler from '../handlers/response.handler'
import UserModel from '../models/user.model'
import FavoriteModel from '../models/favorite.model'
import ReviewModel from '../models/review.model'
import tmdbApi from '../tmdb/tmdb.api'
import tokenMiddleware from '../middlewares/token.middleware'

const getList = async (req, res) => {
	try {
		const { page } = req.query
		const { mediaType, mediaCategory } = req.params

		const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page })

		return responseHandler.ok(res, response)
	} catch {
		responseHandler.error(res)
	}
}

const getGenres = async (req, res) => {
	try {
		const { mediaType } = req.params

		const response = await tmdbApi.mediaGenres({ mediaType })

		return responseHandler.ok(res, response)
	} catch {
		responseHandler.error(res)
	}
}

const search = async (req, res) => {
	try {
		const { mediaType } = req.params
		const { query, page } = req.query

		const response = await tmdbApi.mediaSearch({
			query,
			page,
			mediaType: mediaType === 'people' ? 'person' : mediaType
		})

		return responseHandler.ok(res, response)
	} catch {
		responseHandler.error(res)
	}
}

const getDetail = async (req, res) => {
	try {
		const { mediaType, mediaId } = req.params

		const params = { mediaType, mediaId }

		const media = await tmdbApi.mediaDetail(params)

		media.credits = await tmdbApi.mediaCredits(params)

		const videos = await tmdbApi.mediaVideos(params)

		media.videos = videos

		const recommend = await tmdbApi.mediaRecommend(params)

		media.recommend = recommend.results

		media.images = await tmdbApi.mediaImages(params)

		const tokenDecoded = tokenMiddleware.tokenDecoded(req)

		if (tokenDecoded) {
			const user = await UserModel.findById(tokenDecoded.data)

			if (user) {
				const isFavorite = FavoriteModel.findOne({ user: user.id, mediaId })
				media.isFavorite = isFavorite !== null
			}
		}

		media.reviews = await ReviewModel.find({ mediaId }).populate('user').sort('-createdAt')

		return responseHandler.ok(res, media)
	} catch {
		responseHandler.error(res)
	}
}

export default { search, getDetail, getGenres, getList }