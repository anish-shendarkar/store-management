import axios from "axios";

export const fetchTotalUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:3333/admin/totalusers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchTotalStores = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/totalstores`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchTotalRatings = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/totalratings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchStoresInfo = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/storesinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchNormalUsersInfo = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/normalusersinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchAdminUsersInfo = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/adminusersinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchAllUsersInfo = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:3333/admin/allusersinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postNewUser = async (newUserData: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`http://localhost:3333/admin/createuser`, newUserData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postNewStore = async (newStoreData: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`http://localhost:3333/admin/addstore`, newStoreData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
