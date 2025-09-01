import axios from "axios";

export const getStores = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:3333/user/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getStoreById = async (id: number) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/user/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const rateStore = async (id: number, value: number) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`http://localhost:3333/user/ratestore/${id}`, { value }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};