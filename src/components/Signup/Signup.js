import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const Signup = () => {
	const initialFormData = {
		email: '',
		username: '',
		password: '',
		re_password: '',
	};

	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [signupErrors, setSignupErrors] = useState([]);
	const [serverError, setServerError] = useState(false);
	const handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.name]: event.target.value };
		});
	};

	const handleSignup = async (event) => {
		event.preventDefault();
		setSignupErrors([]);
		setError(false);
		setServerError(false);
		try {
			const response = await fetch(API_URL + 'users/', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 201) {
				// user was created
				setSuccess(true);
				// redirect to login
				setTimeout(() => {
					navigate('/login');
				}, 5000);
			} else if (response.status === 400) {
				// status 400 -- something bad about the request
				// let user know what's wrong with their signup
				const data = await response.json();
				const errors = [];
				for (const error in data) {
					errors.push(data[error]);
				}

				setSignupErrors(errors);
			} else {
				// set error to true
				setServerError(true);
			}
			console.log(response);
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
		return;
	};

	const handlePasswordMatch = (event) => {
		if (formData.password !== formData.re_password) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<div className='w-75 p-3'>
			<h2>Create an account</h2>
			<Form onSubmit={handleSignup}>
				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						type='email'
						value={formData.email}
						name='email'
						onChange={handleChange}
					/>
					<Form.Control.Feedback type='invalid'>
						Please provide a valid email .
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='re_password'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						required
						type='password'
						name='re_password'
						value={formData.re_password}
						onChange={handleChange}
						onBlur={handlePasswordMatch}
					/>
				</Form.Group>
				<Button type='submit' disabled={error}>
					Sign up
				</Button>
				{error && <Alert variant='danger'>Passwords must match!</Alert>}
				{success && (
					<Alert variant='success' className='mt-5'>
						User successfully created! You will be redirected to log in. If you
						are not automatically redirected, please click{' '}
						{<Link to='/login'>here</Link>}.
					</Alert>
				)}
				{Boolean(signupErrors.length) &&
					signupErrors.map((error) => {
						return <Alert variant='danger'>{error}</Alert>;
					})}
				{serverError && (
					<div>Oops, something went wrong! Please try again later!</div>
				)}
			</Form>
		</div>
	);
};

export default Signup;
