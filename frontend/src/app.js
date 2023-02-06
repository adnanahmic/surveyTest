// App
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from 'app/auth/login';
import Register from 'app/auth/register';
import Home from 'app/home';
import Layout from 'components/layout';
import SurveyCreate from 'app/survey/create';
import SurveyTake from 'app/survey/take';
import ViewSurvey from 'app/survey/view';

import ProtectedRoute from 'utils/routes/protected-route';
import { getCookie } from 'utils/functions';
import { setIsAuthenticated } from 'store/reducers/user';
import Toast from 'components/utils/toast';

const App = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { toast } = useSelector(state => state.common);

	useEffect(() => {
		if (getCookie('token')) { dispatch(setIsAuthenticated(true)); }
	}, [dispatch, navigate]);

	return (
		<React.Fragment>
			<Routes>

				<Route path='/survey/:id' element={<SurveyTake />} />

				<Route element={<ProtectedRoute />}>
					<Route path='/' exact element={<Layout><Home /></Layout>} />
					<Route path='/survey/create' element={<Layout><SurveyCreate /></Layout>} />
					<Route path='/survey/update/:id' element={<Layout><SurveyCreate /></Layout>} />
					<Route path='/survey/view/:id' element={<Layout><ViewSurvey /></Layout>} />
				</Route>

				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>


			{/* Toast */}
			{toast?.open && <Toast />}

		</React.Fragment>
	)
}

export default App;
