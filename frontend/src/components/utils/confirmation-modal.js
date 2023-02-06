// Confirmation Modal
import React from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ConfirmationModal = ({ modal, close, title, deleteConfirm }) => {

	return (
		<React.Fragment>
			<Modal
				open={modal?.show}
				onClose={close}
				closeAfterTransition
			>
				<Box className="modal">
					<Typography marginBottom={5} variant="h5"> {title} </Typography>

					<Box display="flex" justifyContent="flex-end">
						<Button variant="outlined" onClick={close}>
							Cancel
						</Button>

						<Button color="error" variant="contained" className="ml-20" onClick={deleteConfirm}>
							Delete
						</Button>
					</Box>
				</Box>
			</Modal>
		</React.Fragment>
	)
}

export default ConfirmationModal;
