import axios from "axios";
export const fetchTotalRatings = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/owner/totalratings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchAverageStoreRating = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/owner/ratings/average`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.overallRating;
};

export const fetchStoreRatings = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/owner/ratings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


