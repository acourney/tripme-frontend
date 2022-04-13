import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import useTripDetail from '../../hooks/useTripDetail';
import API_URL from '../../apiConfig';

const AddFriend = (props) => {
    const { id } = useParams();
	let navigate = useNavigate();
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState(null);
	
	const getTripDetail = async () => {
		try {
			const response = await fetch(API_URL + `trips/${id}`);
			if (response.status === 200) {
				const data = await response.json();
				setFormData(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTripDetail();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		try {
			const response = await fetch(API_URL + `trips/${id}`, {
				method: 'PATCH',
				body: formData,
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});

			if (response.status === 200) {
				navigate(`/trips/${id}`);
			}
		} catch (error) {}
	};

	const handleChange = async (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

    if (!formData) {
		return null;
	}

	return (
		<div className='w-75 p-3'>
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>

            <Form.Group controlId='members'>
					<Form.Label>Friend's user ID:</Form.Label>
					<Form.Control
						type='text'
						name='members'
						onChange={handleChange}></Form.Control>
				</Form.Group>

				<Button className='mt-4' type='submit' disabled={error}>
					Submit
				</Button>
				{error && (
					<Alert variant='danger'>
						Oops, something went wrong! Please try again!
					</Alert>
				)}
			</Form>
		</div>
	);
};

export default AddFriend;