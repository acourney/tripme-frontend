import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TripForm from '../TripForm/TripForm';
import useTripDetail from '../../hooks/useTripDetail';
import API_URL from '../../apiConfig';

function TripEdit(props) {
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
				method: 'PUT',
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

	const handleFileUpload = async (event) => {
		setFormData({ ...formData, photo: event.target.files[0] });
	};

	if (!formData) {
		return null;
	}

	return (
		<div>
			<h2>Edit trip</h2>
			<TripForm
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				handleFileUpload={handleFileUpload}
				formData={formData}
			/>
		</div>
	);
}

export default TripEdit;

