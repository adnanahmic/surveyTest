// Store
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Reducers
import userReducer from 'store/reducers/user';
import surveyReducer from 'store/reducers/survey';
import commonReducer from 'store/reducers/common';

const persistConfig = {
	key: 'survey',
	storage,
	blacklist: ['survey']
}
const rootReducer = combineReducers({
	user: userReducer,
	survey: surveyReducer,
	common: commonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
});

export const persistor = persistStore(store);
