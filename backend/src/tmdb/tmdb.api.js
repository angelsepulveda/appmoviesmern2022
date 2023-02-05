import axiosClient from '../axios/axios.client.js'
import tmdbEndpoints from './tmdb.endpoints.js'

const tmdbApi = {
	mediaList: async ({ mediaType, mediaCategory, page, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page, lng })),
	mediaDetail: async ({ mediaType, mediaId, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaDetail({ mediaType, mediaId, lng })),
	mediaGenres: async ({ mediaType, lng }) => await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType, lng })),
	mediaCredits: async ({ mediaType, mediaId, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId, lng })),
	mediaVideos: async ({ mediaType, mediaId, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId, lng })),
	mediaImages: async ({ mediaType, mediaId, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId, lng })),
	mediaRecommend: async ({ mediaType, mediaId, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId, lng })),
	mediaSearch: async ({ mediaType, query, page, lng }) =>
		await axiosClient.get(tmdbEndpoints.mediaSearch({ mediaType, query, page, lng })),
	personDetail: async ({ personId, lng }) => await axiosClient.get(tmdbEndpoints.personDetail({ personId, lng })),
	personMedias: async ({ personId, lng }) => await axiosClient.get(tmdbEndpoints.personMedias({ personId, lng }))
}

export default tmdbApi
