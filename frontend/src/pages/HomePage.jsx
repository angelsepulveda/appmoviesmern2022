import tmdbConfigs from "../api/config/tmdb.config"
import HeroSlide from "../components/slides/HeroSlide"

const HomePage = () => {
	return <div>
		<HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
	</div>
}

export default HomePage
