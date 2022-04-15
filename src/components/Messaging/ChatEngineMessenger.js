import React from "react";
import { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";

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
    <>
      {console.log(process.env.CHATENGINE_PROJECT_ID)}
      {!userInfo ? (
        <p>Log in To Chat with Friends!</p>
      ) : (
        <ChatEngine
          height="75vh"
          width="100%"
          projectID='9e7ab93a-c0ed-495a-bb2e-eb8e85401a0e'
          userName={userInfo.username}
          userSecret={localStorage.getItem("password")}
        />
      )}
    </>
  );
}

export default ChatEngineMessenger;
