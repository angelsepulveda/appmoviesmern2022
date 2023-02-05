import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import tmdbConfig from '../api/config/tmdb.config'
import Container from '../components/shared/Container'
import HeroSlide from '../components/shared/slides/HeroSlide'
import MediaSlide from '../components/shared/slides/MediaSlide'
import uiConfig from '../config/ui.config'

const HomePage = () => {
	const [t] = useTranslation('global')
	return (
		<div>
			<HeroSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.popular} />

			<Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
				<Container header={t('home.popular-movies')}>
					<MediaSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.popular} />
				</Container>

				<Container header={t('home.popular-series')}>
					<MediaSlide mediaType={tmdbConfig.mediaType.tv} mediaCategory={tmdbConfig.mediaCategory.popular} />
				</Container>

				<Container header={t('home.top-rated-movies')}>
					<MediaSlide mediaType={tmdbConfig.mediaType.movie} mediaCategory={tmdbConfig.mediaCategory.topRated} />
				</Container>

				<Container header={t('home.top-rated-series')}>
					<MediaSlide mediaType={tmdbConfig.mediaType.tv} mediaCategory={tmdbConfig.mediaCategory.topRated} />
				</Container>
			</Box>
		</div>
	)
}

export default HomePage
