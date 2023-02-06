// Take Survey User
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveUser } from 'store/reducers/survey';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { Container, Box } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FORM_MESSAGES } from 'common/constants';
import Input from 'components/form/input';
import apiInstance from 'utils/api';

const TakeSurveyUser = ({ survey }) => {
	const dispatch = useDispatch();
	const [formMessages, setFormMessages] = useState(null);

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
			email: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required(FORM_MESSAGES.NAME_REQUIRED),
			surname: Yup.string().required(FORM_MESSAGES.SURNAME_REQUIRED),
			email: Yup.string().email(FORM_MESSAGES.EMAIL_INVALID).required(FORM_MESSAGES.EMAIL_REQUIRED),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			const response = await apiInstance.post(`/survey/${survey?.id}/registor/user`, { ...values });
			if (response?.data?.id) {
				dispatch(setActiveUser(response?.data));
			} else {
				setFormMessages({ type: 'error', message: response?.data?.message });
			}
		},
	});

	return (
		<React.Fragment>
			<Container maxWidth="sm" sx={{ marginTop: '32px' }}>
				{
					survey?.status ?
						<>
							{
								formMessages?.message &&
								<Box marginBottom={3}>
									<Alert severity={formMessages?.type}> {formMessages?.message} </Alert>
								</Box>
							}

							<Box>
								<form onSubmit={formik.handleSubmit} >

									<Typography variant="h5" marginBottom={4}>
										Take Survey - <strong>{survey?.title}</strong>
									</Typography>

									<Grid container columnSpacing={2}>
										<Grid item sm={6}>
											<Input formik={formik} formikValue="name" label="Name" />
										</Grid>
										<Grid item sm={6}>
											<Input formik={formik} formikValue="surname" label="Surname" />
										</Grid>
									</Grid>
									<Input formik={formik} formikValue="email" label="Email" />

									<Box textAlign="right">
										<Button variant="contained" type="submit" sx={{ marginLeft: '20px' }}>
											Submit
										</Button>
									</Box>
								</form>
							</Box>
						</>
						:
						<>
							<Typography variant="h4">
								Invalid Survey!
							</Typography>
						</>
				}
			</Container>
		</React.Fragment>
	)
}

export default TakeSurveyUser;
