import { useState, useEffect } from "react";
import useTripDetail from "./useTripDetail";
import API_URL from "../apiConfig";

function useMemberList(id) {
  const trip = useTripDetail(id);
  const [tripMembers, setTripMembers] = useState([]);
  const [tripMembersIds, setTripMembersIds] = useState([]);
  const memberArray = [];

  useEffect(() => {
    getMembersIds();
  }, [trip]);

  const getMembersIds = async () => {
    try {
      const response = await fetch(API_URL + `trips/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setTripMembersIds(data.members);
      }
    } catch (error) {
      console.log(error);
    }
    getMembers();
  };

  const getMembers = () => {
    try {
      tripMembersIds.map(async (memberId) => {
        const response = await fetch(API_URL + `users/${memberId}`, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          memberArray.push(data);
        }
      });
    } catch (error) {
      console.log(error);
    }

    setTripMembers(memberArray);
  };

  return tripMembers;
}

export default useMemberList;
