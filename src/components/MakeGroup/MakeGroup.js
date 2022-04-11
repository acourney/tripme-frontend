import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const MakeGroup = () => {
	const initialFormData = {
        name: '',
		users: '',
	};

	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [makeGroupErrors, setMakeGroupErrors] = useState([]);
	const [serverError, setServerError] = useState(false);
    const [validUser, setValidUser] = useState(false);

    const handleValidUser = () => {
		setValidUser(true);
	};

    const handleGroupCreation = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(API_URL + 'users/', {
                method: 'GET',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // log the auth token
            if (response.status === 200) {
                const data = await response.json();
                handleValidUser();
                
                
            } else if (response.status === 400) {
                setError(true);
    
                }
            console.log(response);
        } catch (error) {
            // handle errors
            console.log("error");
        }
    }

	const handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.name]: event.target.value };
		});
	};

	// const handleSignup = async (event) => {
	// 	event.preventDefault();
	// 	setMakeGroupErrors([]);
	// 	setError(false);
	// 	setServerError(false);
	// 	try {
	// 		const response = await fetch(API_URL + 'groups/', {
	// 			method: 'POST',
	// 			body: JSON.stringify(formData),
	// 			headers: {
	// 				'Content-Type': 'application/json',
    //                 Authorization: `Token ${localStorage.getItem('token')}`,
	// 			},
	// 		});
	// 		if (response.status === 201) {
	// 			// user was created
	// 			setSuccess(true);
	// 			// redirect to login
	// 			setTimeout(() => {
	// 				navigate('/trips');
	// 			}, 5000);
	// 		} else if (response.status === 400) {
	// 			// status 400 -- something bad about the request
	// 			// let user know what's wrong with their signup
	// 			const data = await response.json();
	// 			const errors = [];
	// 			for (const error in data) {
	// 				errors.push(data[error]);
	// 			}

	// 			setMakeGroupErrors(errors);
	// 		} else {
	// 			// set error to true
	// 			setServerError(true);
	// 		}
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.log(error);
	// 		setServerError(true);
	// 	}
	// 	return;
	// };


	return (
		<div className='w-75 p-3'>
			<h2>Add Travel Buddies to Your Group</h2>
			<Form onSubmit={handleGroupCreation}>
                <Form.Group controlId='group_name'>
					<Form.Label>Group Label:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='username'>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='users'
						value={formData.users}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button type='submit' disabled={error}>
					Add To Group
				</Button>
				
				{error && <Alert variant='danger'>User Does Not Exist!</Alert>}
				{success && (
					<Alert variant='success' className='mt-5'>
						Group Created! You will be redirected to your groups page. If you are not automatically redirected, please click{' '}
						{<Link to='/trips'>here</Link>}.
					</Alert>
				)}
				{Boolean(makeGroupErrors.length) &&
					makeGroupErrors.map((error) => {
						return <Alert variant='danger'>{error}</Alert>;
					})}
				{serverError && (
					<div>Oops, something went wrong! Please try again later!</div>
				)}
			</Form>
		</div>
	);
};

export default MakeGroup;
