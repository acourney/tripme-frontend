import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Image, Button, Navbar, Nav } from "react-bootstrap";
import useTripDetail from "../../hooks/useTripDetail";
import API_URL from "../../apiConfig";
import ChatEngineMessenger from "../Messaging/ChatEngineMessenger";

import "./TripDetail.css";

const TripDetail = ({ userInfo, loggedIn }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const trip = useTripDetail(id);
  const [tripMembers, setTripMembers] = useState([]);
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
        setTodos(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    // check if there's a token in local storage
    if (trip) {
      // if so, set logged in to true
      console.log("printing members:");
      console.log(trip.members);
      trip.members.map((member) => {
        fetch(API_URL + "users/" + member, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTripMembers([data]);
          })
          .catch(console.log("fetch req error"));
      });
    }
  }, [trip]);

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
    <Container className="p-5 border rounded-3 bg-light">
      <div className="d -flex justify-content-between">
        <div>
          <h2>{trip.label}</h2>
        </div>
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
      <h3>Destination: {trip.destination}</h3>
      <Image rounded fluid src={trip.photo} />
      <h3 className="mt-4">Todos: </h3>
      {!trip.todos.length && <p>No Todos yet!</p>}
      {loggedIn && (
        <Link to={`/trips/${trip.id}/add-todo`}>
          <Button className="mb-5" variant="outline-info">
            Add A Todo Item
          </Button>
        </Link>
      )}

      {todos.length > 0 &&
        todos.map((todo) => {
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
        })}

      <h3>Travel Buddies:</h3>
      {console.log(tripMembers)}
      {tripMembers ? (
        tripMembers.map((member) => {
          return <li key={member.id}>{member.username}</li>;
        })
      ) : (
        <li>No other users have been added to this trip</li>
      )}

      <LinkContainer to={`/trips/${trip.id}/add-friends`}>
        <Nav.Link>
          <Button variant="outline-info">Add Friends to Your Group</Button>
        </Nav.Link>
      </LinkContainer>
    </Container>
  );
};

export default TripDetail;
