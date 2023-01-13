const mediaType = {
	movie: 'movie',
	tv: 'tv'
}

const mediaCategory = {
	popular: 'popular',
	topRated: 'top_rated'
}

const backdropPath = imgEndPoint => `https://image.tmdb.org/t/p/original${imgEndPoint}`

const posterPath = imgEndPoint => `https://image.tmdb.org/t/p/w500${imgEndPoint}`

const youtubePath = videoId => `https://www.youtube.com/embed/${videoId}?controls=0`

const tmdbConfig = {
	mediaType,
	mediaCategory,
	backdropPath,
	posterPath,
	youtubePath
}

export default tmdbConfig
