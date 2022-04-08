import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import TripForm from '../TripForm/TripForm';
import API_URL from '../../apiConfig';
const TripCreate = ({ loggedIn }) => {
	const initialTripData = {
		name: '',
		cuisine: '',
		photo: '',
	};
	const navigate = useNavigate();
	const [newTrip, setNewTrip] = useState(initialTripData);
	const handleChange = (event) => {
		setNewTrip((prevState) => {
			return { ...prevState, [event.target.name]: event.target.value };
		});
	};
	const handleFileUpload = (event) => {
		// update the newTrip photo field with the file uploaded
		// console.log(event.target.files);
		setNewTrip({ ...newTrip, photo: event.target.files[0] });
	};
	const createTrip = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		try {
			const response = await fetch(API_URL + 'trips/', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 201) {
				// redirect to trips
				navigate('/trips');
			}
		} catch (error) {}
	};

	return (
		<div>
			<h2>Add a trip</h2>
			<TripForm
				handleSubmit={createTrip}
				handleChange={handleChange}
				handleFileUpload={handleFileUpload}
				formData={newTrip}
			/>
		</div>
	);
};

export default TripCreate;
