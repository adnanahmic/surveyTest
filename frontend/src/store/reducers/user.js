// User
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
}

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
})

export const { setUser, setIsAuthenticated } = UserSlice.actions;

export default UserSlice.reducer;
