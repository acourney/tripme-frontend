import React from "react";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Nav } from "react-bootstrap";
import useTripDetail from "../../hooks/useTripDetail";
import API_URL from "../../apiConfig";

import "./DisplayTripMembers.css";

function DisplayTripMembers(props) {
  let navigate = useNavigate();
  const { id } = useParams();
  const trip = useTripDetail(id);

  const [memberIds, setMemberIds] = useState(null);
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMemberIds = async () => {
    try {
      const response = await fetch(API_URL + `trips/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setMemberIds(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMembers = () => {
    if (memberIds.length) {
      memberIds.map(async (memberId) => {
        const URL = (API_URL = `users/${memberId}`);
        fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMembers(data);
            setLoading(false);
          })
          .catch((err) => console.error(`Oops, something went wrong: ${err}`));
      });
    }
  };

  // useEffect(async () => {}, []);

  useEffect(() => {
    getMemberIds();

    console.log("done with member ids");
  }, [trip]);

  useEffect(() => {
    getMembers();
    console.log("done with member ids");
  }, [memberIds]);

  // const trip = useTripDetail(id);
  // const members = useMemberList(id);

  // useEffect(() => {
  //   if (trip) {
  //     // console.log("printing members:");
  //     // console.log(trip.members);
  //     trip.members.map((member) => {
  //       fetch(API_URL + "users/" + member, {
  //         headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           memberArray.push(data);
  //           // setTripMembers([data]);
  //         })
  //         .catch(console.error());
  //     });
  //   }
  //   setTripMembers(memberArray);
  // }, [trip]);

  // useEffect(() => {
  //   setMembers(tripMembers);
  // }, [tripMembers]);

  // useEffect(() => {
  //   if (members.length > 0) {
  //     setLoading(false);
  //   }
  // }, [members]);
  if (!trip) {
    return null;
  }

  if (!trip.members) {
    return null;
  }

  if (trip.members) {
    return (
      <div className="friend-container">
        <h3 className="mt-4">Travel Buddies: </h3>
        {/* {members && console.log("members has length")} */}
        {/* {members && console.log(...members)} */}

        <LinkContainer to={`/trips/${id}/add-friends`}>
          <Nav.Link>
            <Button variant="outline-info">Add Friends to Your Group</Button>
          </Nav.Link>
        </LinkContainer>
      </div>
    );
  }
}

export default DisplayTripMembers;
