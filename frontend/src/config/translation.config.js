import i18next from 'i18next'

import globalEn from '../translations/en-US/global.json'
import globalEs from '../translations/es-ES/global.json'

let language = 'es'

const lng = localStorage.getItem('language')

if (lng !== null) language = lng

i18next.init({
	interpolation: { escapeValue: false },
	lng: language,
	resources: {
		es: {
			global: globalEs
		},
		en: {
			global: globalEn
		}
	}
})

export default i18next
