// Common
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toast: null
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
})

export const { setToast } = commonSlice.actions;

export default commonSlice.reducer;
