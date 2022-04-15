import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Trips from "./components/Trips/Trips";
import TripDetail from "./components/TripDetail/TripDetail";
import TripCreate from "./components/TripCreate/TripCreate";
import TripEdit from "./components/TripEdit/TripEdit";
import AddFriend from "./components/MakeGroup/AddFriend";
import GettingStarted from "./components/GettingStarted/GettingStarted";
import ChatEngineMessenger from "./components/Messaging/ChatEngineMessenger";
import TodoForm from "./components/TodoForm/TodoForm";

import "./App.css";
import API_URL from "./apiConfig";

function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleSetLoggedIn = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
    getUserInfo();
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(API_URL + "users/me/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    // destroy token POST token/logout/
    try {
      const response = await fetch(API_URL + "token/logout/", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 204) {
        // set logged in to false
        setLoggedIn(false);
        // clear user data
        setUserInfo(null);
        // remove token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("password");
        alert("You have been logged out!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    // check if there's a token in local storage
    if (localStorage.getItem("token")) {
      // if so, set logged in to true
      setLoggedIn(true);
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Navigation
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        userInfo={userInfo}
      />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/trips/new"
              element={<TripCreate loggedIn={loggedIn} />}
            />
            <Route
              path="/trips"
              element={<Trips userInfo={userInfo} loggedIn={loggedIn} />}
            />
            <Route
              path="/trips/:id"
              element={<TripDetail userInfo={userInfo} loggedIn={loggedIn} />}
            />
            <Route
              path="/trips/:id/edit"
              element={<TripEdit userInfo={userInfo} loggedIn={loggedIn} />}
            />

            <Route
              path="/trips/:id/add-friends"
              element={<AddFriend userInfo={userInfo} loggedIn={loggedIn} />}
            />

            <Route path="/getting-started" element={<GettingStarted />} />

            <Route path="/message-center" element={<ChatEngineMessenger />} />

            <Route
              path="/trips/:id/add-todo"
              element={<TodoForm userInfo={userInfo} loggedIn={loggedIn} />}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
