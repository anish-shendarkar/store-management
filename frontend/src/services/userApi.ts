import axios from "axios";

// Fetch all stores
export const fetchStores = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:3333/user/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Fetch single store details with ratings
export const fetchStoreById = async (storeId: number) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/user/stores/${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Rate a store
export const rateStore = async (storeId: number, ratingValue: number) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`http://localhost:3333/user/ratestore/${storeId}`, { ratingValue }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Search stores
export const searchStores = async (query: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/user/search/stores?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
