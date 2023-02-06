// Suvery App
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSurveys } from 'store/reducers/survey';

import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

import apiInstance from 'utils/api';
import ConfirmationModal from 'components/utils/confirmation-modal';
import { setToast } from 'store/reducers/common';
import { MESSAGES } from 'common/constants';

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { surveys } = useSelector(state => state.survey);

	const [modal, setModal] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		getAllSurveys();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Get all surveys
	const getAllSurveys = async () => {
		const response = await apiInstance('survey');
		if (response?.data) {
			dispatch(setSurveys(response?.data));
		}
		setIsFetching(false);
	}

	// Activate/Deactivate Survey
	const changeSurveyStatus = async (surveyId) => {
		const response = await apiInstance.post(`/survey/${surveyId}/status`);
		let allSurveys = [...surveys];
		let index = allSurveys?.findIndex(survey => survey.id === surveyId);
		allSurveys[index] = response?.data;
		dispatch(setSurveys(allSurveys));
	}

	// Copy survey link
	const copyLink = survey => {
		const link = `${process.env.REACT_APP_BASE_URL}/survey/${survey.id}`;
		navigator?.clipboard?.writeText(link);
		dispatch(setToast({ open: true, message: MESSAGES.SURVEY_LINK_COPIED }));
	}

	// Delete Survey
	const deleteConfirm = async () => {
		const response = await apiInstance.delete(`/survey/${modal?.data?.id}`);
		if (response?.data?.success) {
			const allSurveys = surveys?.filter(survey => survey.id !== modal?.data?.id);
			dispatch(setSurveys(allSurveys));
			setModal(null);
		}
	}

	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<Grid container paddingY={6} marginBottom={4}>
					<Grid item sm={12} md={6}>
						<Typography variant="h4" >
							Survey
						</Typography>
					</Grid>
					<Grid item sm={12} md={6} justifyContent="flex-end" display="flex">
						<Button variant="contained">
							<Link to="/survey/create">
								<Typography textAlign="center" color="white">Create Survey</Typography>
							</Link>
						</Button>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					{
						!isFetching ?
							surveys?.length > 0 ?
								surveys?.map(survey => {
									return (
										<Grid item xs={4} key={survey.title}>
											<Card variant="outlined">
												<CardContent>
													<Typography variant="h5" marginBottom={2}>
														{survey.title}
													</Typography>
													{
														survey?.status &&
														<Box display="flex" alignItems="flex-start">
															<Typography variant='h6' fontSize={14} marginBottom={2}>
																Survey Link - 
																<Link to={`${process.env.REACT_APP_BASE_URL}/survey/${survey.id}`}>
																	{`${process.env.REACT_APP_BASE_URL}/survey/${survey.id}`}
																</Link>
															</Typography>
															<IconButton className="ml-20" aria-label="Copy Link" onClick={() => copyLink(survey)}>
																<ContentCopyTwoToneIcon />
															</IconButton>
														</Box>

													}

													<Typography variant="p" marginBottom={1} display="block">
														Total Questions: {survey.questions || 0}
													</Typography>

													<Typography variant="p" marginBottom={2} display="block">
														Total Submissions: {survey.totalSubmission || 0}
													</Typography>

													<Box>
													{
														survey?.status ?
															<Button variant="contained" color="error" onClick={() => changeSurveyStatus(survey?.id)}>Deactivate Survey</Button>
															:
															<Button variant="contained" onClick={() => changeSurveyStatus(survey?.id)}>Activate Survey</Button>
													}
													</Box>
												</CardContent>

												{/* Actions */}
												<CardActions>
													<IconButton color="error" aria-label="Delete" onClick={() => setModal({ show: true, data: survey })}>
														<DeleteIcon />
													</IconButton>
													<IconButton color="success" aria-label="Update" onClick={() => navigate(`/survey/update/${survey?.id}`)}>
														<ModeEditIcon />
													</IconButton>
													<IconButton color="primary" aria-label="View" onClick={() => navigate(`/survey/view/${survey?.id}`)}>
														<VisibilityIcon />
													</IconButton>
												</CardActions>
											</Card>
										</Grid>
									)
								})
								:
								<Grid item>
									<Typography variant="p">No Surveys Found.</Typography>
								</Grid>
							:
							<CircularProgress />
					}
				</Grid>

			</Container>

			{/* Delete Survey */}
			{
				modal?.show && <ConfirmationModal
					title="Are you sure you want to delete survey?"
					modal={modal}
					close={() => setModal(null)}
					deleteConfirm={deleteConfirm}
				/>
			}

		</React.Fragment>
	)
}

export default Home;
