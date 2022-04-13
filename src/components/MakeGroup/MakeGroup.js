import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const MakeGroup = () => {
	const initialFormData = {
        trip: '',
		member: '',
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
	// send put request with user id
    const handleGroupCreation = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(API_URL + 'members/', {
				method: 'POST',
				body: JSON.stringify({
					'trip': formData.trip,
					'members': formData.member
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
            console.log(response);
            if (response.status === 200) {
				const data = await response.json();
				console.log(data);
			} else if (response.status === 400) {
				setError(true);

				}
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

	

	return (
		<div className='w-75 p-3'>
			<h2>Add A Travel Partner to Your Trip:</h2>
			{/* most likely will need to update with trip_id and not the trip label */}
			{/* not sure how to get that information for the post request */}
			{/* in SQL: SELECT trip_id FROM trips_trip WHERE 'label' = 'Hiking Trip'; */}
			<Form onSubmit={handleGroupCreation}>
                <Form.Group controlId='group_name'>
					<Form.Label>Trip Label:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='name'
						value={formData.trip}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='username'>
					<Form.Label>Friend's Username:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='users'
						value={formData.member}
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
