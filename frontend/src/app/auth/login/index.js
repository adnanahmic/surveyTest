// Login
import React, { useState } from 'react';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { Alert, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useDispatch } from 'react-redux';

import apiInstance from 'utils/api';
import { setIsAuthenticated, setUser } from 'store/reducers/user';
import { setCookie } from 'utils/functions';
import Input from 'components/form/input';
import { FORM_MESSAGES } from 'common/constants';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formMessages, setFormMessages] = useState(null);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email(FORM_MESSAGES.EMAIL_INVALID).required(FORM_MESSAGES.EMAIL_REQUIRED),
			password: Yup.string().required(FORM_MESSAGES.PASSWORD_REQUIRED),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			const response = await apiInstance.post('/auth/login', { ...values });
			if (response?.data?.token) {
				setCookie('token', response?.data?.token);
				dispatch(setIsAuthenticated(true));
				dispatch(setUser(response?.data?.userData));
				navigate('/');
			} else {
				setFormMessages({ type: 'error', message: response?.data?.message });
			}
		},
	});

	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Box marginTop={10}>
					<form onSubmit={formik.handleSubmit} >

						<Typography variant="h3" marginBottom={4}> Login </Typography>

						{
							formMessages?.message &&
							<Box marginBottom={3}>
								<Alert severity={formMessages?.type}> {formMessages?.message} </Alert>
							</Box>
						}

						<Input formik={formik} formikValue="email" label="Email" type="email" />

						<Input formik={formik} formikValue="password" label="Password" type="password" />

						<Typography marginBottom={2}>
							<Link to="/register" color="primary">Click here to Register</Link>
						</Typography>

						<Button type="submit" variant="contained" size="large" >
							Sign in
						</Button>
					</form>

				</Box>
			</Container>

		</React.Fragment>
	)
}

export default Login;
