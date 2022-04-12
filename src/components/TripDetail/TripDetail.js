import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image, Button, Navbar, Nav } from 'react-bootstrap';
import useTripDetail from '../../hooks/useTripDetail';
import API_URL from '../../apiConfig';
import ChatEngineMessenger from '../Messaging/ChatEngineMessenger';
import MakeGroup from '../MakeGroup/MakeGroup';

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
			<h3>Destination: {trip.destination}</h3>
			<Image rounded fluid src={trip.photo} />
			<h2 className='mt-4'>Todos: </h2>
			{!trip.todos.length && <p>No todos yet!</p>}
			{loggedIn && <Button className='mb-5'>Write a todo</Button>}
			{trip.todos.length > 0 &&
				trip.todos.map((todo) => {
					return (
						<Container
							className='m-4 p-5 border rounded-3 bg-light'
							key={todo.id}>
							<h4>{todo.title}</h4>
							<p>{todo.body}</p>
							<small>
								Posted by: {todo.owner} at{' '}
								{new Date(todo.created).toLocaleString()}
							</small>
							{userInfo && userInfo.username === todo.owner && (
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
				<LinkContainer to='/trips/:id/add-group-member'>
									<Nav.Link>Add Friends to Your Group</Nav.Link>
								</LinkContainer>
								<ChatEngineMessenger />
				
                
		</Container>
	);
};

export default TripDetail;
