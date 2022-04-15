import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useTripDetail from "../../hooks/useTripDetail";
import API_URL from "../../apiConfig";

function TodoForm({ userInfo, loggedIn }) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  const initialTodo = {
    body: "",
  };
  const [todo, setTodo] = useState(initialTodo);

  const createTodo = async (event) => {
    event.preventDefault();
    delete todo.body;
    const data = new FormData(event.target);

    for (const key in todo) {
      data.append(key, todo[key]);
    }
    JSON.stringify(data);
    data.append("trip_id", parseInt(id));

    try {
      const response = await fetch(API_URL + `trips/${id}/todos/`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        navigate(`/trips/${id}`);
      }
    } catch (error) {}
  };

  const handleChange = (event) => {
    setTodo({ ...todo, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <Form onSubmit={createTodo} encType="multipart/form-data">
        <Form.Group controlId="body">
          <Form.Label>Todo Item:</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            name="body"
            onChange={handleChange}
            value={todo.body}
          />
        </Form.Group>

        <Button variant="outline-info" type="submit" disabled={error}>
          Submit
        </Button>
        {error && (
          <Alert variant="danger">
            Oops, something went wrong! Please try again!
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default TodoForm;
