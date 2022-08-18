import api from "./api"

const getAll = () => api.get(`${api.url.user}/all`).then(res => res.data);
const get = (id) => api.get(`${api.url.user}/${id}`).then(res => res.data);
const remove = (username) => api.delete(`${api.url.students}/delete/${username}`).then(res => res.data);

const userService = {
  getAll,
  get,
  remove
};

export default userService;