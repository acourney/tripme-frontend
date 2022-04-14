import React from 'react';
import {  Navbar, Container, Image, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
	return (
        <div className='home-container'>
		<LinkContainer to='/getting-started'>
			<Link to='/trips/new'>		
				<Button variant='outline-info'>New to TripMe? Click Here to Get Started</Button>
			</Link>
		</LinkContainer>

		<Card className="bg-dark text-black" id='brand-card'>
			<Card.Img src="https://imgur.com/tDExJMZ.jpg" alt="Card image" />
			<Card.ImgOverlay>
		
				<Card.Title>TripMe</Card.Title>

				<Card.Text>Travel Planning</Card.Text>
			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black" id='brand-card'>
			<Card.Img src="https://imgur.com/UrBjdRV.jpg" alt="Card image" />
			<Card.ImgOverlay>
			
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					View your planned trips
				</Card.Text>

			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black" id='brand-card'>
			<Card.Img src="https://imgur.com/KsQ2RQo.jpg" alt="Card image" />
			<Card.ImgOverlay>
			    
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					Message your friends
				</Card.Text>

			</Card.ImgOverlay>
		</Card>

		<Card className="bg-dark text-black">
			<Card.Img src="https://imgur.com/VYET5FT.jpg" alt="Card image" />
			<Card.ImgOverlay>
			
				<Card.Title>TripMe</Card.Title>
				<Card.Text>
					View trip details
				</Card.Text>

			</Card.ImgOverlay>
		</Card>



       
        </div>
	);
};

export default Home;