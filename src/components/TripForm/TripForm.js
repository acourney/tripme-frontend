import { Form, Button, Alert } from 'react-bootstrap';

const TripForm = ({
	handleSubmit,
	formData,
	handleChange,
	handleFileUpload,
	error,
}) => {
	return (
		<div className='w-75 p-3'>
			<Form onSubmit={handleSubmit} encType='multipart/form-data'>
				<Form.Group controlId='label'>
					<Form.Label>Label</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='label'
						onChange={handleChange}
						value={formData.label}
					/>
				</Form.Group>
				<Form.Group controlId='destination'>
					<Form.Label>Destination</Form.Label>
					<Form.Control
						required
						type='text'
						name='destination'
						onChange={handleChange}
						value={formData.destination}
					/>
				</Form.Group>
				<Form.Group controlId='photo'>
					<Form.Label>Photo</Form.Label>
					<Form.Control
						type='file'
						name='photo'
						accept='image/*'
						onChange={handleFileUpload}></Form.Control>
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

export default TripForm;