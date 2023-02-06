// Survey - Create/Update
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container } from '@mui/system';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup'

import apiInstance from 'utils/api';
import Input from 'components/form/input';
import { setToast } from 'store/reducers/common';
import ConfirmationModal from 'components/utils/confirmation-modal';
import { FORM_MESSAGES, MESSAGES } from 'common/constants';

const Options = ({ survey, questionIndex, name, question, formik, setToast, setSurvey }) => {
	const dispatch = useDispatch();

	const deleteOption = async (index, arrayHelpers) => {
		if (survey?.id) {
			const optionId = survey?.questions[questionIndex]?.options?.[index]?.id;
			const questionId = survey?.questions[questionIndex]?.id;
			if (questionId && optionId) {
				await apiInstance.delete(`survey/${questionId}/option/${optionId}`);
			}
			let currentSurvey = { ...survey }
			currentSurvey?.questions[questionIndex]?.options?.splice(0, 1)
			setSurvey(currentSurvey);
		}
		arrayHelpers.remove(index);
		dispatch(setToast({ open: true, message: MESSAGES.OPTION_DELETED }));
	}

	const getError = (index, type) => {
		return formik?.[type]?.questions?.[questionIndex]?.options?.[index];
	}

	const addOption = async (e) => {
		if (e?.target?.value) {
			const questionId = survey?.questions?.[questionIndex]?.id;
			await apiInstance.post(`survey/${questionId}/option/add`, {
				name: e?.target?.value
			});
		}
	}

	return (
		<FieldArray
			name={name}
			render={arrayHelpers => {
				return (
					<>
						{
							question?.options?.map((option, index) => {
								return (
									<Box marginBottom={2} display="flex" key={option?.id}>
										<Box width="100%">
											<TextField
												id={`${name}.${index}`}
												name={`${name}.${index}`}
												onChange={formik.handleChange}
												label={`Option ${index + 1}`}
												value={formik?.values?.questions?.[questionIndex]?.options?.[index]}
												variant="outlined"
												fullWidth
												error={!!(getError(index, 'errors') && getError(index, 'touched'))}
												size="small"
												onBlur={survey?.id && addOption}
												disabled={!!(survey?.id && survey?.questions?.[questionIndex]?.options?.[index]?.id)}
											/>
											{getError(index, 'errors') && getError(index, 'touched') && (
												<FormHelperText error={true}>
													{getError(index, 'errors')}
												</FormHelperText>
											)}
										</Box>
										<IconButton color="error" className="ml-20" onClick={() => deleteOption(index, arrayHelpers)}>
											<DeleteIcon />
										</IconButton>
									</Box>
								)
							})
						}
						<Grid item sm={12} md={6} marginTop={2}>
							<Button size="small" variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => arrayHelpers.push('')}>
								Add Option
							</Button>
						</Grid>
					</>
				)
			}}
		/>
	)
}

const SurvetCreate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const [survey, setSurvey] = useState({});
	const [modal, setModal] = useState(null);

	useEffect(() => {
		if (id) { getSurvey(); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	// Get survey
	const getSurvey = async () => {
		const response = await apiInstance(`/survey/${id}`);
		if (response?.data) {
			setSurvey(response?.data);
			// Set formik values
			formik.setFieldValue('title', response?.data?.title);
			const questions = response?.data?.questions?.map(question => {
				return {
					question: {
						title: question?.question,
						isRequired: question?.isRequired
					},
					options: question?.options?.map(option => option?.name)
				}
			})
			formik.setFieldValue('questions', questions);
		}
	}

	

	const formik = useFormik({
		initialValues: {
			title: '',
			questions: [{ question: { title: '', isRequired: true }, options: [''] }]
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required(FORM_MESSAGES.TITLE_REQUIRED),
			questions: Yup.array().of(
				Yup.object().shape({
					question: Yup.object().shape({
						title: Yup.string().required(FORM_MESSAGES.QUESTION_REQUIRED),
					}),
					// question: Yup.string().required(FORM_MESSAGES.QUESTION_REQUIRED),
					options: Yup.array().of(
						Yup.string().required(FORM_MESSAGES.OPTION_REQUIRED)
					)
				}),
			),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			const response = await apiInstance.post('/survey/add', { ...values });
			if (response?.data?.success) {
				navigate('/');
			}
		},
	});

	// Update question
	const updateQuestion = async (e, index) => {
		const { value } = e.target;
		const questionId = survey?.questions[index]?.id;
		const isRequired = survey?.questions[index]?.isRequired || true;
		if(value) {
			if (questionId) {
				await apiInstance.put(`survey/${id}/question/${questionId}`, { question: value, isRequired  });
				dispatch(setToast({ open: true, message: MESSAGES.QUESTION_UPDATED }));
			} else {
				await apiInstance.post(`survey/${id}/question/add`, { question: value, isRequired });
				dispatch(setToast({ open: true, message: MESSAGES.QUESTION_ADDED }));
			}
		}
	}

	// Delete question
	const deleteQuestion = async () => {
		const { arrayHelpers, index } = modal?.data;
		const questionId = survey?.questions[index]?.id;
		if (id && questionId) {
			await apiInstance.delete(`survey/${id}/question/${questionId}`);
		}
		arrayHelpers?.remove(index);
		setModal(null);
		dispatch(setToast({ open: true, message: MESSAGES.QUESTION_DELETED }))
	}

	// Update survey title
	const updateSurvey = async (e) => {
		const response = await apiInstance.put(`survey/${id}`, { title: e.target.value });
		if (response?.data?.id) {
			dispatch(setToast({ open: true, message: MESSAGES.SURVEY_TITLE_UPDATED }))
		}
	}

	// Add Question
	const addQuestion = (arrayHelpers) => {
		const question = {
			question: { title: '', isRequired: true }
		};
		if(!survey?.id) { question.options = ['']; }
		arrayHelpers.push(question);
	}

	// Question required change
	const handleChange = async (e, index) => {
		formik.handleChange(e)
		if(id) {
			const { id: questionId, question } = survey?.questions[index];
			const isRequired = e?.target?.checked;
			await apiInstance.put(`survey/${id}/question/${questionId}`, { question, isRequired  });
			dispatch(setToast({ open: true, message: MESSAGES.QUESTION_UPDATED }));
		}
	}

	return (
		<React.Fragment>
			<Container maxWidth="lg">

				<form onSubmit={formik.handleSubmit} >
					{/* Header */}
					<Grid container paddingY={6}>

						<Grid item sm={12} md={6}>
							<Typography variant="h4"> {id ? 'Update' : 'Create'} Survey </Typography>
						</Grid>

						<Grid item sm={12} md={6} justifyContent="flex-end" display="flex">
							<Button variant="contained" color="error">
								<Link to="/">
									<Typography textAlign="center" color="white">Back</Typography>
								</Link>
							</Button>

							{ !id && <Button variant="contained" type="submit" className="ml-20"> Save </Button> }
						</Grid>
					</Grid>

					{/* Survey Title */}
					<Input formik={formik} formikValue="title" label="Survey title" onBlur={(e) => id && updateSurvey(e)} />

					{/* Questions */}
					<Typography variant="h5" marginBottom={2}>Questions</Typography>

					<FormikProvider value={formik}>
						<FieldArray
							name="questions"
							render={arrayHelpers => {
								const questions = formik?.values?.questions;
								return (
									<React.Fragment>
										{
											questions?.map((question, index) => {
												return (
													<Box paddingBottom={4} key={`question_${index}`}>

														<Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
															<Typography variant="h6" display="flex" alignItems="center">
																Question {index + 1}
																{
																	questions?.length > 1 &&
																	<IconButton color="error" className="ml-20" onClick={() => setModal({ show: true, data: { arrayHelpers, index } })}>
																		<DeleteIcon />
																	</IconButton>
																}
															</Typography>

															<Box>
																<FormGroup>
																	<FormControlLabel control={<Checkbox 
																			onChange={(e) => handleChange(e, index)} 
																			name={`questions.${index}.question.isRequired`}
																			checked={questions?.[index]?.question?.isRequired}
																			disabled={!questions?.[index]?.question?.title}
																		/>} 
																		label="Required"
																	/>
																</FormGroup>
															</Box>
														</Box>

														<Box marginBottom={3}>
															<TextField
																id={`questions.${index}.question.title`}
																name={`questions.${index}.question.title`}
																onChange={formik.handleChange}
																value={questions?.[index]?.question?.title}
																label="Question"
																variant="outlined"
																fullWidth
																error={!!(formik?.errors?.questions?.[index]?.question?.title && formik?.touched?.questions?.[index]?.question?.title)}
																onBlur={(e) => id && updateQuestion(e, index)}
															/>
															{formik?.errors?.questions?.[index]?.question?.title && formik?.touched?.questions?.[index]?.question?.title && (
																<FormHelperText error={true}>
																	{formik?.errors?.questions?.[index]?.question?.title}
																</FormHelperText>
															)}
														</Box>

														{/* Options */}
														<Options
															questionIndex={index}
															name={`questions.${index}.options`}
															question={question}
															formik={formik}
															survey={survey}
															setToast={setToast}
															setSurvey={setSurvey}
														/>
													</Box>
												)
											})
										}

										<Box paddingBottom={4} textAlign="right">
											<Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => addQuestion(arrayHelpers)}>
												Add Question
											</Button>
										</Box>
									</React.Fragment>
								)
							}}
						/>
					</FormikProvider>

				</form>

				{/* Delete Question */}
				{
					modal?.show && <ConfirmationModal
						title="Are you sure you want to delete question?"
						modal={modal}
						close={() => setModal(null)}
						deleteConfirm={deleteQuestion}
					/>
				}
			</Container>
		</React.Fragment>
	)
}

export default SurvetCreate;

