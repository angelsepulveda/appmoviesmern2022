const favoriteUtils = {
	check: ({ listFovorites, mediaId }) =>
		listFovorites && listFovorites.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
}

export default favoriteUtils
