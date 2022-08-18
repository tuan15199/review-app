import api from './api'

const login = (username, password) => {

  const user = {
    username: username,
    password: password
  }
  return api.post(api.url.login, user).then(res => res.data);
}

export default {login}
