import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'

const main = [
	{
		display: 'menu.home',
		path: '/',
		icon: <HomeOutlinedIcon />,
		state: 'home'
	},
	{
		display: 'menu.movies',
		path: '/movie',
		icon: <SlideshowOutlinedIcon />,
		state: 'movie'
	},
	{
		display: 'menu.tv-series',
		path: '/tv',
		icon: <LiveTvOutlinedIcon />,
		state: 'tv'
	},
	{
		display: 'menu.search',
		path: '/search',
		icon: <SearchOutlinedIcon />,
		state: 'search'
	}
]

const user = [
	{
		display: 'menu.user.favorites',
		path: '/favorites',
		icon: <FavoriteBorderOutlinedIcon />,
		state: 'favorite'
	},
	{
		display: 'menu.user.reviews',
		path: '/reviews',
		icon: <RateReviewOutlinedIcon />,
		state: 'reviews'
	},
	{
		display: 'menu.user.password-update',
		path: '/password-update',
		icon: <LockResetOutlinedIcon />,
		state: 'password.update'
	}
]

const language = [
	{
		display: 'spanish',
		icon: <LanguageIcon />,
		value: 'es-ES'
	},
	{
		display: 'english',
		icon: <LanguageIcon />,
		value: 'en-US'
	}
]

const menuConfigs = { main, user, language }

export default menuConfigs
