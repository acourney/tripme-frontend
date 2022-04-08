import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<h1>TripMe</h1>
			<Image
				rounded
				fluid
				src='https://cdn.pixabay.com/photo/2014/11/03/10/44/camera-514992_1280.jpg'
			/>
		</Container>
	);
};

export default Home;