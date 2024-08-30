import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import Theme from './Context/Theme.tsx';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme />
  </React.StrictMode>,
)
