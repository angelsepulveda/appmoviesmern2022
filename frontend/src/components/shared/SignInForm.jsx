import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { setUser } from '../../redux/features/userSlice'
import userApi from './../../api/modules/user.api'

const SignInForm = ({ switchAuthState }) => {
	const dispatch = useDispatch()
	const [t] = useTranslation('global')

	const [isLoadingRequest, setIsLoadingRequest] = useState(false)
	const [errorMessage, setErrorMessage] = useState()

	const signInForm = useFormik({
		initialValues: {
			password: '',
			username: ''
		},
		validationSchema: Yup.object({
			username: Yup.string().min(8, t('validations.user')).required(t('validations.user-required')),
			password: Yup.string().min(8, t('validations.password.min')).required(t('validations.password-required'))
		}),
		onSubmit: async values => {
			setErrorMessage(undefined)
			setIsLoadingRequest(true)
			const { response, err } = await userApi.signIn(values)
			setIsLoadingRequest(false)

			if (response) {
				signInForm.resetForm()
				dispatch(setUser(response))
				dispatch(setAuthModalOpen(false))
				toast.success(t('sign-in-success'))
			}

			if (err) setErrorMessage(err.message)
		}
	})

	return (
		<Box component="form" onSubmit={signInForm.handleSubmit}>
			<Stack spacing={3}>
				<TextField
					type="text"
					placeholder={t('username')}
					fullWidth
					name="username"
					value={signInForm.values.username}
					onChange={signInForm.handleChange}
					color="success"
					error={signInForm.touched.username && signInForm.errors.username !== undefined}
					helperText={signInForm.touched.username && signInForm.errors.username}
				/>
				<TextField
					type="password"
					placeholder={t('password')}
					fullWidth
					name="password"
					value={signInForm.values.password}
					onChange={signInForm.handleChange}
					color="success"
					error={signInForm.touched.password && signInForm.errors.password !== undefined}
					helperText={signInForm.touched.password && signInForm.errors.password}
				/>
			</Stack>
			<LoadingButton
				type="submit"
				fullWidth
				size="large"
				variant="contained"
				sx={{ marginTop: 4 }}
				loading={isLoadingRequest}
			>
				{t('sign-in')}
			</LoadingButton>
			<Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
				{' '}
				{t('sign-up')}
			</Button>
			{errorMessage !== '' && (
				<Box sx={{ marginTop: 2 }}>
					<Box sx={{ marginTop: 2 }}>
						<Alert severity="error" variant="outlined">
							{errorMessage}
						</Alert>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default SignInForm
