import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';

import './Trips.css';

const Trips = ({ userInfo, loggedIn }) => {
	const [trips, setTrips] = useState([]);
	const [error, setError] = useState(false);

	const getTripsList = async () => {
		try {
			setError(false)
			//get all the trips 
			const response = await fetch(API_URL + 'trips', {
				method: 'GET',
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 200){
				const data = await response.json();
				

				let uniqueData = [];
				data.forEach((obj) => {
					if (!uniqueData.includes(obj)) {
						uniqueData.push(obj);
					}
				});

				setTrips(uniqueData);
                console.log(uniqueData);


			} else {
				setError(true)
			}
		} catch (error) {
			setError(true)
		}
		

		return;
	};

	useEffect(() => {
		getTripsList();
	}, []);

	if (error) {
		return <div>Please log in to see your trips. If you are logged in, please refresh the page and try again later.</div>;
	}

	if (!trips.length) {
		{loggedIn && (
			<Link to='/trips/new'>
				<Button className='mb-4'>Add a trip</Button>
			</Link>
		)}
	}

	return (
		<Container>
			<h1>Trips</h1>
			

			{loggedIn && (
				
				
				<Link to='/trips/new'>
					
					<Button className='mb-4'>Add a trip</Button>
				</Link>
				
			)}

			<Row xs={1} s={2} md={3}>
				{trips.map((trip) => {
					return (
						<Col key={trip.id} className='mb-4'>
							<Link
								to={`/trips/${trip.id}`}
								style={{ color: 'black', textDecoration: 'none' }}>
								<Card>
									<Card.Img variant='top' src={trip.photo} />
									<Card.Body>
										<Card.Title>{trip.label}</Card.Title>
										<Card.Text>
										    Destination: {trip.destination}
                                            
                                            <span><br />read more...</span>
										</Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default Trips;
