import React from 'react';
import {  Navbar, Container, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function GettingStarted(props) {
    return (
        <Container className='m-4 p-5 border rounded-3 bg-light'>
            TripMe is a site to organize your upcoming trips and vacations.

            You can add friends to your groups so they can help you plan or view your To Do list to plan your trips.

            There is also a messaging center so you can talk to your friends about your trips.

            <LinkContainer to='/signup'>
			<Navbar.Brand>Sign up today to get started!</Navbar.Brand>
		    </LinkContainer>

        </Container>
    );
}

export default GettingStarted;