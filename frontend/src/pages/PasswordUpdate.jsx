import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import userApi from '../api/modules/user.api'
import Container from '../components/shared/Container'
import uiConfigs from '../config/ui.config'
import { setAuthModalOpen } from '../redux/features/authModalSlice'
import { setUser } from '../redux/features/userSlice'

const PasswordUpdate = () => {
	const [onRequest, setOnRequest] = useState(false)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [t] = useTranslation('global')

	const form = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
			confirmNewPassword: ''
		},
		validationSchema: Yup.object({
			password: Yup.string().min(8, t('validations.password.min')).required(t('validations.password.required')),
			newPassword: Yup.string().min(8, t('validations.password.min')).required(t('validations.password.required')),
			confirmNewPassword: Yup.string()
				.oneOf([Yup.ref('newPassword')], t('validations.password.confirm'))
				.min(8, t('validations.password.min'))
				.required(t('validations.password.required'))
		}),
		onSubmit: async values => onUpdate(values)
	})

	const onUpdate = async values => {
		if (onRequest) return
		setOnRequest(true)

		const { response, err } = await userApi.passwordUpdate(values)

		setOnRequest(false)

		if (err) toast.error(err.message)
		if (response) {
			form.resetForm()
			navigate('/')
			dispatch(setUser(null))
			dispatch(setAuthModalOpen(true))
			toast.success(t('updatePassword.updated'))
		}
	}

	return (
		<Box sx={{ ...uiConfigs.style.mainContent }}>
			<Container header={t('updatePassword.update-password')}>
				<Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
					<Stack spacing={2}>
						<TextField
							type="password"
							placeholder={t('password')}
							name="password"
							fullWidth
							value={form.values.password}
							onChange={form.handleChange}
							color="success"
							error={form.touched.password && form.errors.password !== undefined}
							helperText={form.touched.password && form.errors.password}
						/>
						<TextField
							type="password"
							placeholder={t('updatePassword.new-password')}
							name="newPassword"
							fullWidth
							value={form.values.newPassword}
							onChange={form.handleChange}
							color="success"
							error={form.touched.newPassword && form.errors.newPassword !== undefined}
							helperText={form.touched.newPassword && form.errors.newPassword}
						/>
						<TextField
							type="password"
							placeholder={t('updatePassword.confirm-password')}
							name="confirmNewPassword"
							fullWidth
							value={form.values.confirmNewPassword}
							onChange={form.handleChange}
							color="success"
							error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
							helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
						/>

						<LoadingButton type="submit" variant="contained" fullWidth sx={{ marginTop: 4 }} loading={onRequest}>
							{t('updatePassword.update-password')}
						</LoadingButton>
					</Stack>
				</Box>
			</Container>
		</Box>
	)
}

export default PasswordUpdate
