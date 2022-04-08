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
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						name='name'
						onChange={handleChange}
						value={formData.name}
					/>
				</Form.Group>
				<Form.Group controlId='cuisine'>
					<Form.Label>Cuisine</Form.Label>
					<Form.Control
						required
						type='text'
						name='cuisine'
						onChange={handleChange}
						value={formData.cuisine}
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