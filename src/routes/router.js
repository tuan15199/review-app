import Shop from '../pages/shop';
import Home from './../pages/home';
import Users from './../pages/user'

const routes = [
  { path: "/home", exact: true, name: "Home", component: Home },
  { path: "/shop", exact: true, name: "Shop", component: Shop },
  { path: "/user", exact: true, name: "User", component: Users }
];

export default routes;