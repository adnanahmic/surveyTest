// Toast
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from 'store/reducers/common';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Toast = () => {

	const dispatch = useDispatch();
	const { toast } = useSelector(state => state.common);

	const close = () => {
		dispatch(setToast(null));
	}

	useEffect(() => {
		setTimeout(() => {
			dispatch(setToast(null));
		}, 2000);
	}, [toast, dispatch]);

	const action = (
		<React.Fragment>
			<IconButton size="small" color="inherit" onClick={close}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<Snackbar open={toast?.open} message={toast?.message} action={action} />
	);
}

export default Toast;