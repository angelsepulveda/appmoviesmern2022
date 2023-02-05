import { Box, Button, Paper, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import menuConfigs from '../../config/menu.config'
import Container from '../shared/Container'
import Logo from '../shared/Logo'

const Footer = () => {
	const [t] = useTranslation('global')
	return (
		<Container>
			<Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
				<Stack
					alignItems="center"
					justifyContent="space-between"
					direction={{ xs: 'column', md: 'row ' }}
					sx={{ height: 'max-content' }}
				>
					<Logo />
					<Box>
						{menuConfigs.main.map((item, index) => (
							<Button key={index} sx={{ color: 'inherit' }} component={Link} to={item.path}>
								{t(item.display)}
							</Button>
						))}
					</Box>
				</Stack>
			</Paper>
		</Container>
	)
}

export default Footer
