import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';

const Trips = ({ loggedIn }) => {
	const [trips, setTrips] = useState([]);
	const [error, setError] = useState(false);

	const getTripsList = async () => {
		try {
			setError(false)
			//get all the trips 
			const response = await fetch(API_URL + 'trips');
			if (response.status === 200){
				const data = await response.json();
				setTrips(data);
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

	if (error && !trips.length) {
		return <div>Ooops, something went wrong! Please try again later!</div>;
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
										<Card.Title>{trip.name}</Card.Title>
										<Card.Text>
											Todo List Here:
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
