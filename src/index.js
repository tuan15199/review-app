import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

toast.configure({
  autoClose: 1000,
  draggable: false,
  position: "top-right",
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  pauseOnHover: true,
});

ReactDOM.render(
  <Provider store = {store}> 
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
