import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { setUser } from '../../redux/features/userSlice'
import userApi from './../../api/modules/user.api'

const SignUpForm = ({ switchAuthState }) => {
	const dispatch = useDispatch()

	const [isLoadingRequest, setLoadingRequest] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const signUpForm = useFormik({
		initialValues: {
			password: '',
			username: '',
			displayName: '',
			confirmPassword: ''
		},
		validationSchema: Yup.object({
			username: Yup.string().min(8, 'username minimum 8 characters').required('username is required'),
			password: Yup.string().min(8, 'password minimum 8 characters').required('password is required'),
			displayName: Yup.string().min(5, 'password minimum 5 characters').required('displayName is required'),
			confirmPassword: Yup.string().min(8, 'password minimum 8 characters').required('password is required')
		}),
		onSubmit: async values => {
			setErrorMessage('')
			setLoadingRequest(true)
			const { response, err } = await userApi.signUp(values)
			setLoadingRequest(false)

			if (response) {
				signUpForm.resetForm()
				dispatch(setUser(response))
				dispatch(setAuthModalOpen(false))
				toast.success('Sign in success')
			}

			if (err) setErrorMessage(err.message)
		}
	})

	return (
		<Box component="form" onSubmit={signUpForm.handleSubmit}>
			<Stack spacing={3}>
				<TextField
					type="text"
					placeholder="username"
					fullWidth
					name="username"
					value={signUpForm.values.username}
					onChange={signUpForm.handleChange}
					color="success"
					error={signUpForm.touched.username && signUpForm.errors.username !== undefined}
					helperText={signUpForm.touched.username && signUpForm.errors.username}
				/>
				<TextField
					type="text"
					placeholder="display name"
					fullWidth
					name="displayName"
					value={signUpForm.values.displayName}
					onChange={signUpForm.handleChange}
					color="success"
					error={signUpForm.touched.displayName && signUpForm.errors.displayName !== undefined}
					helperText={signUpForm.touched.displayName && signUpForm.errors.displayName}
				/>
				<TextField
					type="password"
					placeholder="password"
					fullWidth
					name="password"
					value={signUpForm.values.password}
					onChange={signUpForm.handleChange}
					color="success"
					error={signUpForm.touched.password && signUpForm.errors.password !== undefined}
					helperText={signUpForm.touched.password && signUpForm.errors.password}
				/>
				<TextField
					type="password"
					placeholder="confirm password"
					fullWidth
					name="confirmPassword"
					value={signUpForm.values.confirmPassword}
					onChange={signUpForm.handleChange}
					color="success"
					error={signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword !== undefined}
					helperText={signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword}
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
				Sign Up
			</LoadingButton>
			<Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
				{' '}
				Sign In
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

export default SignUpForm
