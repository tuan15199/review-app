import axios from "axios";
import store from "../store";

const url = {
  baseUrl: "http://localhost:8080/",
  login: "/users/signin",
  user: "users",
  shop: "shops",
  city: "cities",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  // grab current state
  const state = store.getState()
  if (state.auth.token) {
    request.headers.Authorization = state.auth.token;
  }
  return request;
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

const api = {
  url: url,
  axios: instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
}

export default api;