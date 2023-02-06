// Navbar
import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />

			{children}
		</React.Fragment>
	)
}

export default Layout;
