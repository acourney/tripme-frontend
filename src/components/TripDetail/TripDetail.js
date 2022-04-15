import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Image, Button, Navbar, Nav } from "react-bootstrap";
import useTripDetail from "../../hooks/useTripDetail";
import DisplayTripMembers from "../DisplayTripMembers/DisplayTripMembers";
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
        setTodos(data);
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

      {/* <DisplayTripMembers /> */}

      {/* <h3>Travel Buddies:</h3>
      {membersLoaded ? (
        console.log(tripMembers[1])
      ) : ( */}
      {/* // tripMembers.map((member) => {
        //   <div className="member" key={member.id}>
        //     <li>{member}</li>
        //   </div>;
        // })
        // tripMembers.map((member) => {
        //   <div className="todo-item" key={member.id}>
        //     <li>{member.username}</li>

        //     {userInfo && userInfo.username === trip.owner && (
        //       <div>
        //         <Button
        //           id={member.id}
        //           onClick={handleRemoveTodoListItem}
        //           variant="outline-warning"
        //         >
        //           Remove Friend from Trip
        //         </Button>
        //       </div>
        //     )}
        //   </div>;
        // })
        // <li>No other users have been added to this trip</li>
      // )}
      {/* {membersLoaded &&
        tripMembers.length > 0 &&
        tripMembers.map((member) => {
          return (
            <div className="todo-item" key={member.id}>
              <li>{member.username}</li>

              {userInfo && userInfo.username === trip.owner && (
                <div>
                  <Button
                    id={member.id}
                    onClick={handleRemoveTodoListItem}
                    variant="outline-warning"
                  >
                    Remove Friend from Trip 
                  </Button> 
                </div>
              )}
            </div>
          );
        })} */}

      {/* {
        tripMembers.length > 0 && <p>tripMembers has length</p>
        // tripMembers.map((member) => {
        //   <p>{member}</p>;
        //   // return <li key={member.id}>{member.username}</li>;
        // })}
      } */}
      {/* {tripMembers.length == 0 ? (
        <li>No other users have been added to this trip</li>
      ) : null} */}
      <br />
      <br />
      <h3>Share this trip with friends:</h3>
      <LinkContainer to={`/trips/${trip.id}/add-friends`}>
        <Nav.Link>
          <Button variant="outline-info">Add Friends to Your Group</Button>
        </Nav.Link>
      </LinkContainer>
    </Container>
  );
};

export default TripDetail;
