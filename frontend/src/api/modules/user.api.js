import privateClient from '../client/private.client'
import publicClient from '../client/public.client'

const userEndpoints = {
	signIn: 'user/signin',
	signUp: 'user/signup',
	getInfo: 'user/info',
	passwordUpdate: 'user/update-password'
}

const userApi = {
	signIn: async ({ username, password }) => {
		try {
			const response = await publicClient.post(userEndpoints.signIn, { username, password })

			return { response }
		} catch (err) {
			console.log('err')
			return { err }
		}
	},
	signUp: async ({ username, password, confirmPassword, displayName }) => {
		try {
			const response = await publicClient.post(userEndpoints.signUp, {
				username,
				password,
				confirmPassword,
				displayName
			})

			return { response }
		} catch (err) {
			return { err }
		}
	},
	getInfo: async () => {
		try {
			const response = await privateClient.get(userEndpoints.getInfo)

			return { response }
		} catch (err) {
			return { err }
		}
	},
	passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
		try {
			const response = await privateClient.put(userEndpoints.passwordUpdate, {
				password,
				newPassword,
				confirmNewPassword
			})

			return { response }
		} catch (err) {
			return { err }
		}
	}
}

export default userApi
