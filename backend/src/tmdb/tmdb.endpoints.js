import tmdbConfig from './tmdb.config.js'

const tmdbEndpoints = {
	mediaList: ({ mediaType, mediaCategory, page, lng }) =>
		tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }, lng),
	mediaDetail: ({ mediaType, mediaId, lng }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}`, {}, lng),
	mediaGenres: ({ mediaType, lng }) => tmdbConfig.getUrl(`genre/${mediaType}/list`, {}, lng),
	mediaCredits: ({ mediaType, mediaId, lng }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`, {}, lng),
	mediaVideos: ({ mediaType, mediaId, lng }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`, {}, lng),
	mediaRecommend: ({ mediaType, mediaId, lng }) =>
		tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`, {}, lng),
	mediaImages: ({ mediaType, mediaId, lng }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`, {}, lng),
	mediaSearch: ({ mediaType, query, page, lng }) => tmdbConfig.getUrl(`search/${mediaType}`, { query, page }, lng),
	personDetail: ({ personId, lng }) => tmdbConfig.getUrl(`person/${personId}`, {}, lng),
	personMedias: ({ personId, lng }) => tmdbConfig.getUrl(`person/${personId}/combined_credits`, {}, lng)
}

export default tmdbEndpoints
