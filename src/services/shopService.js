import api from './api'

const getAll = () => api.get(api.url.shop).then(res => res.data);
const get = (id) => api.get(`${api.url.shop}/${id}`).then(res => res.data);
const getByType = (type) => api.get(`${api.url.shop}/type/${type}`).then(res => res.data);
const add = (formData) => api.post(api.url.shop, formData).then(res => res.data);
const update = (id, formData) =>  api.put(`${api.url.shop}/${id}`, formData).then(res => res.data);
const remove = (id) => api.delete(`${api.url.shop}/${id}`).then(res => res.data);

const getCities = () => api.get(api.url.city).then(res => res.data);
const getByCity = (city) => api.get(`${api.url.shop}/location/?city=${city}`).then(res => res.data);

const shopService = {
  getAll,
  get,
  getByType,
  add,
  update,
  remove,
  getCities,
  getByCity
};

export default shopService;