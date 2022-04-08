import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const Login = ({ handleSetLoggedIn }) => {
	const initialFormData = {
		email: '',
		password: '',
	};
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);

	const handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};
	const handleLogin = async (event) => {
		event.preventDefault();
		setError(false);
		// write a post request to /token/login
		try {
			const response = await fetch(API_URL + 'token/login/', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// log the auth token
			if (response.status === 200) {
				const data = await response.json();
				handleSetLoggedIn(data.auth_token);
				navigate('/');
				
			} else if (response.status === 400) {
				setError(true);

				}
			console.log(response);
		} catch (error) {
			// handle errors
			console.log("error");
		}
		return;
	};


	return (
		<div>
			<h2>Log in</h2>
			<Form onSubmit={handleLogin}>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						autoFocus
						type='email'
						value={formData.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button type='submit'>Login</Button>
			</Form>
			{error && (
				<Alert variant='warning' className='mt-4'>
					No valid user found with the credentials entered. Please try logging
					in again or <Link to='/signup'>sign up</Link> for an account.
				</Alert>
			)}
		</div>
	);
};

export default Login;
