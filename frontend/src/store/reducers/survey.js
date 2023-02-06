// Survey
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	surveys: [],
	activeUser: null
}

export const SurveySlice = createSlice({
	name: 'survey',
	initialState,
	reducers: {
		setSurveys: (state, action) => {
			state.surveys = action.payload;
		},
		setActiveUser: (state, action) => {
			state.activeUser = action.payload;
		}
	},
})

export const { setSurveys, setActiveUser } = SurveySlice.actions;

export default SurveySlice.reducer;
