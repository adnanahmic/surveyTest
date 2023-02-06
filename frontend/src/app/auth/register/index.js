// Register
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import { setCookie } from 'utils/functions';
import { setIsAuthenticated, setUser } from 'store/reducers/user';
import apiInstance from 'utils/api';
import Input from 'components/form/input';
import { FORM_MESSAGES } from 'common/constants';

const Register = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formMessages, setFormMessages] = useState(null);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string().required(FORM_MESSAGES.FIRSTNAME_REQUIRED),
			lastName: Yup.string().required(FORM_MESSAGES.LASTNAME_REQUIRED),
			email: Yup.string().email(FORM_MESSAGES.EMAIL_INVALID).required(FORM_MESSAGES.EMAIL_REQUIRED),
			password: Yup.string().required(FORM_MESSAGES.PASSWORD_REQUIRED),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			const response = await apiInstance.post('/auth/registration', { ...values });
			if (response?.data?.token) {
				setCookie('token', response?.data?.token);
				dispatch(setIsAuthenticated(true));
				dispatch(setUser(response?.data?.registorData));
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
					<form onSubmit={formik.handleSubmit}>

						<Typography variant="h3" marginBottom={4}> Register </Typography>

						{
							formMessages?.message &&
							<Box marginBottom={3}>
								<Alert severity={formMessages?.type}> {formMessages?.message} </Alert>
							</Box>
						}

						<Input formik={formik} formikValue="firstName" label="First name" />

						<Input formik={formik} formikValue="lastName" label="Last name" />

						<Input formik={formik} formikValue="email" label="Email" type="email" />

						<Input formik={formik} formikValue="password" label="Password" type="password" />

						<Typography marginBottom={2}>
							<Link to="/login" color="primary">Click here to Login</Link>
						</Typography>

						<Button type="submit" variant="contained" size="large" >
							Sign Up
						</Button>
					</form>

				</Box>
			</Container>

		</React.Fragment>
	)
}

export default Register;
