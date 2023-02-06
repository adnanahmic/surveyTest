// Form - Input
import React from 'react';
import { FormHelperText, TextField } from '@mui/material';
import { Box } from '@mui/system';

const Input = ({ formik, formikValue, label, onBlur, type }) => {
	return (
		<React.Fragment>

			<Box marginBottom={3}>
				<TextField
					id={formikValue}
					name={formikValue}
					value={formik?.values?.[formikValue]}
					onChange={formik.handleChange}
					label={label}
					variant="outlined"
					fullWidth
					type={type || 'text'}
					error={formik?.errors?.[formikValue] && formik?.touched?.[formikValue]}
					onBlur={onBlur}
				/>
				{formik?.errors?.[formikValue] && formik?.touched?.[formikValue] && (
					<FormHelperText error={true}>
						{formik?.errors?.[formikValue]}
					</FormHelperText>
				)}
			</Box>

		</React.Fragment>
	)
}

export default Input;
