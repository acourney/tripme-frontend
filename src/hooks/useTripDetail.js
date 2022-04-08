import { useState, useEffect } from "react";
import API_URL from "../apiConfig";

function useTripDetail(id) {
  const [trip, setTrip] = useState(null);

  const getTripDetail = async () => {
    try {
      const response = await fetch(API_URL + `trips/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setTrip(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripDetail();
  }, []);

  return trip;
}

export default useTripDetail;
