// Survey - View
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';

import apiInstance from 'utils/api';

const ViewSurvey = () => {

	const { id } = useParams();
	const [surveyDetails, setSurveyDetails] = useState([]);

	useEffect(() => {
		if (id) { getSurvey(); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const getSurvey = async () => {
		const response = await apiInstance(`/survey/view/${id}`);
		setSurveyDetails(response?.data);
	}

	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<Grid container paddingY={6}>
					<Grid item sm={12} md={12}>
						<Typography variant="h4" > Survey - {surveyDetails?.survey?.title} </Typography>
					</Grid>

					<Grid item sm={12} md={12} marginTop={2}>
						<Typography variant="p" > Total Submissions - {surveyDetails?.submission?.length} </Typography>
					</Grid>
				</Grid>

				{
					surveyDetails?.submission?.map(data => {
						return (
							<Box marginBottom={4} key={data?.user?.email}>
								<Box marginBottom={3}>

									<Typography variant="h5" marginBottom={1}> Name: {data?.user?.name} {data?.user?.surName} </Typography>
									<Typography variant="h6" marginBottom={3}> Email: {data?.user?.email} </Typography>

								</Box>
								<TableContainer component={Paper}>
									<Table>

										<TableHead>
											<TableRow>
												<TableCell>Question</TableCell>
												<TableCell>Answer</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{
												data?.answers?.map((answer, index) => (
													<TableRow key={answer?.name || index} >
														<TableCell component="th" scope="row">
															{answer?.question?.question}
														</TableCell>
														<TableCell component="th" scope="row">
															{answer?.option?.name}
														</TableCell>
													</TableRow>
												))
											}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
						)
					})
				}
			</Container>
		</React.Fragment>
	)
}

export default ViewSurvey;
