import { Box } from '@mui/material'

import tmdbConfig from '../api/config/tmdb.config'
import Container from '../components/shared/Container'
import HeroSlide from '../components/shared/slides/HeroSlide'
import MediaSlide from '../components/shared/slides/MediaSlide'
import uiConfig from '../config/ui.config'

const HomePage = () => {
	return (
		<div>
			<HeroSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.popular} />

			<Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
				<Container header="popular movies">
					<MediaSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.popular} />
				</Container>

				<Container header="popular series">
					<MediaSlide mediaType={tmdbConfig.mediaType.tv} mediaCategory={tmdbConfig.mediaCategory.popular} />
				</Container>

				<Container header="top rated movies">
					<MediaSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.topRated} />
				</Container>

				<Container header="top rated series">
					<MediaSlide mediaType={tmdbConfig.mediaType.tv} mediaCategory={tmdbConfig.mediaCategory.topRated} />
				</Container>
			</Box>
		</div>
	)
}

export default HomePage
