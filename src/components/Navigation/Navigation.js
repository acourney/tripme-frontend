import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Navigation.css';

const Navigation = ({ loggedIn, handleLogout, userInfo }) => {
	return (
		<Navbar bg='info' variant="light">
			<Container className='nav-container'>
				<LinkContainer to='/'>
					<Navbar.Brand><img src='https://imgur.com/LGdBtYJ.png' alt="trip me logo"/><h2 id='nav-logo'>TripMe</h2></Navbar.Brand>
					
				</LinkContainer>
				{userInfo && (
							<Navbar.Text className='justify-content-end'>
								Welcome, {userInfo.username}
							</Navbar.Text>
						)}
				
				<Navbar.Collapse id='basic-navbar-nav' >
					<Nav className='me-auto'>
						<LinkContainer to='/'>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/trips'>
							<Nav.Link>Trips</Nav.Link>
						</LinkContainer>
					</Nav>
					<Nav>
						
						{loggedIn ? (
							<>
								<LinkContainer to='/message-center'>
									<Nav.Link>Message Center</Nav.Link>
								</LinkContainer>

								<LinkContainer to='/'>
									<Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
								</LinkContainer>
								
							</>
						) : (
							<>
								<LinkContainer to='/signup'>
									<Nav.Link>Sign Up</Nav.Link>
								</LinkContainer>
								<LinkContainer to='/login'>
									<Nav.Link>Log In</Nav.Link>
								</LinkContainer>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
