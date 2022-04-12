import React from 'react';
import { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';

import API_URL from '../../apiConfig';

const project_id = process.env.CHATENGINE_PROJECT_ID;
const username = process.env.CHATENGINE_ADMIN_USERNAME;
const password = process.env.CHATENGINE_ADMIN_USER_SECRET;

 function ChatEngineMessenger() {
    const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
    const [password, setPassword] = useState("");


    const getUserInfo = async () => {
		try {
			const response = await fetch(API_URL + 'users/me/', {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				setUserInfo(data);
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
    	// check if there's a token in local storage
    	if (localStorage.getItem('token')) {
    		// if so, set logged in to true
    		setLoggedIn(true);
    		getUserInfo();
    	}
        if (!localStorage.getItem('password')) {
            console.error("error")
        }
	}, []);

 	return (
         <>
        {!userInfo ? (<p>Log in To Chat with Friends!</p>) : (
        <ChatEngine
            height="35vh"
 			projectID=
 			userName={userInfo.username}
 			userSecret={localStorage.getItem('password')}
 		/>) }
 		
         </>
 	);
 }
 

 export default ChatEngineMessenger;