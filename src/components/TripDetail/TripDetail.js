import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import useTripDetail from '../../hooks/useTripDetail';
import API_URL from '../../apiConfig';

const TripDetail = ({ userInfo, loggedIn }) => {
	let navigate = useNavigate();
	const { id } = useParams();
	const trip = useTripDetail(id);

	const handleDelete = async (event) => {
		const confirm = window.confirm('Are you sure you want to delete?');

		if (confirm) {
			try {
				const response = await fetch(API_URL + `trips/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Token ${localStorage.getItem('token')}`,
					},
				});

				if (response.status === 204) {
					navigate('/trips');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (!trip) {
		return null;
	}

	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<div className='d -flex justify-content-between'>
				<div>
					<h2>{trip.label}</h2>
				</div>
				{userInfo && userInfo.username === trip.owner && (
					<div>
						<Link
							to={`/trips/${trip.id}/edit`}
							className='btn btn-secondary'>
							Edit
						</Link>
						<Button onClick={handleDelete} variant='danger'>
							Delete
						</Button>
					</div>
				)}
			</div>
			<h3>Cuisine: {trip.destination}</h3>
			<Image rounded fluid src={trip.photo} />
			<h2 className='mt-4'>Reviews: </h2>
			{!trip.reviews.length && <p>No reviews yet!</p>}
			{loggedIn && <Button className='mb-5'>Write a review</Button>}
			{trip.reviews.length > 0 &&
				trip.reviews.map((review) => {
					return (
						<Container
							className='m-4 p-5 border rounded-3 bg-light'
							key={review.id}>
							<h4>{review.title}</h4>
							<p>{review.body}</p>
							<small>
								Posted by: {review.owner} at{' '}
								{new Date(review.created).toLocaleString()}
							</small>
							{userInfo && userInfo.username === review.owner && (
								<div>
									<Button variant='secondary' className='m-4'>
										Edit
									</Button>
									<Button variant='danger'>Delete</Button>
								</div>
							)}
						</Container>
					);
				})}
		</Container>
	);
};

export default TripDetail;