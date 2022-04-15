import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../apiConfig";


import "./AddFriend.css";

const AddFriend = ({ userInfo, loggedIn }) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);
  const [members, setMembers] = useState([]);
  const [userList, setUserList] = useState(null);

  const makeUserList = async () => {
    try {
      const response = await fetch(API_URL + `users/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${process.env.REACT_APP_ADMIN_TOKEN}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTripDetail = async () => {
    try {
      const response = await fetch(API_URL + `trips/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setFormData(data);
        setMembers(data.members);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripDetail();
    makeUserList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    delete formData.members;
    delete formData.photo;
    // not state:
    const data = new FormData();
    // this one is state:
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    members.map((member) => {
      data.append("members", parseInt(member));
    });

    try {
      const response = await fetch(API_URL + `trips/${id}`, {
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        navigate(`/trips/${id}`);
      }
    } catch (error) {}
  };

  const handleChange = async (event) => {
    setMembers([...members, parseInt(event.target.value)]);
  };

  if (!formData) {
    return null;
  }

  return (
    <>
      {userInfo && (
        <div className="w-75 p-3" id="friend-dropdown-container">
          <h3>Select your friend's email:</h3>
          <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            id="friend-dropdown"
          >
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
            >
              <option>Open this select menu</option>

              {userList &&
                userList.map((user) => {
                  return <option value={user.id}>{user.email}</option>;
                })}
            </Form.Select>

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
      )}
    </>
  );
};

export default AddFriend;
