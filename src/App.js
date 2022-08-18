import './App.css';
import {Switch, Route} from 'react-router-dom'

import DefaultLayout from './containers/defaultLayout'
import Login from './pages/login';

function App() {
  return (
    <Switch>
      <Route exact path="/login" name="Login page" component={Login} />
      <Route path="/" name="Home" component={DefaultLayout} />
    </Switch>
  );
}

export default App;
