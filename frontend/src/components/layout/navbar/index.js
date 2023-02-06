// Navbar
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { setIsAuthenticated, setUser } from 'store/reducers/user';
import { Box, Container } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCookie } from 'utils/functions';

const Navbar = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, user } = useSelector(state => state.user);

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event?.currentTarget);
	};

	const logout = () => {
		dispatch(setIsAuthenticated(false));
		dispatch(setUser(null));
		deleteCookie('token');
		navigate('/login')
	}

	return (
		<AppBar position="static">
			<Container maxWidth="lg">
				<Toolbar disableGutters>

					{/* Desktop */}
					<Typography variant="h6" >
						<Link to="/" className="text-white"> Survey </Link>
					</Typography>

					<Box sx={{ flexGrow: 1 }}> </Box>

					{/* User menu */}
					<Box sx={{ flexGrow: 0 }}>
						<Typography variant="p" marginRight={2}>
							{user?.firstName + ' ' + user?.lastName}
						</Typography>
						{
							isAuthenticated ?
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							:
							<>
								<Button variant="contained">
									<Link to="/login">
										<Typography textAlign="center" color="white">Login</Typography>
									</Link>
								</Button>
								<Button variant="contained" color="info" sx={{ marginLeft: 2 }}>
									<Link to="/register">
										<Typography textAlign="center" color="white">Register</Typography>
									</Link>
								</Button>
							</>
						}

						<Menu
							sx={{ mt: '45px' }}
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={() => setAnchorElUser(null)}
						>
							<MenuItem onClick={logout}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
