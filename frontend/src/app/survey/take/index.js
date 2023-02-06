// Survey
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';

import apiInstance from 'utils/api';
import TakeSurveyUser from 'app/survey/take/components/take-survey-user';
import { FORM_MESSAGES } from 'common/constants';

const Survey = () => {

	const { id } = useParams();
	const { activeUser } = useSelector(state => state.survey);

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [survey, setSurvey] = useState({});

	const validationSchema = Yup.object({
		option_id: Yup.string().when('isRequired', {
			is: true,
			then: rule => rule.required(FORM_MESSAGES.SELECT_OPTION),
		}),
	}, ['isRequired']);

	const formik = useFormik({
		initialValues: {
			questions: [{ question_id: '', option_id: '', isRequired: true }]
		},
		validationSchema: Yup.object().shape({
			questions: Yup.array().of(validationSchema),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			let data = [ ...values.questions ]
			data = data?.filter(value => value?.option_id !== '')
			const response = await apiInstance.post(`/survey/${survey?.id}/${activeUser?.id}/submit`, {questions: data});
			if (response?.data?.success) {
				setIsSubmitted(true);
			}
		}
	});

	useEffect(() => {
		if (id) { getSurvey(); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const getSurvey = async () => {
		const response = await apiInstance(`/survey/${id}`);
		setSurvey(response?.data);
		const questions = response?.data?.questions?.map(question => {
			return { question_id: question?.id, option_id: '', isRequired: question?.isRequired };
		});
		formik.setFieldValue('questions', questions);
	}

	const handleChange = (e, optionIndex, questionIndex) => {
		const questions = [...formik?.values?.questions];
		questions[questionIndex].option_id = e?.target?.checked ? survey?.questions?.[questionIndex]?.options?.[optionIndex]?.id : '';
		formik.setFieldValue('questions', questions);
	}

	return (
		<React.Fragment>
			<Container maxWidth="lg">

				<Box paddingTop={10} width="100%">
					{
						!isSubmitted ?
							!activeUser ?
								<TakeSurveyUser survey={survey} />
								:
								<>
									<Grid container paddingY={6}>
										<Grid item sm={12} md={6}>
											<Typography variant="h4"> Survey - {survey?.title} </Typography>
										</Grid>
									</Grid>

									<Typography variant="h5" marginBottom={3}> Questions </Typography>

									<form onSubmit={formik.handleSubmit} >
										{
											survey?.questions?.map((question, index) => {												
												return (
													<Box marginBottom={3} key={question?.question}>
														<Typography variant="h6" marginBottom={2} key={question?.id}>
															{index + 1}). {question?.question}
															{
																question?.isRequired && 
																<Typography variant="h6" display="inline-block" color="error">*</Typography>
															}
														</Typography>
														<FormControl>
															<RadioGroup name={question?.id}>
																{
																	question?.options?.map((option, optionIndex) => {
																		return (
																			<FormControlLabel
																				value={option?.id}
																				control={<Radio onChange={e => handleChange(e, optionIndex, index)} />}
																				label={option?.name}
																			/>
																		)
																	})
																}
															</RadioGroup>
														</FormControl>
														
														{formik?.errors?.questions?.[index]?.option_id && formik?.touched?.questions?.[index]?.option_id && (
															<FormHelperText error={true}>
																{formik?.errors?.questions?.[index]?.option_id}
															</FormHelperText>
														)}
													</Box>
												)
											})
										}

										<Box textAlign="right">
											<Button variant="contained" type="submit">Submit</Button>
										</Box>
									</form>

								</>
							:
							<>
								<Typography variant="h4"> Survey Submitted Successfully! </Typography>
							</>
					}
				</Box>
			</Container>
		</React.Fragment>
	)
}

export default Survey;
