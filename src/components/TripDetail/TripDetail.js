import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image, Button, Navbar, Nav } from 'react-bootstrap';
import useTripDetail from '../../hooks/useTripDetail';
import API_URL from '../../apiConfig';
import ChatEngineMessenger from '../Messaging/ChatEngineMessenger';



import './TripDetail.css';

const TripDetail = ({ userInfo, loggedIn }) => {
	let navigate = useNavigate();
	const { id } = useParams();
	const trip = useTripDetail(id);
	const [tripMembers, setTripMembers] = useState([])
	
	useEffect(() => {
		// check if there's a token in local storage
		if (trip) {
			// if so, set logged in to true
			console.log('printing members:')
			console.log(trip.members)
			trip.members.map((member) => {
				fetch (API_URL + 'users/' + member,  {headers: { Authorization: `Token ${localStorage.getItem('token')}`,
					}} )
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					setTripMembers([data])
				})
				.catch((console.log('fetch req error')));
			});

		}
	}, [trip]);
	

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
				{userInfo && userInfo.id === trip.owner && (
					<div>
						<Link to={`/trips/${trip.id}/edit`}>
							<Button variant='outline-info'>Edit</Button>
						</Link>
						<Button onClick={handleDelete} variant='outline-danger'>
							Delete
						</Button>
					</div>
				)}
			</div>
			<h3>Destination: {trip.destination}</h3>
			<Image rounded fluid src={trip.photo} />
			<h3 className='mt-4'>Todos: </h3>
			<ul>
				<li>Book Airbnb</li>
				<li>Pack sunblock</li>
			</ul>
			{/* {!trip.todos.length && <p>No todos yet!</p>} */}
			{/* {loggedIn && <Button className='mb-5'>Write a todo</Button>} */}
			{/* {trip.todos.length > 0 &&
				trip.todos.map((todo) => {
					return (
						<Container
							className='m-4 p-5 border rounded-3 bg-light'
							key={todo.id}>
							<h4>{todo.title}</h4>
							<p>{todo.body}</p>
							<small>
								organized by: {trip.owner}
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
				})} */}
				{/* {!trip.todos.length && <p>No todos yet!</p>} */}
			{/* {loggedIn && <Button className='mb-5'>Write a todo</Button>} */}
			{/* <Container className='m-4 p-5 border rounded-3 bg-light'> */}

			<h3>Travel Buddies:</h3>
			{tripMembers ? (tripMembers.map((member) => {
					return (
						<li key={member.id}>{member.username}</li>
						// {userInfo && userInfo.username === todo.owner && (
						// 		<div>
						// 			<Button variant='secondary' className='m-4'>
						// 				Edit
						// 			</Button>
						// 			<Button variant='danger'>Delete</Button>
						// 		</div>
						// 	)}
						
					);
				})) : (<li>No other users have been added to this trip</li>) }
			{/* {tripMembers.length > 0 &&
				tripMembers.map((member) => {
					return (
						<li key={member.id}>{member.username}</li>
						// {userInfo && userInfo.username === todo.owner && (
						// 		<div>
						// 			<Button variant='secondary' className='m-4'>
						// 				Edit
						// 			</Button>
						// 			<Button variant='danger'>Delete</Button>
						// 		</div>
						// 	)}
						
					);
				})} */}
				{/* </Container> */}

				<LinkContainer to={`/trips/${trip.id}/add-friends`}>
					<Nav.Link><Button variant='outline-info'>Add Friends to Your Group</Button></Nav.Link>
				</LinkContainer>
				
				
                
		</Container>
	);
};

export default TripDetail;
