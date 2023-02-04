import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import menuConfigs from '../../config/menu.config'

const LanguageMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const { t, i18n } = useTranslation('global')

	const toggleMenu = e => setAnchorEl(e.currentTarget)

	const changeLanguage = async lng => {
		await i18n.changeLanguage(lng)
		localStorage.setItem('language', lng)
		document.location.reload()
	}

	return (
		<>
			<Typography variant="h6" sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={toggleMenu}>
				{t('language')}
			</Typography>
			<Menu
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				PaperProps={{ sx: { padding: 0 } }}
			>
				{menuConfigs.language.map((item, index) => (
					<ListItemButton
						key={index}
						onClick={async () => {
							setAnchorEl(null)
							await changeLanguage(item.value)
						}}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText
							disabledTypography
							primary={<Typography textTransform="uppercase">{t(item.display)}</Typography>}
						></ListItemText>
					</ListItemButton>
				))}
			</Menu>
		</>
	)
}

export default LanguageMenu
