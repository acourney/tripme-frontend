import React from "react";
import { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";

import './ChatEngineMessenger.css';

import API_URL from "../../apiConfig";
// import CHATENGINE_PROJECT_ID from "../../messengerConfig";

function ChatEngineMessenger() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    // check if there's a token in local storage
    if (localStorage.getItem("token")) {
      // if so, set logged in to true
      setLoggedIn(true);
      getUserInfo();
    }
    if (!localStorage.getItem("password")) {
      console.error("error");
    }
  }, []);

  return (
    <div className="chat-engine-container">
      {!userInfo ? (
        <p>Log in To Chat with Friends!</p>
      ) : (
        <ChatEngine
          height="75vh"
          width="100%"
          projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
          userName={userInfo.username}
          userSecret={localStorage.getItem("password")}
        />
      )}
    </div>
  );
}

export default ChatEngineMessenger;
