import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Image, Button, Navbar, Nav } from "react-bootstrap";
import useTripDetail from "../../hooks/useTripDetail";
import API_URL from "../../apiConfig";

import "./TripDetail.css";

const TripDetail = ({ userInfo, loggedIn }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const trip = useTripDetail(id);

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(API_URL + `trips/${id}/todos/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        
        data.map((todo_item) => {
          if (todo_item.trip_id === parseInt(id)) {
            setTodos(data);
          }
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (event) => {
    const confirm = window.confirm("Remove this trip?");

    if (confirm) {
      try {
        const response = await fetch(API_URL + `trips/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 204) {
          navigate("/trips");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemoveTodoListItem = async (event) => {
    const confirm = window.confirm("Remove todo list item?");

    if (todos) {
      if (confirm) {
        try {
          const response = await fetch(API_URL + `todos/${event.target.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });

          if (response.status === 204) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (!trip) {
    return null;
  }

  return (
    <Container>
      <div className='trip-details-all-content'>
        <div className="trip-details-trip-content">
          <h2>{trip.label}</h2>
          <Image rounded fluid src={trip.photo} />
          <div className="dest-and-edit-buttons">
            <h3>Destination: {trip.destination}</h3>
            {userInfo && userInfo.id === trip.owner && (
                <div>
                  <Link to={`/trips/${trip.id}/edit`}>
                    <Button variant="outline-info">Edit</Button>
                  </Link>
                  <Button onClick={handleDelete} variant="outline-danger">
                    Delete
                  </Button>
                </div>
              )}
            </div>
        </div>
        <div className="trip-details-todo-and-friends-content">
          <h3 className="todos-h3">Todos: </h3>
          {loggedIn && (
            <Link to={`/trips/${trip.id}/add-todo`}>
              <Button className="mb-5" variant="outline-info">
                Add A Todo Item
              </Button>
            </Link>
          )}

          {todos.length > 0 && 
            todos.map((todo) => {
              if (todo.trip_id === parseInt(id)) {
                return (
                  <div className="todo-item" key={todo.id}>
                    <li>{todo.body}</li>
  
                    {userInfo && userInfo.username === todo.owner && (
                      <div>
                        <Button
                          id={todo.id}
                          onClick={handleRemoveTodoListItem}
                          variant="outline-warning"
                        >
                          Remove Item ✔
                        </Button>
                      </div>
                    )}
                  </div>
                );
              }
              
            })}
        

            <br />
            <br />
            <h3>Share this trip with friends:</h3>
            <LinkContainer to={`/trips/${trip.id}/add-friends`}>
              <Nav.Link>
                <Button variant="outline-info">Add Friends to Your Group</Button>
              </Nav.Link>
            </LinkContainer>
          </div>
      </div>
    </Container>

  );
};

export default TripDetail;
