import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const MakeGroup = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const [formData, setFormData] = useState(null);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [makeGroupErrors, setMakeGroupErrors] = useState([]);
	const [serverError, setServerError] = useState(false);
    const [validUser, setValidUser] = useState(false);


	const getTripDetail = async () => {
		try {
			const response = await fetch(API_URL + `trips/${id}`);
			if (response.status === 200) {
				const data = await response.json();
				setFormData(data);
				console.log(data.members)
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTripDetail();
	}, []);

	
    // const handleValidUser = () => {
	// 	setValidUser(true);
	// };
	// send put request with user id
    const handleGroupCreation = async (event) => {
        event.preventDefault();
		const formData = new FormData(event.target);

        try {
            const response = await fetch(API_URL + `trips/${id}`, {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
            if (response.status === 200) {
				navigate(`/trips/${id}`);
			} 
        } catch (error) {
            // handle errors
            console.log("error");
        }
    }

	const handleChange = (event) => {
		setFormData({ ...formData, members: event.target.value });
	};

	if (!formData) {
		return null;
	}

	return (
		<div className='w-75 p-3'>
			<h2>Add A Travel Partner to Your Trip:</h2>
			{/* most likely will need to update with trip_id and not the trip label */}
			{/* not sure how to get that information for the post request */}
			{/* in SQL: SELECT trip_id FROM trips_trip WHERE 'label' = 'Hiking Trip'; */}

			<Form onSubmit={handleGroupCreation} encType='multipart/form-data'>
				{/* <Form.Group controlId='trip'>
					<Form.Label>Trip Label:</Form.Label>
					<Form.Control required autoFocus type='text' name='trip' value={formData.trip}
						onChange={handleChange} />
				</Form.Group> */}
				<Form.Group controlId='members'>
					<Form.Label>Friend's email:</Form.Label>
					<Form.Control required type='text' name='members' value={formData.members}
						onChange={handleChange} />
				</Form.Group>
				{/* </Form.Group>
                <Form.Group controlId='trip_label'>
					<Form.Label>Trip Label:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='trip_label'
						value={formData.trip}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='user_email'>
					<Form.Label>Friend's Email:</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='user_email'
						value={formData.member}
						onChange={handleChange}
					/>
				</Form.Group> */}
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
