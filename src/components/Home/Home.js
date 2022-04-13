import React from 'react';
import {  Navbar, Container, Image, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Home.css';

const Home = () => {
	return (
        <div className='home-container'>


		<Card className="bg-dark text-black">
			<Card.Img src="https://imgur.com/c2bBXMS.jpg" alt="Card image" />
			<Card.ImgOverlay>
				<Card.Title>TripMe</Card.Title>

				<Card.Text>Travel Planning</Card.Text>
			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black">
			<Card.Img src="https://imgur.com/nK3UMrH.jpg" alt="Card image" />
			<Card.ImgOverlay>
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					View your planned trips
				</Card.Text>

			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black">
			<Card.Img src="https://imgur.com/KwGNlLq.jpg" alt="Card image" />
			<Card.ImgOverlay>
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					Message your friends
				</Card.Text>

			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black">
			<Card.Img src="https://imgur.com/dQiPknL.jpg" alt="Card image" />
			<Card.ImgOverlay>
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					View trip details
				</Card.Text>

			</Card.ImgOverlay>
		</Card>



        <LinkContainer to='/getting-started'>
			<Navbar.Brand>New to TripMe? Click Here to Get Started</Navbar.Brand>
		</LinkContainer>
        </div>
	);
};

export default Home;